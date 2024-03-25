const {Sequelize, DataTypes}=require("sequelize")
const sequelize=require("../dbConnetion")
module.exports={
    userModel:require("./user")(Sequelize,sequelize,DataTypes),
    socketUser:require("./socketUser")(Sequelize,sequelize,DataTypes),
}