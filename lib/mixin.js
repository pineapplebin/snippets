'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mixin(behaviour) {
    var shared_behaviour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var instance_keys = Reflect.ownKeys(behaviour);
    var shared_keys = Reflect.ownKeys(shared_behaviour);
    var type_tag = Symbol('isa');

    function _mixin(clazz) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = instance_keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var property = _step.value;

                Object.defineProperty(clazz.prototype, property, {
                    value: behaviour[property],
                    writable: true
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        Object.defineProperty(clazz.prototype, type_tag, { value: true });
        return clazz;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = shared_keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var property = _step2.value;

            Object.defineProperty(_mixin, property, {
                value: shared_behaviour[property],
                enumerable: shared_behaviour.propertyIsEnumerable(property)
            });
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: function value(i) {
            return !!i[type_tag];
        }
    });

    return _mixin;
}

/* eg. */
var BookCollector = mixin({
    addToCollection: function addToCollection(name) {
        this.collection().push(name);
        return this;
    },
    collection: function collection() {
        return this._collected_books || (this._collected_books = []);
    }
});

var Person = BookCollector(function () {
    function _class(first, last) {
        _classCallCheck(this, _class);

        this.rename(first, last);
    }

    _createClass(_class, [{
        key: 'fullName',
        value: function fullName() {
            return this.first_name + ' ' + this.last_name;
        }
    }, {
        key: 'rename',
        value: function rename(first, last) {
            this.first_name = first;
            this.last_name = last;
            return this;
        }
    }]);

    return _class;
}());

module.exports = {
    Person: Person,
    BookCollector: BookCollector
};