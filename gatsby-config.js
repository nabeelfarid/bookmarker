require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
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
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "FaunaBookmarksDb",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "fauna",
        url: "https://graphql.fauna.com/graphql",
        headers: {
          Authorization: "Bearer fnAEIjPQPhACCVLvJehGIk9x3a13Tn9g_iYYvQGl",
        },
      },
    },
  ],
};
