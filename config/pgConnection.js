const cfg = require("./index")
const { Pool } = require("pg")

const pool = new Pool({
    user: cfg.postgresUser,
    password: cfg.postgresPassword,
    database: cfg.postgresDatabase,
    host: cfg.postgresHost
})


module.exports = {
    pool,
    queryRow: async (SQL, ...params) => {
        const client = await pool.connect()

        try {
            const { rows: [ row ] } = await client.query( SQL, params.length ? params : null)
            return row
        } finally {
            client.release()
        }

    },
    queryRows: async (SQL, ...params) => {
        const client = await pool.connect()

        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } finally {
            client.release()
        }

    }
}

