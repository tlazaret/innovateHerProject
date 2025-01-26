import json
import os

from groq import Groq
from app.models import Prompt

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

sys_prompt_text = {
    "role": "system",
    "content": "You are a fitness and wellness assistant for women's health",
}

sys_prompt_json = {
    "role": "system",
    "content": "You are a fitness and wellness assistant for women's health.",
}

text_model = "llama-3.3-70b-versatile"
json_model = "mixtral-8x7b-32768"


async def generate_text(prompt: Prompt):
    gentext = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a fitness and wellness assistant for women's health",
            },
            {"role": "user", "content": prompt.content},
        ],
        model=text_model,
    )
    return gentext.choices[0].message.content


async def generate_json(message: str):
    res = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": """
                You are a fitness and wellness assistant for women's health and wellness. You are in charge of updating your user weekly schedule in JSON format based on their mood and requests. The JSON schema should be:
                {
                    "days": (List of length 7 for each day of the week) [
                        {
                            workout: {
                                content: "string (suggesting a excercise for the day)"
                                },
                            meals : {
                                content: "string (suggested meal plan for the day)"
                                },
                            cycles: "good"
                            } 
                        ]
                }
                """,
            },
            {"role": "user", "content": message},
        ],
        model=json_model,
        response_format={"type": "json_object"},
    )

    data = res.choices[0].message.content

    if not data:
        return None

    return json.loads(data)
