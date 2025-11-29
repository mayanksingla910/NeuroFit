from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from groq import Groq
import os
from dotenv import load_dotenv
from botserver.nodeClient import fetch_profile_from_node

load_dotenv()

app = FastAPI()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ------------------------------- #
#   REQUEST BODY MODEL
# ------------------------------- #
class ChatRequest(BaseModel):
    message: str
    profile: dict | None = None   # <-- NEW: receive onboarding data


# ------------------------------- #
#   CORS
# ------------------------------- #
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------- #
#   BASE SYSTEM PROMPT
# ------------------------------- #
BASE_PROMPT = """
You are NeuroFit — an AI-powered expert gym trainer with 20+ years of real experience.
You give:
- accurate fitness guidance
- personalized diet/workout plans
- structured, readable responses
- no unnecessary information
- friendly and motivating tone
- never ask onboarding questions again if profile is provided

If user profile is present, ALWAYS personalize your answer using it.
"""

@app.post("/chat")
def chat(req: ChatRequest, authorization: str = Header(alias="Authorization")):
    # Extract message and profile
    token = authorization.split(" ")[1]  
    message = req.message
    profile = fetch_profile_from_node(token)
    print("===== RECEIVED PROFILE FROM CLIENT =====")
    print(profile)
    print("========================================")


    # Build dynamic personalization block
    if profile:
        profile_prompt = f"""
User Profile:
- Age: {profile.get("age")}
- Gender: {profile.get("gender")}
- Height: {profile.get("height")} {profile.get("heightParam")}
- Weight: {profile.get("weight")} {profile.get("weightParam")}
- Goal: {profile.get("goal")}
- Activity Level: {profile.get("activityLevel")}
- Diet: {profile.get("diet")}
- Allergies: {profile.get("allergies")}
- Description: {profile.get("description")}

Use this information to tailor ALL fitness, workout, and diet suggestions.
"""
    else:
        profile_prompt = "\n(No profile received, ask necessary detail politely.)"

    # Full system prompt for the AI
    final_prompt = BASE_PROMPT + "\n\n" + profile_prompt

    # AI completion
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": final_prompt},
            {"role": "user", "content": message},
        ],
    )

    reply = completion.choices[0].message.content
    return {"reply": reply}


# ------------------------------- #
#   RUN SERVER
# ------------------------------- #
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
