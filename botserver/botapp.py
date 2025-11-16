from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from groq import Groq

app = FastAPI()
import os 
from dotenv import load_dotenv
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY")) # <-- put your key here


class ChatRequest(BaseModel):
    message: str

# --- ADD THIS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # allow all origins (or specify frontend URL)
    allow_credentials=True,
    allow_methods=["*"],          # allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)
# -

@app.post("/chat")
def chat(req: ChatRequest):

    # Send prompt to Groq
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",  # You can change model if needed
        messages=[
            {"role": "user", "content": req.message}
        ]
    )

    reply = completion.choices[0].message.content

    return {"reply": reply}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
