
module.exports=(Sequelize,sequelize,DataTypes)=>{
    return sequelize.define("socketUser",{
            ...require("./core")(Sequelize,DataTypes),
            userId:{
              type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: "user", // name of Target model
                key: "id", // key in Target model that we"re referencing
              }            },
            socketId:{
              type:DataTypes.STRING(255),
              defaultValue:"",
              allowNull:true
            },
            isOnline:{
                type:DataTypes.TINYINT(1),
                defaultValue:0
            }
    })
}