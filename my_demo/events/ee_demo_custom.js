const EventEmitter = require('events');
const oneDayPlanRun = {
    '6:00': function () {
        console.log('--- 6 ---');
    },
    '7:00': function () {
        console.log('--- 7 ---');
    }
};

function OneDayPlan() {
    EventEmitter.call(this);
};

// 将一个指定的对象的原型设置为另一个对象或者null
Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype);
Object.setPrototypeOf(OneDayPlan, EventEmitter);

// TODO: 自定义 EventEmitter 类

// ------------------------------

const oneDayPlan = new OneDayPlan();

oneDayPlan.on('6:00', function () {
    oneDayPlanRun['6:00']();
});

oneDayPlan.on('7:00', function () {
    oneDayPlanRun['7:00']();
});

async function doMain() {
    oneDayPlan.emit('6:00');
    await sleep(2000);
    oneDayPlan.emit('7:00');
};

doMain();

async function sleep(s) {
    return new Promise(function (reslve) {
        setTimeout(() => {
            reslve(1)
        }, s);
    });
};