import { Router } from 'express'
import { Pool } from 'mysql'
import { makeSignUpController } from '../factories/singnup'
import { adaptRoute } from './express-route-adapter'

export default (router: Router, pool: Pool): void => {
  router.post('/signup', adaptRoute(makeSignUpController(pool)))
}
