import * as fs from "fs";
import * as readline from "readline";
import { Message } from "./chatgpt-utils";
import { chatWithGPT } from "./chatWithGPT";

// Replace with your OpenAI API key
const apiKey = "YOUR_API_KEY";

function readMultilineInput(promptString: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const inputLines: string[] = [];

    console.log(promptString);
    rl.prompt();

    rl.on("line", (line) => {
      if (line === ".") {
        rl.close();
      } else {
        inputLines.push(line);
      }
    });

    rl.on("close", () => {
      resolve(inputLines.join("\n"));
    });
  });
}
// Handle Ctrl+C (SIGINT) event
process.on("SIGINT", () => {
  console.log("\nExiting...");
  process.exit();
});
async function generateQAPairs(
  inputQuestion: string,
  inputAnswer: string
): Promise<void> {
  const messages: Message[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant that generates TypeScript programming-related question-answer pairs related to a given input example.",
    },
    {
      role: "user",
      content: `Please generate TypeScript programming-related question-answer pairs that are related to the given input example, covering various concepts, features, and best practices. Make sure the questions require logical reasoning and understanding of TypeScript concepts. Provide a concise, accurate, and clear answer for each question, including relevant code snippets when applicable. Present the output in a structured JSON format.

Input Example:\nQ: ${inputQuestion}\nA: \`\`\`\n${inputAnswer}\n\`\`\`

Generate question-answer pairs related to the input example about TypeScript programming in a questions array of question and answer object in a JSON format:`,
    },
  ];

  try {
    console.log("Generating question-answer pairs...");
    const generatedContent = await chatWithGPT(apiKey, messages);
    if (!generatedContent) {
      console.error("Error generating question-answer pairs.");
      return;
    }
    console.log(generatedContent);

    const timestamp = new Date().toISOString();
    const outputFilename = `output-${timestamp}.json`;
    fs.writeFileSync(outputFilename, generatedContent.trim());
    console.log(
      `Generated question-answer pairs have been saved to ${outputFilename}.`
    );
  } catch (error) {
    console.error("Error generating question-answer pairs:", error);
  }
}

async function main() {
  while (true) {
    const inputQuestion = await readMultilineInput(
      "Please enter the input question:\n"
    );

    const inputAnswer = await readMultilineInput(
      "Please enter the input answer:\n"
    );

    if (inputQuestion.length === 0 || inputAnswer.length === 0) {
      return;
    }
    await generateQAPairs(inputQuestion, inputAnswer);
  }
}

main();
