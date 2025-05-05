#!/bin/bash

# Exit on any error
# set -e

# --- Keycloak setup ---
echo "🔑 Setting up Keycloak..."
docker compose up -d

# --- API setup ---
echo "🛠️  Setting up API..."
cd "./api"

echo "🔁 Starting MinIO..."
docker compose up -d minio

echo "📦 Installing API dependencies..."
pnpm install

echo "🚀 Starting API services..."
docker compose up -d

echo "🗄️  Running DB migrations..."
node ace migration:run

echo "🌱 Seeding database..."
node ace db:seed

echo "🎯 Starting API dev server..."
pnpm run dev
