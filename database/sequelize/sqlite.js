const Sequelize = require('sequelize')
let path = require('path')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    operatorsAliases: false,
    logging: false, //关闭打印输出
    // 仅限 SQLite
    storage: path.resolve(__dirname, './dbs/sqlite.db')
})
sequelize.import('./moudles/sqlite.js')
class Record extends Sequelize.Model {}
Record.init(
    {
        userId: Sequelize.BIGINT,
        op: Sequelize.STRING,  //操作类型
        status: Sequelize.STRING, //操作成功失败
        log: Sequelize.STRING
    },
    { sequelize, modelName: 'Record' }
)
Record.sync()

module.exports = sequelize
