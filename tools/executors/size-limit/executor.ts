import { ExecutorContext, logger } from '@nrwl/devkit'
import sizeLimit from 'size-limit'
import filePlugin from '@size-limit/file'
import { join } from 'path'
import { promisify } from 'util'
import glob from 'glob'

export interface SizeLimitOptions {
  outputPath: string
  maxLimit: number
}

const [globAsync] = [glob].map(fn => promisify(fn))

export default async function sizeLimitExecutor(
  options: SizeLimitOptions,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  logger.log('Run check size..')

  const files = await globAsync(join(context.cwd, options.outputPath, '**/*.js'))
  const checkSize = ({ size }: { size: number }) => size >= options.maxLimit

  const success = await sizeLimit([filePlugin], [files], result => {
    const size = result.size

    if (!checkSize(size)) {
      logger.error(`Size has exceeded the established limits, current size: ${size}`)

      return false
    }

    return true
  })

  return { success }
}
