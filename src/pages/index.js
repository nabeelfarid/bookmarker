import * as React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { Box, Divider, Typography, Link } from "@material-ui/core";

const IndexPage = (props) => {
  return (
    <Layout>
      <Seo title="Home" />
      <Typography variant="h5">Bookmarks</Typography>
      <Divider />

      {props.data.fauna.allBookmarks.data.map((bookmark) => {
        return (
          <Box key={bookmark._id} mt={2}>
            <Link
              variant="h6"
              color="secondary"
              href={bookmark.url}
              target="blank"
              rel="noopener"
            >
              {bookmark.url}
            </Link>

            <Typography variant="subtitle2">{bookmark.description}</Typography>
          </Box>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query {
    fauna {
      allBookmarks {
        data {
          description
          url
          _id
        }
      }
    }
  }
`;

export default IndexPage;
