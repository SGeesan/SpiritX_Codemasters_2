const OpenAI = require("openai");

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = "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";

async function main() {

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
  });

  const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "" },
      { role:"user", content: "What are the things for a good player?" }
    ],
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1
  });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});