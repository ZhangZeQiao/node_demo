// TODO: 不能用const Sequelize = require('sequelize');这样引用，写代码没有提示
const Sequelize = require('sequelize/index');
const config = require('./config');

// 第一步，创建一个sequelize对象实例：
// constructor(database: string, username: string, password?: string, options?: Options);
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 第二步，定义模型，告诉Sequelize如何映射数据库表：
// public define(modelName: string, attributes: ModelAttributes, options?: ModelOptions)
// TODO: 数据库中的表的表名一定得是复数的！！ORM规则
// TODO: var User这样写时运行出问题，const User这样写就没问题？！（但是没有充分验证）
const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    name: Sequelize.STRING(20),
    sex: Sequelize.BIGINT,
    degree: Sequelize.DOUBLE
}, {
    /**
  * Adds createdAt and updatedAt timestamps to the model. Default true.
  * 将createdAt和updatedAt时间戳添加到模型中。默认为true
  */
    timestamps: false
});

// 传统方式：
/* User.create({
    name: 'Joe',
    sex: '1',
    degree: 13
}).then(function (u) {
    console.log('created---' + JSON.stringify(u));
}).catch(function (err) {
    console.log('failed---' + err);
}); */

// 用async-await方式：
(async () => {
    const users = await User.findAll({
        where: {
            name: 'Joe'
        }
    });
    console.log(`find ${users.length} users:`);
    for (const u of users) {
        console.log(JSON.stringify(u));
    }
})();

// 更新内容
(async () => {
    User.update(
        {
            name: 'Hai',
            sex: 0
        }, {
        where: {
            id: 3
        }
    }
    );
})();

// 删除内容
(async () => {
    User.destroy(
        {
            where: {
                id: 6
            }
        }
    );
})();
