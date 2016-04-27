import casual from 'casual';

import {
  Books
} from '../imports/api/books';

import {
  Meteor
} from 'meteor/meteor';

// publish
Meteor.publish('books', (limit) => {
  return Books.find({}, {
    limit
  });
});

// data fixtures
Meteor.startup(() => {
  Books.remove({});

  for (let i = 0; i < 10; i++) {
    Books.insert(casual.book);
  }
});

// helper
casual.define('book', () => ({
  title: casual.title,
  description: casual.short_description,
  author: casual.full_name
}));
