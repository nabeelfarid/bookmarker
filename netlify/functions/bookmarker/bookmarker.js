const { ApolloServer, gql } = require("apollo-server-lambda");
const rp = require("request-promise");
const cheerio = require("cheerio");
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
      //get the html doc of the url to extract title and description
      const htmlString = await rp(args.url);
      const doc = cheerio.load(htmlString);
      // Get the text inside the tag
      const title = doc("head > title").text();
      // Get the text of the content attribute
      const description = doc('meta[name="description"]').attr("content");
      console.log(title, description);

      //save url with title and description to database
      const result = await fdbClient.query(
        q.Create(q.Collection("Bookmark"), {
          data: {
            url: args.url,
            title: title ? title : "",
            description: description ? description : "",
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
