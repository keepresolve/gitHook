const Sequelize = require('sequelize')
let path = require('path')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // (node:1447) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
    // operatorsAliases: false, 
    logging: true, //关闭打印输出
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
