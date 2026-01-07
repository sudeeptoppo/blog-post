# Backend Setup

This project is a Cloudflare Worker using Hono and Prisma Accelerate.

## Setup Requirements

1. **Environment Variables**:
   Create a `.env` file (or update the existing one) with the following:
   ```env
   # The pooled URL from Prisma Accelerate (starts with prisma://)
   DATABASE_URL="prisma://accelerate.prisma-data.net/..."
   
   # The direct connection URL to your PostgreSQL database (starts with postgres://)
   DIRECT_DATABASE_URL="postgres://..."
   ```

2. **Generate Prisma Client**:
   Run the following command to generate the Prisma Client for Edge:
   ```bash
   npx prisma generate
   ```
   *Note: If you encounter validation errors, ensure your environment variables are correctly set or pass them explicitly.*

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running Locally

```bash
npm run dev
```

## Deployment

To deploy to Cloudflare:
```bash
npx wrangler deploy
```

Make sure to set the secrets in Cloudflare:
```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put DIRECT_DATABASE_URL
```
