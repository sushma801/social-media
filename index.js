const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./GraphQl/typeDefs.js");

const { MONGODB } = require("./config.js");
const resolvers = require("./GraphQl/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Mongodb is connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });

// server.listen({ port: 5000 }).then((res) => {
//   console.log(`Server is running at ${res.url}`);
// });
