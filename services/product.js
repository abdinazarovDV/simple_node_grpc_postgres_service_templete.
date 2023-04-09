const strProduct = require("../storage/postgres/product");
const catchWrapService = require("../helper/catchWrapService");
const NAMESPACE = "service.product"
const { v4 } = require("uuid");

const productService = {
    Create: catchWrapService(`${NAMESPACE}.create`, async (req) => {

        const id = v4()

        const resp = await strProduct.create({params: [id, req.name, req.price]})
      
        return resp
    }),
    GetById: catchWrapService(`${NAMESPACE}.getById`, async (req) => {

        const resp = await strProduct.getById({params: [req.id]})

        return resp
    }),
    GetList: catchWrapService(`${NAMESPACE}.getList`, async (req) => {

        const resp = await strProduct.getList({params: [req.limit, req.offset]})

        return { products: resp }
    }),
    Update: catchWrapService(`${NAMESPACE}.update`, async (req) => {

        const resp = await strProduct.update({params: [req.id, req.name, req.price]})

        return resp
    }),
    Delete: catchWrapService(`${NAMESPACE}.delete`, async (req) => {

        const resp = await strProduct.delete({params: [req.id]})

        return resp
    })
}

module.exports = productService;
