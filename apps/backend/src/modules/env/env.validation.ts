import * as env from 'env-var'
import * as z from 'zod'

const schema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  UNSPLASH_TOKEN_ACCESS: z.string(),
  UNSPLASH_URL: z.string(),
  UNSPLASH_SECRET: z.string().optional(),
  WEATHER_KEY: z.string(),
  WEATHER_URL: z.string(),
})

export function validate(config: Record<string, unknown>) {
  const result = schema.safeParse(config)

  if (!result.success) {
    throw new Error(`Provided not valid .env file: ${result.error}`)
  }

  return {
    app: {
      port: env.get('PORT').default(3333).asPortNumber(),
    },
    database: {
      url: env.get('DATABASE_URL').asString(),
      username: env.get('DATABASE_USERNAME').asString(),
      password: env.get('DATABASE_PASSWORD').asString(),
    },
    unsplash: {
      baseUrl: env.get('UNSPLASH_URL').asString(),
      token: env.get('UNSPLASH_TOKEN_ACCESS').asString(),
      secret: env.get('UNSPLASH_SECRET').asString(),
    },
    weather: {
      baseUrl: env.get('WEATHER_URL').asString(),
      key: env.get('WEATHER_KEY').asString(),
    },
  }
}
