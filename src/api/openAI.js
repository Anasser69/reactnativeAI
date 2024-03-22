import axios from "axios";
import axiosRetry from "axios-retry";
import {API_KEY} from '@env'

const MAX_REQUESTS = 10; // Maximum number of requests allowed within the time period
const TIME_PERIOD = 60 * 1000; // Time period in milliseconds (e.g., 1 minute)

const client = axios.create({
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  }
});

axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isRetryableError
});

const chatgptendpoint = "https://api.openai.com/v1/chat/completions";
const dalleendpoint = "https://api.openai.com/v1/images/generations";

let requestCount = 0;
let lastRequestTimestamp = Date.now();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeRequest = async (prompt, messages) => {
  try {
    const now = Date.now();
    const elapsed = now - lastRequestTimestamp;

    if (elapsed < TIME_PERIOD && requestCount >= MAX_REQUESTS) {
      // Wait until the time period is over before making additional requests
      const remainingTime = TIME_PERIOD - elapsed;
      await delay(remainingTime);
    }

    const res = await client.post(chatgptendpoint, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with yes or no`
        }
      ]
    });

    requestCount++;
    lastRequestTimestamp = Date.now();

    console.log("data ", res.data.choices[0].message);
    return res.data.choices[0].message;
  } catch (error) {
    console.log("error: ", error);

    // Retry only if it's a 429 error
    if (axiosRetry.isRetryableError(error) && error.response.status === 429) {
      const retryAfter = parseInt(error.response.headers["retry-after"]) || 1;
      await delay(retryAfter * 1000); // Convert seconds to milliseconds
      return makeRequest(prompt, messages); // Retry the request
    }

    return { success: false, msg: error.message };
  }
};

export const apiCall = async (prompt, messages) => {
  try {
    const response = await makeRequest(prompt, messages);
    return { success: true, msg: response };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};