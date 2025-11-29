import requests

NODE_SERVER_URL = "https://neurolift-server.onrender.com"  

def fetch_profile_from_node(token: str):
    try:
        response = requests.get(
            f"{NODE_SERVER_URL}/api/profile",
            headers={"Authorization": f"Bearer {token}"}
        )
        data = response.json()

        if not data.get("success"):
            return "None"

        return data.get("data")
    except Exception as e:
        print("Error fetching profile:", e)
        return None
