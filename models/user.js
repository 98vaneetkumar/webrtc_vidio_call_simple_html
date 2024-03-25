module.exports=(Sequelize,sequelize,DataType)=>{
    return sequelize.define("user",{
        ...require("./core")(Sequelize,DataType),
        firstName:{
            type:DataType.STRING(255),
            defaultValue:"",
            allowNull:true
        },
        lastName:{
            type:DataType.STRING(255),
            defaultValue:"",
            allowNull:true
        }
    })
}