const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on('起床', function (time) {
    console.log(`早上 ${time} 开始起床，新的一天加油喔！`);
});
emitter.emit('起床', '6:00');

// TODO: 模块 Events（EventEmitter 事件触发器），也称为发布/订阅模式
/*
主要用到以下两个 API，触发、注册一个监听函数。
emit：触发一个监听函数
on：注册一个监听函数
*/