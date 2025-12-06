import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Supprimer les données existantes
  await prisma.book.deleteMany({});
  console.log('Cleared existing books');

  // Créer des livres de test
  const books = [
    // Années 1940-1950
    {
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      category: "Fiction",
      publishedYear: 1943,
      description: "Un conte philosophique et poétique sous l'apparence d'un conte pour enfants.",
    },
    {
      title: "1984",
      author: "George Orwell",
      category: "Science-Fiction",
      publishedYear: 1949,
      description: "Un roman dystopique devenu un classique de la littérature.",
    },
    {
      title: "L'Étranger",
      author: "Albert Camus",
      category: "Fiction",
      publishedYear: 1942,
      description: "Premier roman publié par Albert Camus, prix Nobel de littérature.",
    },
    {
      title: "Le Seigneur des Anneaux : La Communauté de l'Anneau",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      publishedYear: 1954,
      description: "Premier volume de la trilogie culte de la fantasy moderne.",
    },
    {
      title: "Fondation",
      author: "Isaac Asimov",
      category: "Science-Fiction",
      publishedYear: 1951,
      description: "Premier tome de la saga culte de la science-fiction.",
    },
    {
      title: "La Peste",
      author: "Albert Camus",
      category: "Fiction",
      publishedYear: 1947,
      description: "Roman allégorique sur une épidémie de peste à Oran.",
    },
    {
      title: "Le Deuxième Sexe",
      author: "Simone de Beauvoir",
      category: "Philosophie",
      publishedYear: 1949,
      description: "Essai fondateur du féminisme moderne.",
    },
    
    // Années 1960-1970
    {
      title: "Dune",
      author: "Frank Herbert",
      category: "Science-Fiction",
      publishedYear: 1965,
      description: "Chef-d'œuvre de la science-fiction devenu culte.",
    },
    {
      title: "Cent ans de solitude",
      author: "Gabriel García Márquez",
      category: "Fiction",
      publishedYear: 1967,
      description: "Chef-d'œuvre du réalisme magique latino-américain.",
    },
    {
      title: "Le Parrain",
      author: "Mario Puzo",
      category: "Thriller",
      publishedYear: 1969,
      description: "Roman sur la mafia américaine devenu culte.",
    },
    {
      title: "Vol au-dessus d'un nid de coucou",
      author: "Ken Kesey",
      category: "Fiction",
      publishedYear: 1962,
      description: "Critique de l'institution psychiatrique américaine.",
    },
    {
      title: "L'Insoutenable Légèreté de l'être",
      author: "Milan Kundera",
      category: "Roman",
      publishedYear: 1984,
      description: "Roman philosophique sur l'amour et la liberté.",
    },
    {
      title: "Papillon",
      author: "Henri Charrière",
      category: "Autobiographie",
      publishedYear: 1969,
      description: "Récit d'évasion du bagne de Cayenne.",
    },

    // Années 1980-1990
    {
      title: "Le Nom de la rose",
      author: "Umberto Eco",
      category: "Roman Historique",
      publishedYear: 1980,
      description: "Enquête médiévale mêlant histoire, philosophie et suspense.",
    },
    {
      title: "Une brève histoire du temps",
      author: "Stephen Hawking",
      category: "Science",
      publishedYear: 1988,
      description: "Cosmologie et physique quantique expliquées au grand public.",
    },
    {
      title: "Les Versets sataniques",
      author: "Salman Rushdie",
      category: "Fiction",
      publishedYear: 1988,
      description: "Roman controversé mêlant réalisme magique et critique religieuse.",
    },
    {
      title: "Beloved",
      author: "Toni Morrison",
      category: "Fiction",
      publishedYear: 1987,
      description: "Roman puissant sur l'esclavage et ses séquelles.",
    },
    {
      title: "Le Parfum",
      author: "Patrick Süskind",
      category: "Thriller",
      publishedYear: 1985,
      description: "Histoire d'un génie de l'odorat devenu meurtrier.",
    },
    {
      title: "Les Piliers de la Terre",
      author: "Ken Follett",
      category: "Roman Historique",
      publishedYear: 1989,
      description: "Fresque médiévale sur la construction d'une cathédrale.",
    },
    {
      title: "American Psycho",
      author: "Bret Easton Ellis",
      category: "Thriller",
      publishedYear: 1991,
      description: "Satire violente de la société de consommation américaine.",
    },
    {
      title: "Jurassic Park",
      author: "Michael Crichton",
      category: "Science-Fiction",
      publishedYear: 1990,
      description: "Thriller scientifique sur le clonage de dinosaures.",
    },
    {
      title: "Harry Potter à l'école des sorciers",
      author: "J.K. Rowling",
      category: "Fantasy",
      publishedYear: 1997,
      description: "Premier tome de la saga Harry Potter qui a conquis le monde entier.",
    },
    {
      title: "Le Silence des agneaux",
      author: "Thomas Harris",
      category: "Thriller",
      publishedYear: 1988,
      description: "Thriller psychologique avec Hannibal Lecter.",
    },
    {
      title: "La Couleur des sentiments",
      author: "Kathryn Stockett",
      category: "Fiction",
      publishedYear: 2009,
      description: "Roman sur la ségrégation raciale dans le Mississippi des années 1960.",
    },

    // Années 2000-2010
    {
      title: "Sapiens : Une brève histoire de l'humanité",
      author: "Yuval Noah Harari",
      category: "Histoire",
      publishedYear: 2011,
      description: "Un ouvrage révolutionnaire sur l'histoire de l'espèce humaine.",
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      category: "Biographie",
      publishedYear: 2011,
      description: "La biographie autorisée du cofondateur d'Apple.",
    },
    {
      title: "L'Élégance du hérisson",
      author: "Muriel Barbery",
      category: "Fiction",
      publishedYear: 2006,
      description: "Roman philosophique sur la beauté cachée du quotidien.",
    },
    {
      title: "Millenium : Les hommes qui n'aimaient pas les femmes",
      author: "Stieg Larsson",
      category: "Thriller",
      publishedYear: 2005,
      description: "Premier tome de la trilogie Millennium.",
    },
    {
      title: "La Vérité sur l'Affaire Harry Quebert",
      author: "Joël Dicker",
      category: "Thriller",
      publishedYear: 2012,
      description: "Thriller littéraire primé sur une enquête criminelle.",
    },
    {
      title: "L'Ombre du vent",
      author: "Carlos Ruiz Zafón",
      category: "Fiction",
      publishedYear: 2001,
      description: "Roman gothique sur le Cimetière des Livres Oubliés.",
    },
    {
      title: "La Disparition de Stéphanie Mailer",
      author: "Joël Dicker",
      category: "Thriller",
      publishedYear: 2018,
      description: "Thriller captivant avec retournements de situation.",
    },
    {
      title: "Trois jours et une vie",
      author: "Pierre Lemaitre",
      category: "Thriller",
      publishedYear: 2016,
      description: "Un secret terrible bouleverse la vie d'un garçon.",
    },
    {
      title: "Hunger Games",
      author: "Suzanne Collins",
      category: "Science-Fiction",
      publishedYear: 2008,
      description: "Dystopie young adult devenue phénomène mondial.",
    },
    {
      title: "Le Cercle littéraire des amateurs d'épluchures de patates",
      author: "Mary Ann Shaffer",
      category: "Roman",
      publishedYear: 2008,
      description: "Roman épistolaire sur l'après-guerre à Guernesey.",
    },

    // Années 2010-2020
    {
      title: "Homo Deus",
      author: "Yuval Noah Harari",
      category: "Histoire",
      publishedYear: 2015,
      description: "Exploration de l'avenir de l'humanité.",
    },
    {
      title: "21 leçons pour le XXIe siècle",
      author: "Yuval Noah Harari",
      category: "Philosophie",
      publishedYear: 2018,
      description: "Réflexions sur les défis contemporains.",
    },
    {
      title: "Là où chantent les écrevisses",
      author: "Delia Owens",
      category: "Fiction",
      publishedYear: 2018,
      description: "Roman captivant mêlant nature et enquête criminelle.",
    },
    {
      title: "La Tresse",
      author: "Laetitia Colombani",
      category: "Fiction",
      publishedYear: 2017,
      description: "Trois destins de femmes entrelacés à travers le monde.",
    },
    {
      title: "L'Ordre du jour",
      author: "Éric Vuillard",
      category: "Histoire",
      publishedYear: 2017,
      description: "Récit de l'Anschluss et de la montée du nazisme.",
    },
    {
      title: "Le Lambeau",
      author: "Philippe Lançon",
      category: "Autobiographie",
      publishedYear: 2018,
      description: "Témoignage bouleversant d'un survivant de l'attentat de Charlie Hebdo.",
    },
    {
      title: "Vernon Subutex 1",
      author: "Virginie Despentes",
      category: "Fiction",
      publishedYear: 2015,
      description: "Portrait social de la France contemporaine.",
    },
    {
      title: "La Horde du Contrevent",
      author: "Alain Damasio",
      category: "Science-Fiction",
      publishedYear: 2004,
      description: "Roman de science-fiction culte français.",
    },
    {
      title: "Réparer les vivants",
      author: "Maylis de Kerangal",
      category: "Fiction",
      publishedYear: 2014,
      description: "Roman sur la transplantation cardiaque.",
    },

    // Classiques anciens
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      category: "Roman Historique",
      publishedYear: 1862,
      description: "Un roman social et historique majeur de la littérature française.",
    },
    {
      title: "Le Comte de Monte-Cristo",
      author: "Alexandre Dumas",
      category: "Roman d'aventure",
      publishedYear: 1844,
      description: "Un des romans les plus populaires de la littérature française.",
    },
    {
      title: "Crime et Châtiment",
      author: "Fiodor Dostoïevski",
      category: "Roman Psychologique",
      publishedYear: 1866,
      description: "Un roman profond sur la culpabilité et la rédemption.",
    },
    {
      title: "Orgueil et Préjugés",
      author: "Jane Austen",
      category: "Roman",
      publishedYear: 1813,
      description: "Roman emblématique de la littérature anglaise.",
    },
    {
      title: "Le Meilleur des mondes",
      author: "Aldous Huxley",
      category: "Science-Fiction",
      publishedYear: 1932,
      description: "Dystopie prophétique sur une société futuriste.",
    },
    {
      title: "Les Fleurs du mal",
      author: "Charles Baudelaire",
      category: "Poésie",
      publishedYear: 1857,
      description: "Recueil de poèmes majeur de la littérature française.",
    },
    {
      title: "Don Quichotte",
      author: "Miguel de Cervantes",
      category: "Fiction",
      publishedYear: 1605,
      description: "Chef-d'œuvre de la littérature espagnole et mondiale.",
    },
    {
      title: "Madame Bovary",
      author: "Gustave Flaubert",
      category: "Roman",
      publishedYear: 1857,
      description: "Portrait d'une femme insatisfaite de sa vie bourgeoise.",
    },
    {
      title: "Le Rouge et le Noir",
      author: "Stendhal",
      category: "Roman",
      publishedYear: 1830,
      description: "Roman d'apprentissage et d'ambition sociale.",
    },
    {
      title: "Germinal",
      author: "Émile Zola",
      category: "Roman Social",
      publishedYear: 1885,
      description: "Roman sur le monde ouvrier et la lutte des classes.",
    },
    {
      title: "Les Trois Mousquetaires",
      author: "Alexandre Dumas",
      category: "Roman d'aventure",
      publishedYear: 1844,
      description: "Roman de cape et d'épée devenu culte.",
    },
    {
      title: "Notre-Dame de Paris",
      author: "Victor Hugo",
      category: "Roman Historique",
      publishedYear: 1831,
      description: "Roman gothique sur la cathédrale et ses habitants.",
    },
    {
      title: "Voyage au bout de la nuit",
      author: "Louis-Ferdinand Céline",
      category: "Fiction",
      publishedYear: 1932,
      description: "Roman révolutionnaire par son style et sa noirceur.",
    },
    {
      title: "À la recherche du temps perdu - Du côté de chez Swann",
      author: "Marcel Proust",
      category: "Roman",
      publishedYear: 1913,
      description: "Premier volume de l'œuvre monumentale de Proust.",
    },
    {
      title: "Le Grand Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      publishedYear: 1925,
      description: "Portrait de l'Amérique des années folles.",
    },
    {
      title: "L'Odyssée",
      author: "Homère",
      category: "Épopée",
      publishedYear: -800,
      description: "Épopée grecque antique, fondement de la culture occidentale.",
    },
    {
      title: "L'Art de la guerre",
      author: "Sun Tzu",
      category: "Philosophie",
      publishedYear: -500,
      description: "Traité de stratégie militaire devenu un classique universel.",
    },
  ];

  let count = 0;
  for (const bookData of books) {
    await prisma.book.create({
      data: bookData,
    });
    count++;
  }

  console.log(`✅ Created ${count} books`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
