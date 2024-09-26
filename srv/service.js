const cds = require("@sap/cds");

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
        var sErrMsg = "";
        const aEmployee = await SELECT.from(EMPLOYEE).columns('EMP_ID', 'EMP_NAME', 'STATUS').where({EMP_NAME, PASSWORD});
        if (aEmployee.length === 0) {
            sErrMsg = `User ${EMP_NAME} is not authorized`;
            req.error(404, sErrMsg);
            return
        } else if (aEmployee[0].STATUS === false) {
            sErrMsg = `User ${EMP_NAME} is not active`;
            req.error(404, sErrMsg);
            return;
        } else {
            var oEmployee = {
                "status": 201,
                "message": "Login successfully",
                "results": aEmployee
            };
            let {res} = req.http;
            res.send(oEmployee);
        }
    });


    srv.on("loginAdmin", async (req) => {
        let {ADMIN_NAME, PASSWORD} = req.data;
        const aAdmin = await SELECT.from(ADMIN).columns('ADMIN_ID', 'ADMIN_NAME').where({ADMIN_NAME, PASSWORD});
        if (aAdmin.length === 0) {
            req.error(401, "Requested User is not authorized");
            return
        } else {
            var oEmployee = {
                "status": 201,
                "message": "Login successfully",
                "results": aAdmin
            };
            let {res} = req.http;
            res.send(oEmployee);
        }
    });


});
