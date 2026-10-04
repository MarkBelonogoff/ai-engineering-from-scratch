import os

from dotenv import load_dotenv
import anthropic

load_dotenv()

client = anthropic.Anthropic()

MODEL = os.environ.get("LLM_MODEL", "claude-sonnet-5")

question = "What is a neural network in one sentence?"

response = client.messages.create(
    model=MODEL, max_tokens=256, messages=[{"role": "user", "content": question}]
)

print(response.content[0].text)
