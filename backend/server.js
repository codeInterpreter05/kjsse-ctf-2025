const { ApolloServer, gql } = require('apollo-server');
const notes = require('./data');

const typeDefs = gql`
  type Note {
    id: ID!
    content: String
    _internalData: String
  }

  type Query {
    noteById(id: ID): Note
    allNotes: [Note]
    _getFlag: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    noteById: (_, args) => notes.find(note => note.id === args.id),
    allNotes: () => {
      throw new Error("You're not allowed to fetch all notes at once.");
    },
    _getFlag: () => "Hahaha!! Not so easy bro. Put in some work!", 
  },
  Note: {
    _internalData: () => "KJSSE_CTF{gr4phq1_qu3ry_f0r_1h3_w1n!}",
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});