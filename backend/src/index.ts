import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'

import allRouter from './routes/index.js';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    DIRECT_DATABASE_URL: string
  }
}>()

app.use('/*', cors())



app.route('/api/v1', allRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
