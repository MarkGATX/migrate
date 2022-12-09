const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Country, CompileCountry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    countryCompilations: async () => {
      return await CompileCountry.find({}).populate('year_catalog');
    },
    countries: async () => {
      return await Country.find({});
    },
    singleCompileCountry: async (parent, { countryname }) => {
      return CompileCountry.findOne({ countryname }).populate('year_catalog')
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log('this is being read')g
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  //   addComment: async (parent, { commentText }, context) => {
  //     if (context.user) {
  //       const comment = await Comment.create({
  //         commentText,
  //         commentAuthor: context.user.username,
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $addToSet: { comments: comment._id } }
  //       );

  //       return comment;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  //   removeComment: async (parent, { commentId }, context) => {
  //     if (context.user) {
  //       const comment = await Comment.findOneAndDelete({
  //         _id: commentId,
  //         commentAuthor: context.user.username,
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { comments: comment._id } }
  //       );

  //       return comment;
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   },
  },


};


module.exports = resolvers;
