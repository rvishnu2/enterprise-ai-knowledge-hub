import requests


class AIService:

    @staticmethod
    def generate_response(messages):

        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "gemma3:1b",
                "messages": messages,
                "stream": False
            },
            timeout=300
        )

        response.raise_for_status()

        data = response.json()

        return data["message"]["content"]