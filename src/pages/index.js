import * as React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Box, Divider, Typography, Link, useTheme } from "@material-ui/core";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

const IndexPage = (props) => {
  const theme = useTheme();
  return (
    <Layout>
      <Seo title="Home" />
      <Box display="flex" alignItems="center">
        <BookmarksIcon /> {"  "}
        <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }}>
          Your Bookmarks
        </Typography>
      </Box>
      <Divider />

      {props.data.allBookmark.edges.map((edge) => {
        return (
          <Box key={edge.node._id} mt={2}>
            <Link
              variant="h6"
              color="secondary"
              href={edge.node.url}
              target="blank"
              rel="noopener"
            >
              {edge.node.url}
            </Link>

            <Typography variant="subtitle2">{edge.node.description}</Typography>
          </Box>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query {
    allBookmark {
      edges {
        node {
          _id
          url
          description
        }
      }
    }
  }
`;

// graphql`
//   query {
//     fauna {
//       allBookmarks {
//         data {
//           description
//           url
//           _id
//         }
//       }
//     }
//   }
// `;

export default IndexPage;
