import { ApolloServerPlugin } from '@apollo/server'
import { logger } from '..'
import { Context } from '../../context'

export const loggerPlugin: ApolloServerPlugin<Context> = {
  async requestDidStart() {
    return {
      willSendResponse: async (requestContext) => {
        if (!requestContext.errors?.length) {
          logger.info(`${requestContext.operationName}: OK`)
        }
      },
      didEncounterErrors: async (requestContext) => {
        logger.error(
          `${requestContext.operationName}: ${requestContext.errors.map((e) => e.stack).join(' ')}`,
        )
      },
    }
  },
}
