# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --filter @umixpanel/api... --frozen-lockfile

FROM deps AS build
COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/apps/api/package.json ./package.json
EXPOSE 3001
CMD ["node", "dist/main.js"]
