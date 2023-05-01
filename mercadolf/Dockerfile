#FROM node:lts-bullseye AS builde
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci
#COPY . .
#RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.24.0-alpine
# Copy built assets from builder

COPY config/default.conf /etc/nginx/conf.d/default.conf
#COPY config/default.conf /etc/nginx/sites-available/default.conf
#COPY default /etc/nginx/sites-available/default
COPY build /usr/share/nginx/html

#COPY --from=builde /app/build /var/www/app/
# Add your nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]