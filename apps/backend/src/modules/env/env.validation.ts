import * as Joi from 'joi'
import * as env from 'env-var'

const schema = Joi.object({
  PORT: Joi.string().optional(),
  DATABASE_URL: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  UNSPLASH_TOKEN_ACCESS: Joi.string().required(),
  UNSPLASH_URL: Joi.string().required(),
  UNSPLASH_SECRET: Joi.string().optional(),
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
  }
}
