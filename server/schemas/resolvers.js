const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user
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