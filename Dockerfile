# ---------- ETAPA 1: Compilar la aplicación Angular ----------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Esto es para evitar errores de OpenSSL en Angular 9+
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build --prod

# ---------- ETAPA 2: Servir con Nginx ----------
FROM nginx:alpine

# Copiar configuración personalizada para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos construidos
COPY --from=build /app/dist/e-commerce-angular-node /usr/share/nginx/html

# Usar variable de puerto (Railway asigna $PORT automáticamente)
ENV PORT 80
EXPOSE 80

CMD ["sh", "-c", "nginx -g 'daemon off;'"]


