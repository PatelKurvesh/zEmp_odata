const cds = require("@sap/cds");
const cors = require('cors');
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");
// cds.on("bootstrap", (app) => app.use(cov2ap()));
cds.on("bootstrap", function(app){
    app.use(cov2ap());
    app.use(cors());
})
module.exports = cds.server;