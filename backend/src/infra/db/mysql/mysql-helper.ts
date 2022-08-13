
import { Pool } from 'mysql'

export const insertOne = (pool: Pool, table: string, value: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(`INSERT INTO ${table} SET ?`, value, (error, result) => {
        if (error) {
          connection.release()
          return reject(error)
        }
        connection.release()
        resolve(result)
      })
    })
  })
}
