const db = require("../../config/pgConnection")
const catchWrapDb = require("../../helper/catchWrapDb");
const NAMESPACE = "storage.product";

module.exports = {
    create: catchWrapDb(`${NAMESPACE}.create`, async (data) => {
        const query = `INSERT INTO product (id, name, price) VALUES ($1, $2, $3) RETURNING *`

        const resp = await db.queryRow(query, ...data.params)

        return resp
    }),
    getById: catchWrapDb(`${NAMESPACE}.getById`, async (data) => {
        const query = `SELECT id, name, price FROM product WHERE id = $1`

        const resp = await db.queryRow(query, ...data.params)

        return resp
    }),
    getList: catchWrapDb(`${NAMESPACE}.getList`, async (data) => {
        const query = `SELECT * FROM product`

        const resp = await db.queryRows(query, ...[])
    
        return resp
    }),
    update: catchWrapDb(`${NAMESPACE}.update`, async (data) => {
        const query = `UPDATE product SET name = $2, price = $3 WHERE id = $1 RETURNING *`

        const resp = await db.queryRow(query, ...data.params)

        return resp
        
    }),
    delete: catchWrapDb(`${NAMESPACE}.delete`, async (data) => {
        const query = `DELETE FROM product WHERE id = $1 RETURNING *`

        const resp = await db.queryRow(query, ...data.params)

        return resp
    })
}