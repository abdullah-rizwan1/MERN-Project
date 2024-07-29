const supplierService = require('../services/supplierService')
const HttpCodes = require('../constants/httpCodes')
const ErrorResponse = require('../composer/error-response')
const authHelper = require('../helpers/authHelper')
const SuccessResponse = require('../composer/success-response');
const AppMessages = require('../constants/appMessages')

exports.createSupplierController = async (req,res) => {
    try {  
        let body = req.body
        let exists = await supplierService.getSupplierByEmail(body.email)
        if (exists) {
            res.status(HttpCodes.BAD_REQUEST).send(new ErrorResponse(AppMessages.DUPLICATE_RECORD))
        } else {
            const password = await authHelper.encryptString(body.password)
            const supplier = await supplierService.createSupplier(body.first_name, body.last_name, body.email, password )
            return res.status(HttpCodes.OK).send(new SuccessResponse(AppMessages.SUCCESS, supplier))
            
        }

        
    } catch(error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(AppMessages.INTERNAL_SERVER_ERROR))
    }
}


exports.getSuppliersController = async (req,res) => {
    try {
        const suppliers = await supplierService.getSuppliers()
        if (!suppliers) {
            return res.status(HttpCodes.OK).send("No suppliers in suppliers list.")
        }
        return res.status(HttpCodes.OK).send(suppliers)
    } catch(error) {
        console.error(error)
    }
}

exports.getSupplierByIdController = async (req,res) => {
    try {
        let id = req.params['id']
        let supplier = await supplierService.getSupplierById(id)
        if (!supplier) {
            res.status(HttpCodes.OK).send(`No Supplier with id:${id}`)
        }
        return res.status(HttpCodes.OK).send(new SuccessResponse(AppMessages.SUCCESS, supplier))
    } catch(error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(AppMessages.INTERNAL_SERVER_ERROR))
    }
}

exports.deleteSupplierById = async (req, res) => {
    try {
        let id = req.params['id']
        let supplier = await supplierService.deleteSupplierById(id)
        if (!supplier) {
            res.status(HttpCodes.OK).send(`No Supplier with id:${id}`)
        }
        return res.status(HttpCodes.OK).send(new SuccessResponse(AppMessages.DELETED, supplier))
    } catch (error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(AppMessages.INTERNAL_SERVER_ERROR))
    }
}

exports.login = async (req,res) => {
    try {
        let body = req.body
        let supplier = await supplierService.getSupplierByEmail(body.email)
        
        if (!supplier) {
            return res.status(HttpCodes.BAD_REQUEST).send(new ErrorResponse(AppMessages.INVALID_USERNAME_EMAIL))
        }

        const isUserValid = await authHelper.isValidUser(body.password, supplier.password)
    
        if (!isUserValid) {
            return res.status(HttpCodes.BAD_REQUEST).send(new ErrorResponse(AppMessages.ACCESS_DENIED))
        }
        
        res = await authHelper.addAuthTokenInResponseheader(supplier, res)
        return res.status(HttpCodes.OK).send(new SuccessResponse(AppMessages.SUCCESS))
    } catch(error) {
        return res.send(HttpCode.INTERNAL_SERVER_ERROR).send(new ErrorResponse(AppMessages.INTERNAL_SERVER_ERROR))
    }
}