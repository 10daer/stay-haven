import { uploadAll } from "../../data/Uploader";

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    await uploadAll();
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Upload completed successfully"})
    };
  } catch (error) {
    console.error('Error during upload:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: "An error occurred during the upload"})
    };
  }
};