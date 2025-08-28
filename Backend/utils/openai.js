// import dotenv from "dotenv";
// dotenv.config();
// console.log("Loaded OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const getOpenAIAPIResponse = async (message) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     });
//     return response.choices[0].message.content;
//   } catch (err) {
//     console.error("OpenAI API Error:", err);
//     throw err;
//   }
// };

// export default getOpenAIAPIResponse;

import dotenv from "dotenv";
dotenv.config();
console.log("Loaded OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Toggle this to true if you want to force mock responses
const USE_MOCK = true;

const getOpenAIAPIResponse = async (message) => {
  if (USE_MOCK || !process.env.OPENAI_API_KEY) {
    console.log("⚠️ Using mock response instead of OpenAI API");
    return `Mock reply: You said "${message}"`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo" if you want cheaper
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 200,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI API Error:", err);

    // fallback mock if API fails
    return `⚠️ Mock reply (API failed): You said "${message}"`;
  }
};

export default getOpenAIAPIResponse;
