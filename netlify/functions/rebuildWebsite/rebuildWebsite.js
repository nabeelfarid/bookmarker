// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require("axios");

const handler = async (event) => {
  try {
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: `hello world`,
    //   }),
    // };
    // Trigger a new build to freeze this lolly forever
    const response = await axios.post(process.env.NETLIFY_BUILD_HOOK);

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Netlify Build has been triggered successfully`,
      }),
    };
  } catch (error) {
    return { statusCode: 400, body: error.toString() };
  }
};

module.exports = { handler };
