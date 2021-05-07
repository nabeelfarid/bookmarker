const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");

const q = faunadb.query;
var fdbClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_KEY });

const typeDefs = gql`
  type Query {
    allBookmarks: [Bookmark!]!
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String
    description: String!
  }
  type Mutation {
    createBookmark(url: String!): Bookmark
  }
`;

const resolvers = {
  Query: {
    allBookmarks: async (_parents, _args, context) => {
      const results = await fdbClient.query(
        q.Paginate(q.Match(q.Index("bookmarksAllData_sort_by_ref_desc")))
      );

      return results.data.map(([ref, url, title, description]) => ({
        id: ref.id,
        url,
        title,
        description,
      }));

      // return Object.values(todos).sort((a, b) => b.created - a.created);
    },
  },
  Mutation: {
    createBookmark: async (_, args) => {
      const result = await fdbClient.query(
        q.Create(q.Collection("Bookmark"), {
          data: {
            url: args.url,
            title: "some title",
            description: "some description",
          },
        })
      );

      return {
        ...result.data,
        id: result.ref.id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
