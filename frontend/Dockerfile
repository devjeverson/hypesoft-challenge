FROM node:20 as build
WORKDIR /app

# Argumento para receber a URL da API do docker-compose
ARG VITE_API_URL
# Define a variável de ambiente para o processo de build
ENV VITE_API_URL=${VITE_API_URL}

COPY hypesoft-frontend/package*.json ./
RUN npm install

COPY hypesoft-frontend/ .
RUN npm run build

# NGINX para servir o frontend
FROM nginx:alpine
# Copia a configuração customizada do NGINX que suporta rotas de SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
