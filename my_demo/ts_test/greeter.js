var Student = /** @class */ (function () {
    // TODO: 在构造函数的参数上使用public等同于创建了同名的成员变量。
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + '' + lastName;
    }
    return Student;
}());
function greeter(person) {
    return 'hello,' + person.firstName + ' ' + person.lastName;
}
// let user = 'JoeZhang';
/*
TODO:
这里我们使用接口来描述一个拥有firstName和lastName字段的对象。
在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。
这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句。
*/
// let user = { firstName: 'Joe', lastName: 'Zhang' };
var user = new Student('Joe', 'Q', 'Zhang');
// console.log(greeter(user));
document.body.innerHTML = greeter(user);
