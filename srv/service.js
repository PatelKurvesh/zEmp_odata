const cds = require("@sap/cds");
const {validateEmployee} = require('../srv/utils/external');
const {validateAdmin} = require('../srv/utils/external');

module.exports = (srv => {
    let {EMPLOYEE, ADMIN} = srv.entities;

    srv.before("CREATE", EMPLOYEE, async (req) => {
        let db = await cds.connect.to('db');
        let tx = db.tx(req);
        try {
            let sQuery = `SELECT MAX(EMP_ID) AS COUNT FROM ${EMPLOYEE}`;
            let employeeTable = await tx.run(sQuery);
            employeeTable[0].COUNT = employeeTable[0].COUNT + 1;
            req.data.EMP_ID = employeeTable[0].COUNT;
        } catch (error) {
            console.log(error);
        }
    });

    srv.before("CREATE", ADMIN, async (req) => {
        let db = await cds.connect.to('db');
        let tx = db.tx(req);
        try {
            let sQuery = `SELECT MAX(ADMIN_ID) AS COUNT FROM ${ADMIN}`;
            let adminTable = await tx.run(sQuery);
            adminTable[0].COUNT = adminTable[0].COUNT + 1;
            req.data.ADMIN_ID = adminTable[0].COUNT;
        } catch (error) {
            console.log(error);
        }
    });

    srv.on("loginEmployee", async (req) => {
        let {EMP_NAME, PASSWORD} = req.data;
        let target = EMPLOYEE;
        console.log(target.name);
        const validateUser = await validateEmployee(req, target);
        const aEmployee = await SELECT.from(EMPLOYEE).columns('EMP_ID', 'EMP_NAME', 'STATUS').where({EMP_NAME, PASSWORD});
        if (aEmployee.length === 0) {
            var errCode = 404,
                errMsg = 'Requested user not found';
            if (validateUser.IsUserValid === false) {
                errMsg = 'Requested UserName is incorrect, please provide correct user';
                errCode = 400;
            }
            if (validateUser.IsPasswordValid === false) {
                errMsg = `Requested password is incorrect, please provide correct password`;
                errCode = 400;
            }
            if (validateUser.IsUserValid === false && validateUser.IsPasswordValid === false) {
                errMsg = 'Requested user not found';
                errCode = 404;
            }
            req.error(errCode, errMsg);
            return;
        } else if (aEmployee[0].STATUS === false) {
            errMsg = `Requested user is not active`;
            req.error(403, errMsg);
            return;
        } else {
            var oEmployee = {
                "status": 200,
                "message": "Login successfully!!",
                "results": aEmployee
            };
            let {res} = req.http;
            res.send(oEmployee);
        }
    });

    srv.on("loginAdmin", async (req) => {
        let {ADMIN_NAME, PASSWORD} = req.data;
        let target = ADMIN;
        const validatedAdmin = await validateAdmin(req, target);
        const aAdmin = await SELECT.from(ADMIN).columns('ADMIN_ID', 'ADMIN_NAME', 'PASSWORD').where({ADMIN_NAME, PASSWORD});
        if (aAdmin.length === 0) {
            var errCode = 404,
                errMsg = 'Requested Admin not found';
            if (validatedAdmin.IsAdminValid === false) {
                errMsg = 'Requested AdminName is incorrect, please provide correct user';
                errCode = 400;
            }
            if (validatedAdmin.IsPasswordValid === false) {
                errMsg = `Requested password is incorrect, please provide correct password`;
                errCode = 400;
            }
            if (validatedAdmin.IsAdminValid === false && validatedAdmin.IsPasswordValid === false) {
                errMsg = 'Requested Admin not found';
                errCode = 404;
            }
            req.error(errCode, errMsg);
            return;
        } else {
            var oAdmin = {
                "status": 200,
                "message": "Login successfully!!",
                "results": aAdmin
            };
            let {res} = req.http;
            res.send(oAdmin);
        }
    });

    // srv.on("loginAdmin", async (req) => {
    //     let {ADMIN_NAME, PASSWORD} = req.data;
    //     const aAdmin = await SELECT.from(ADMIN).columns('ADMIN_ID', 'ADMIN_NAME','PASSWORD').where({ADMIN_NAME, PASSWORD});
    //     if (aAdmin.length === 0) {
    //         req.error(404, 'Requested user not found');
    //         return;
    //     } else {
    //         var oAdmin = {
    //             "status": 200,
    //             "message": "Login successfully",
    //             "results": aAdmin
    //         };
    //         let {res} = req.http;
    //         res.send(oAdmin);
    //     }
    // });

});
