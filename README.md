# TypeScript CLI Tool for Generating Question-Answer Pairs

This TypeScript CLI tool helps you generate question-answer pairs for input examples using OpenAI's GPT-3. The tool takes a code example and a description, sends it to the GPT-3 API, receives question-answer pairs related to the input, and saves the generated data to a JSON file.

## Prerequisites

- Node.js 14.x or later
- An OpenAI API key

## Installation

```
npm install
```

## Usage

1. Replace `your-api-key` in the `generate_qa_pairs.ts` file with your OpenAI API key:

```typescript
const apiKey = "your-api-key";
```

2. Run the CLI tool:

```
npm start

```

1. Follow the prompts to enter a code example and a description. Press Enter on an full stop line to finish entering multiline input.

2. The generated question-answer pairs will be saved to a JSON file named output-TIMESTAMP.json, where TIMESTAMP is the current Unix timestamp.

## Example

Suppose you have the following input:

````
Q: Implement Pick<T, K>
A: ```
type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
}
````

The CLI tool will send this input to the GPT-3 API and save the generated question-answer pairs to a JSON file.
