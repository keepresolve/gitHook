module.exports = async (sequelize, Sequelize) => {
    /**
     * 子企业表，用于存储各个企业的一些配置信息
     * */

    const Accout = sequelize.define(
        'Accout',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, 
            accoutName: {
                type: Sequelize.TEXT,
                allowNull: false
            }, 
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            }, 
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            } //创建时间
        },
        {
            // //使用自定义表名
            // freezeTableName: 'tb_enterprise',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )
    // Accout.removeAttribute('recordId')
    var result = await sequelize.sync()
    return result.models
    // return sequelize
}
