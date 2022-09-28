import { validate } from './env.validation'

export type Env = ReturnType<typeof validate>
