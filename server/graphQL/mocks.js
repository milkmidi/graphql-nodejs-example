const casual = require('casual');

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => ({ firstName: args.firstName, lastName: args.lastName }),
  }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ id: casual.integer(0, 100), title: casual.title, text: casual.sentences(3) }),
};
module.exports = mocks;
