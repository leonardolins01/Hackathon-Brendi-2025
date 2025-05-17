import { config } from "dotenv";
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import readline from "readline";


async function run() {
  config();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function readUserInput() {
    rl.question("Write a phrase: ", async (message) => {
      const { object } = await generateObject({
        model: openai("gpt-4o-mini-2024-07-18"),
        system: "",
        prompt: `Analyze this phrase: ${message}`,
        output: "no-schema",
      });

      console.log(object);

      readUserInput();
    });
  }

  readUserInput();
}

run();
