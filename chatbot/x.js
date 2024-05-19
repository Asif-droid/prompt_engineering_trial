// chatbot.js
require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const openaiApiKey = process.env.api_key;
const openaiUrl = 'https://api.openai.com/v1/chat/completions';

async function getChatbotResponse(userInput) {
    try {
        const response = await fetch(openaiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: userInput }],
            }),
          });

        const chatbotReply = response.json().choices[0].messages.content;
        return chatbotReply;
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        return 'Sorry, I am having trouble understanding you right now. Please try again later.';
    }
}

// index.js



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Chatbot is running. Type your message and press Enter.');

rl.on('line', async (input) => {
    const response = await getChatbotResponse(input);
    console.log('Chatbot:', response);
});

