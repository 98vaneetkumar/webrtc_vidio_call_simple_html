const Sequelize = require("sequelize");
var sequelize = new Sequelize(
	"oneToOneVideoCall",
	"root",
	"Vaneet5509@",
    {
        query: { raw: true }, // Place the query option here
    },
    {
		host: "localhost",
		dialect: "mysql",
        logging: true,
	});
var connectDB = () => {
	sequelize.authenticate()
		.then(() => {
			sequelize.sync({alter:false});
			console.log("Connection has been established successfully.");
		})
		.catch(err => {
			console.error("Unable to connect to the database:", err);
		});
};
module.exports = {
	connectDB: connectDB,
	sequelize: sequelize
};