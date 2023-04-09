require('dotenv').config({ path: '/app/.env' })

const { pool } = require("./config/pgConnection");
const grpcConnection = require("./config/grpcConnection");

;(async () => {
    pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error connecting db', err.stack)
        }

        return console.log("Connected to database successfully!")
       
      })
})()
