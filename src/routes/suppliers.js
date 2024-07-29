const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/supplierController')


// GET Routes
router.get('/list', supplierController.getSuppliersController)
router.get('/:id', supplierController.getSupplierByIdController)


// POST Routes
router.post('/create', supplierController.createSupplierController)
router.post('/login', supplierController.login)


// DELETE Routes
router.delete('/:id', supplierController.deleteSupplierById)




module.exports = router