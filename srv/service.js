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
        const aEmployee = await SELECT.from(EMPLOYEE).columns('EMP_ID', 'EMP_NAME', 'STATUS').where({EMP_NAME, PASSWORD});
        if(aEmployee.length === 0){
            req.error(401,"Requested User is not authorized");
            return
        }else{
            var oEmployee = {
                "status":201,
                "message":"Login successfully",
                "results":aEmployee
            };
            let {res} = req.http;
            res.send(oEmployee);
        }
    });


    srv.on("loginAdmin", async (req) => {
        let {ADMIN_NAME, PASSWORD} = req.data;
        const aAdmin = await SELECT.from(ADMIN).columns('ADMIN_ID', 'ADMIN_NAME').where({ADMIN_NAME, PASSWORD});
        if(aAdmin.length === 0){
            req.error(401,"Requested User is not authorized");
            return
        }else{
            var oEmployee = {
                "status":201,
                "message":"Login successfully",
                "results":aAdmin
            };
            let {res} = req.http;
            res.send(oEmployee);
        }
    });
    // srv.on("READ", EMPLOYEE, async (req, next) => {
    //     let db = await cds.connect.to('db');
    //     let tx = db.tx(req);
    //     try {
    //         let sUser = "Kurvesh";
    //         let employee = await tx.run(SELECT.from(EMPLOYEE).where(`EMP_NAME=${sUser}`));
    //         console.log(employee);
    //         // return await SELECT.from(EMPLOYEE).where(`EMP_NAME=${sUser}`);
    //         // let sQuery = `SELECT MAX(USER_ID) AS COUNT FROM ${USER}`;
    //         // let userTable = await tx.run(sQuery);
    //         // userTable[0].COUNT = userTable[0].COUNT + 1;
    //         // req.data.USER_ID = userTable[0].COUNT;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


});
