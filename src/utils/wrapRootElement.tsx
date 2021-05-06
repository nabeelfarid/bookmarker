import React from "react";
import RootLayout from "../components/rootLayout";
// import ApolloClientProvider from "./ApolloClientProvider";

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);

  return (
    <RootLayout>
      {/* <ApolloClientProvider> */}
      {element}
      {/* </ApolloClientProvider> */}
    </RootLayout>
  );
};
