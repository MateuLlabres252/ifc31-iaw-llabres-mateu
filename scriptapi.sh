#!/bin/bash
set -e

echo "Configurando Producci  n: API + Caddy (HTTPS interno con certificado interno)"
echo

# 1. Pedir datos al usuario
read -p "Host de No-IP (ej: mateullabresmunar.ddns.net): " NOIP_HOST
read -p "Usuario de DockerHub (ej: mateullabresmunar): " DOCKER_USER
read -p "Tag de la imagen (ej: v1): " IMAGE_TAG

# 2. Instalar Docker + Docker Compose
echo "Instalando Docker Engine y Docker Compose..."
sudo apt update -y
sudo apt install -y curl apt-transport-https ca-certificates software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update -y

sudo apt install -y docker-ce docker-compose

# 3. Preparar directorio y archivos
mkdir -p ~/api-production
cd ~/api-production

# Crear Caddyfile con HTTPS interno
cat > Caddyfile << EOF
${NOIP_HOST} {
    tls internal
    reverse_proxy api_rest:3000
}
EOF

# Crear docker-compose.yml
cat > docker-compose.yml << EOF
version: "3.8"

services:
  api-service:
    image: ${DOCKER_USER}/ifc31c-iaw-mateu-llabres:${IMAGE_TAG}
    container_name: api_rest
    restart: always
    networks:
      - prod_network

  caddy:
    image: caddy:latest
    container_name: proxy_caddy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - prod_network

networks:
  prod_network:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
EOF

echo
# 4. Arrancar contenedores
echo "Lanzando servicios..."
sudo docker compose down || true
sudo docker compose pull
sudo docker compose up -d

echo
echo "API disponible en: https://${NOIP_HOST}/api/animales"

