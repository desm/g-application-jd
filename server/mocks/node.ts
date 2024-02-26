// copied from https://github.com/mswjs/examples/tree/main/examples/with-jest

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
