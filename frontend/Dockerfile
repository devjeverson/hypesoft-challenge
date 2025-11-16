FROM node:20 as build
WORKDIR /app

# ====== RECEBENDO TODAS AS VARIÁVEIS DO KEYCLOAK ======
ARG VITE_API_URL
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_REDIRECT_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_KEYCLOAK_URL=${VITE_KEYCLOAK_URL}
ENV VITE_KEYCLOAK_REALM=${VITE_KEYCLOAK_REALM}
ENV VITE_KEYCLOAK_CLIENT_ID=${VITE_KEYCLOAK_CLIENT_ID}
ENV VITE_REDIRECT_URL=${VITE_REDIRECT_URL}

COPY hypesoft-frontend/package*.json ./
RUN npm install

COPY hypesoft-frontend/ .
RUN npm run build

# ===== NGINX (serve o frontend) =====
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
