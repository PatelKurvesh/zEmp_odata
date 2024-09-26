namespace zEmp.db.schema;

entity EMPLOYEE {
    key EMP_ID   : Integer;
        EMP_NAME : String;
        PASSWORD : String;
        STATUS   : Boolean;

};

entity ADMIN {
    key ADMIN_ID   : Integer;
        ADMIN_NAME : String;
        PASSWORD   : String;
}
