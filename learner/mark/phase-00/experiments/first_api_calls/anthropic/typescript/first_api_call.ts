import Anthropic from "@anthropic-ai/sdk";

async function main() {
    const client = new Anthropic();

    const MODEL = process.env.LLM_MODEL ?? "claude-sonnet-5";

    let question = "What is a neural network in one sentence?"

    const response = await client.messages.create({
        model: MODEL,
        max_tokens: 256,
        messages: [
            {
                role: "user",
                content: question
            }
        ]
    })

    for (const message of response.content) {
        if (message.type === "text") {
            console.log("Message text:", message.text);
        }
    }
}


main().catch(console.error)