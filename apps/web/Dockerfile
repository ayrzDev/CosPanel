# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/package.json
RUN pnpm install --filter @umixpanel/web... --frozen-lockfile

FROM deps AS build
COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/web/.next ./.next
COPY apps/web/next.config.mjs ./next.config.mjs
COPY apps/web/package.json ./package.json
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
