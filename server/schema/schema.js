const graphql = require('graphql');
const { find, filter } = require('lodash');

const Book = require('../models/book.js');
const Author = require('../models/author.js');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => Author.findById(parent.authorId),
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => Book.find({ authorId: parent.id }),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Book.findById(args.id),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Author.findById(args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => Book.find({}),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => Author.find({}),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const { name, age } = args;
        let author = new Author({ name, age });
        return author.save();
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { id } = args;
        const doc = await Author.findByIdAndRemove(id);
        doc.remove(); /* at this point the doc does not exist in mongo, this is just for the hook */
        return doc;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const { name, genre, authorId } = args;
        let book = new Book({ name, genre, authorId });
        return book.save();
      },
    },
  },
});

Object.keys(BookType).map((key) => console.log({ [key]: BookType[key] }));
Object.keys(RootQuery).map((key) => console.log({ [key]: RootQuery[key] }));

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
