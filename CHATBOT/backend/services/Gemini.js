const { PredictionServiceClient } = require('@google-cloud/aiplatform');

const client = new PredictionServiceClient();

const project = process.env.GCP_PROJECT_ID;
const location = process.env.GCP_LOCATION; // e.g. 'us-central1'
const endpointId = process.env.GCP_ENDPOINT_ID;

async function getGeminiResponse(prompt) {
  const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

  const request = {
    endpoint,
    instances: [
      {
        content: prompt,
      },
    ],
    parameters: {
      temperature: 0.2,
      maxOutputTokens: 512,
    },
  };

  const [response] = await client.predict(request);
  const predictions = response.predictions;
  return predictions[0].content;
}

module.exports = { getGeminiResponse };
