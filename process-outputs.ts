import * as fs from "fs";
import * as path from "path";

// Directory containing the JSON files
const inputDir = "./dataset/raw";

// Output JSON file
const outputFile = "./dataset/combined.json";

// Get all JSON files in the input directory that match the pattern "output-*.json"
const inputFiles = fs.readdirSync(inputDir).filter((file) => {
  return file.startsWith("output-") && file.endsWith(".json");
});

// Read the contents of each JSON file, parse the questions and answers, and combine them into a single array
const combinedQuestions: { question: string; answer: string }[] = [];

inputFiles.forEach((file) => {
  const fileContent = fs.readFileSync(path.join(inputDir, file), "utf-8");
  const jsonData = JSON.parse(fileContent);

  if (jsonData.questions) {
    combinedQuestions.push(...jsonData.questions);
  }
});

// Save the combined questions and answers to a new JSON file
fs.writeFileSync(
  outputFile,
  JSON.stringify({ questions: combinedQuestions }, null, 2)
);

console.log("Combined questions and answers have been saved to", outputFile);
