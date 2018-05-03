const classMixin = require('../src/class_mixin');

const BookCollector = classMixin({
  addToCollection (name) {
    this.collection().push(name);
    return this;
  },
  collection () {
    return this._collected_books || (this._collected_books = [])
  }
});

const Person = BookCollector(class {
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
});

test('should instance of BookCollector', () => {
  const man = new Person();
  expect(man).toBeInstanceOf(BookCollector);
});
