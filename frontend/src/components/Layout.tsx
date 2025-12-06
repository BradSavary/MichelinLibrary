import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, BarChart3, Menu, X, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Bibliothèque', path: '/', Icon: Library },
    { name: 'Statistiques', path: '/stats', Icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-brightness-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Library</h1>
              </div>
            </Link>
            {/* Bouton fermer (mobile uniquement) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                  ${
                    isActive(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Header mobile avec burger */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gray-900" />
              <h1 className="text-lg font-bold text-gray-900">Library</h1>
            </div>
            <div className="w-10" /> {/* Spacer pour centrer le titre */}
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto h-5">

        </footer>
      </div>
    </div>
  );
}
