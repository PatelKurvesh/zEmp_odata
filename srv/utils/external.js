const cds = require("@sap/cds");

// const getData = async (target, colName, value) => {
//     let db = await cds.connect.to('db');
//     let tx = db.tx();
//     try {
//         return await tx.run(SELECT.from(target).columns(colName,'PASSWORD').where(`${colName}='${value}'`));
//     } catch (error) {
//         console.log(error);
//     }
// }

const getEmployeeData = async (target, value) => {
    let db = await cds.connect.to('db');
    let tx = db.tx();
    try {
        return await tx.run(SELECT.from(target).columns('EMP_NAME', 'PASSWORD').where(`EMP_NAME='${value}'`));
    } catch (error) {
        console.log(error);
    }
}

const validateEmployee = async (req, target) => {
    var bCorrectUser,
        bCorrectPassword;
    let {EMP_NAME, PASSWORD} = req.data;
    let aUserDetails = await getEmployeeData(target, EMP_NAME);
    if (aUserDetails.length === 0) {
        bCorrectUser = false;
    } else {
        bCorrectUser = aUserDetails[0].EMP_NAME === EMP_NAME ? true : false;
        bCorrectPassword = aUserDetails[0].PASSWORD === PASSWORD ? true : false;
    }
    var oValidatedEmployee = {
        "IsUserValid": bCorrectUser,
        "IsPasswordValid": bCorrectPassword
    };
    return oValidatedEmployee
}


const getAdminData = async (target, value) => {
    let db = await cds.connect.to('db');
    let tx = db.tx();
    try {
        return await tx.run(SELECT.from(target).columns('ADMIN_NAME', 'PASSWORD').where(`ADMIN_NAME='${value}'`));
    } catch (error) {
        console.log(error);
    }
}

const validateAdmin = async (req, target) => {
    var bCorrectUser,
        bCorrectPassword;
    let {ADMIN_NAME, PASSWORD} = req.data;
    let aUserDetails = await getAdminData(target, ADMIN_NAME);
    if (aUserDetails.length === 0) {
        bCorrectUser = false;
    } else {
        bCorrectUser = aUserDetails[0].ADMIN_NAME === req.data.ADMIN_NAME ? true : false;
        bCorrectPassword = aUserDetails[0].PASSWORD === PASSWORD ? true : false;
    }
    var oValidatedEmployee = {
        "IsUserValid": bCorrectUser,
        "IsPasswordValid": bCorrectPassword
    };
    return oValidatedEmployee
}

// const validate = async (req, target) => {
//     let sTargetName = target.name;
//     if (sTargetName.includes('EMPLOYEE')) {
//         let {EMP_NAME, PASSWORD} = req.data;
//         let aUserName = await getData(target, 'EMP_NAME', EMP_NAME);
//         let aPassword = await getData(target, 'PASSWORD', PASSWORD);
//         let bCorrectUser = aUserName.length === 0 ? false : true;
//         let bCorrectPassword = aPassword.length === 0 ? false : true;
//         var oValidatedEmployee = {
//             "IsUserValid": bCorrectUser,
//             "IsPasswordValid": bCorrectPassword
//         };

//     } else {
//         let {ADMIN_NAME, PASSWORD} = req.data;
//         let aAdminName = await getData(target, 'ADMIN_NAME', ADMIN_NAME);
//         let aPassword = await getData(target, 'PASSWORD', PASSWORD);
//         let bCorrectAdmin = aAdminName.length === 0 ? false : true;
//         let bCorrectPassword = aPassword.length === 0 ? false : true;
//         var oValidatedAdmin = {
//             "IsAdminValid": bCorrectAdmin,
//             "IsPasswordValid": bCorrectPassword
//         };
//     }
//     return sTargetName.includes('EMPLOYEE') ? oValidatedEmployee : oValidatedAdmin
// }
exports.validateEmployee = validateEmployee;
exports.validateAdmin = validateAdmin;
