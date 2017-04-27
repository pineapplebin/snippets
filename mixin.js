'use strict'

function mixin(behaviour, shared_behaviour = {}) {
    const instance_keys = Reflect.ownKeys(behaviour);
    const shared_keys = Reflect.ownKeys(shared_behaviour);
    const type_tag = Symbol('isa');

    function _mixin(target) {
        for (let property of instance_keys)
            Object.defineProperty(target, property, { value: behaviour[property] });
        Object.defineProperty(target, type_tag, { value: true });
        return target;
    }

    for (let property of shared_keys)
        Object.defineProperty(_mixin, property, { 
            value: shared_behaviour[property],
            enumerable: shared_behaviour.propertyIsEnumerable(property)
        });
    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i) => !!i[type_tag]
    });

    return _mixin;
}

/* eg. */
const BookCollector = mixin({
    addToCollection(name) { 
        this.collection().push(name);
        return this;
    },
    collection() {
        return this._collected_books || (this._collected_books = [])
    }
});

class Person {
    constructor (first, last) { 
        this.rename(first, last);
    }

    fullName () {
        return this.first_name + ' ' + this.last_name;
    }

    rename (first, last) {
        this.first_name = first;
        this.last_name = last;
        return this;
    }
}
BookCollector(Person.prototype);

function assert (expression, should) {
    if (expression !== should)
        throw new Error("expression's result not right")
}
const assertTrue = (expression) => assert(expression, true);

const man = new Person('Ben', 'Cen')
man.addToCollection('A');
man.addToCollection('B');

assertTrue(man.fullName() === 'Ben Cen');
assertTrue(man instanceof BookCollector);
assertTrue(man.collection().length === 2);
assertTrue(man.collection()[0] === 'A');
assertTrue(man.collection()[1] === 'B');

