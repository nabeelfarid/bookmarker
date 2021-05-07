require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: `Bookmarker`,
    description: `Bookmarking App created with Gatsby, Graphql, Fauna DB and Netlify`,
    author: `Nabeel Farid`,
    repo: "https://github.com/nabeelfarid/bookmarker",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bookmarker`,
        short_name: `Bookmarker`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: process.env.FAUNADB_SERVER_KEY,
        index: `bookmarks_sort_by_ref_desc`,
        // This is the name under which your data will appear in Gatsby GraphQL queries
        // The following will create queries called `allBookmark` and `bookmark`.
        type: "bookmark",
      },
    },
  ],
};
