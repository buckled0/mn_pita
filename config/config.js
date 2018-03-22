exports.port = () => process.env.PORT || 8000;
exports.dbUrl = () => process.env.DB_URL || "mongodb://localhost:27017"
