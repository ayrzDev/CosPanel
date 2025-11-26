import { z } from 'zod';

export const commonEnv = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  PORT: z.coerce.number().int().positive().default(3000)
});

export const databaseEnv = z.object({
  DATABASE_URL: z.string().url(),
});

export const redisEnv = z.object({
  REDIS_URL: z.string().url().default('redis://localhost:6379')
});

export const jwtEnv = z.object({
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d')
});

export const twoFAEnv = z.object({
  TOTP_ISSUER: z.string().default('UmixPanel')
});

export const corsEnv = z.object({
  CORS_ORIGIN: z.string().default('*')
});

export const apiEnv = commonEnv
  .merge(databaseEnv)
  .merge(redisEnv)
  .merge(jwtEnv)
  .merge(twoFAEnv)
  .merge(corsEnv)
  .extend({
    WEBSOCKET_ENABLED: z.coerce.boolean().default(true)
  });

export const nextPublicEnv = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
});

export const webEnv = commonEnv.merge(nextPublicEnv);
export const adminEnv = commonEnv.merge(nextPublicEnv);

export type ApiEnv = z.infer<typeof apiEnv>;
export type WebEnv = z.infer<typeof webEnv>;
export type AdminEnv = z.infer<typeof adminEnv>;

export function parseEnv<T extends z.ZodTypeAny>(schema: T, source: NodeJS.ProcessEnv): z.infer<T> {
  const res = schema.safeParse(source);
  if (!res.success) {
    const issues = res.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment variables: ${issues}`);
  }
  return res.data;
}
