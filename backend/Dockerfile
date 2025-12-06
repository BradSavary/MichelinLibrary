FROM node:20-alpine

# Installer les dépendances nécessaires pour Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 5000

# Commande par défaut (sera overridée par docker-compose)
CMD ["npm", "run", "dev"]
