exports.port = () => process.env.PORT || 8000;
exports.dbUrl = () => process.env.DB_URL || "mongodb://mnhq:mnhq1234@ds153778.mlab.com:53778/reports"
