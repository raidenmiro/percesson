import * as env from 'env-var'
import * as Joi from 'joi'

const schema = Joi.object({
  PORT: Joi.string().optional(),
  DATABASE_URL: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  UNSPLASH_TOKEN_ACCESS: Joi.string().required(),
  UNSPLASH_URL: Joi.string().required(),
  UNSPLASH_SECRET: Joi.string().optional(),
  WEATHER_KEY: Joi.string().required(),
  WEATHER_URL: Joi.string().required(),
}).unknown()

export function validate(config: Record<string, unknown>) {
  const { error } = schema.validate(config)

  if (error) {
    throw new Error(`Provided not valid .env file: ${error}`)
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
