# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/admin/package.json ./apps/admin/package.json
RUN pnpm install --filter @umixpanel/admin... --frozen-lockfile

FROM deps AS build
COPY apps/admin ./apps/admin
WORKDIR /app/apps/admin
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/admin/.next ./.next
COPY apps/admin/next.config.mjs ./next.config.mjs
COPY apps/admin/package.json ./package.json
EXPOSE 3002
CMD ["npx", "next", "start", "-p", "3002"]
