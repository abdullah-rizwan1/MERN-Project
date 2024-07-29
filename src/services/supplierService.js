const ecomDB = require('../config/mysql')


exports.getSuppliers = async () => {
    let getSupplierQuery = 'SELECT * FROM Supplier WHERE is_active = 1'
    let suppliers = await ecomDB.query(getSupplierQuery) 
    return suppliers[0]
}

exports.createSupplier = async (first_name, last_name, email, password) => {
    let createSupplierQuery = `INSERT INTO 
        Supplier(first_name, last_name, email, password, created_at)
        VALUES(?, ?, ?, ?, NOW(), 1);`
    let supplier = await ecomDB.query(createSupplierQuery, [first_name, last_name, email, password])
    return supplier[0][0] ? resp[0][0] : null
}

exports.getSupplierByEmail = async (email) => {
    let supplierByEmailQuery = `
        SELECT email FROM Supplier
        WHERE email = ?
    `
    let supplier = await ecomDB.query(supplierByEmailQuery, [email])
    return supplier[0][0] ? supplier[0][0] : null
}


exports.getSupplierById = async (id) => {
    let supplierByIdQuery = `
        SELECT * FROM Supplier
        WHERE id = ?
    `   
    let supplier = await ecomDB.query(supplierByIdQuery, [id])
    return supplier[0] ? supplier[0] : null
}

exports.deleteSupplierById = async (id) => {
    console.log(id)
    let deleteSupplierByID = `
        UPDATE Supplier
        SET is_active=0 
        WHERE id = ?
    `

    let supplier = await ecomDB.query(deleteSupplierByID, [id])
    return supplier[0] ? supplier[0] : null
}