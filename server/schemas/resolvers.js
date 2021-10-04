const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, { _id }) => {
            return User.findOne({ _id })
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return user;
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { book: args } },
                    { new: true }
                );
                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { book: args } },
                );
                return user;
            }
        }
    }
}

module.exports = resolvers;