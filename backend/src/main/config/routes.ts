/* eslint-disable no-unused-expressions */
import { Express, Router } from 'express'
import fs from 'fast-glob'
import { Pool } from 'mysql'

export default (app: Express, pool: Pool): void => {
  const router = Router()
  app.use('/api', router)
  fs.sync('**/src/main/routes/**routes.ts').map(async file => 
    (await import(`../../../${file}`)).default(router, pool)
  )
}
