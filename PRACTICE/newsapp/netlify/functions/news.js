import fetch from "node-fetch";

export async function handler(event) {
  const API_KEY = process.env.NEWS_API_KEY; // stored safely in Netlify
  const { query } = event.queryStringParameters;

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=50&apiKey=${API_KEY}`
    );
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*", // allow your frontend
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server Error", error }),
    };
  }
}
