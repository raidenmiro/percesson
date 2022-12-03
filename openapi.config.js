const { generateApi } = require('swagger-typescript-api')
const path = require('path')

generateApi({
  name: 'index.gen.ts',
  output: path.resolve(process.cwd(), './apps/extension/src/shared/api/internal'),
  input: path.resolve(process.cwd(), './openapi.yaml'),
  httpClientType: 'fetch',
})
