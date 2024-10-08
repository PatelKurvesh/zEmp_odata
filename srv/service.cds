namespace zEmp.srv.service;

using {zEmp.db.schema as db} from '../db/schema';


service MyService @(path: '/odata') {

    entity EMPLOYEE as projection on db.EMPLOYEE;
    entity ADMIN    as projection on db.ADMIN;
    entity TILE   as projection on db.TILE;
    action loginEmployee(EMP_NAME : String, PASSWORD : String) returns {};
    action loginAdmin(ADMIN_NAME : String, PASSWORD : String)  returns {};

}
