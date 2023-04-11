import * as fs from "fs";

// Input JSON file containing question-answer pairs
const inputFile = "./dataset/combined.json";

// Output JSON file
const outputFile = "./dataset/alpaca_data_format.json";

// Read the input JSON file
const inputContent = fs.readFileSync(inputFile, "utf-8");
const inputData = JSON.parse(inputContent);

// Check if the input data has the required 'questions' property
if (!inputData.questions) {
  console.error(
    'The input JSON file does not have the required "questions" property.'
  );
  process.exit(1);
}

// Convert the question-answer pairs to the desired format
const convertedData = inputData.questions.map(
  (item: { question: string; answer: string }) => {
    return {
      instruction: item.question,
      input: "",
      output: item.answer,
    };
  }
);

// Save the converted data to a new JSON file
fs.writeFileSync(outputFile, JSON.stringify(convertedData, null, 2));

console.log("Converted data has been saved to", outputFile);
