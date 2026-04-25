import os
import json
import requests
from typing import Optional
from abc import ABC, abstractmethod


class LLMProvider(ABC):
    """Abstract base class for LLM providers"""

    @abstractmethod
    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate text based on prompt"""
        pass


class AzureOpenAIProvider(LLMProvider):
    """Azure OpenAI LLM Provider"""

    def __init__(self,
                 endpoint: Optional[str] = None,
                 api_key: Optional[str] = None,
                 model: Optional[str] = None):
        self.endpoint = endpoint or os.getenv("AZURE_OPENAI_ENDPOINT")
        self.api_key = api_key or os.getenv("AZURE_OPENAI_API_KEY")
        self.model = model or os.getenv("AZURE_OPENAI_MODEL")

        if not all([self.endpoint, self.api_key, self.model]):
            raise ValueError(
                "Azure OpenAI requires AZURE_OPENAI_ENDPOINT, "
                "AZURE_OPENAI_API_KEY, and AZURE_OPENAI_MODEL environment variables"
            )

        # Ensure endpoint has trailing slash
        if not self.endpoint.endswith('/'):
            self.endpoint += '/'

    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate text using Azure OpenAI"""
        try:
            headers = {
                "api-key": self.api_key,
                "Content-Type": "application/json",
            }
            # Allow overriding the API version via env var if the user set a newer version
            api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")

            # Azure expects 'max_completion_tokens' for some newer models/deployments
            data = {
                "messages": [
                    {"role": "system", "content": "You are a helpful AI assistant analyzing corporate AI policies and ethics."},
                    {"role": "user", "content": prompt}
                ],
                "max_completion_tokens": max_tokens,
            }

            # Azure OpenAI expects: https://<resource-name>.openai.azure.com/openai/deployments/<deployment-name>/chat/completions
            url = f"{self.endpoint}openai/deployments/{self.model}/chat/completions?api-version={api_version}"

            response = requests.post(url, headers=headers, json=data, timeout=120)
            response.raise_for_status()

            result = response.json()
            return result["choices"][0]["message"]["content"]
        except requests.exceptions.ConnectionError:
            raise RuntimeError(
                f"Could not connect to Azure OpenAI at {self.endpoint}. "
                "Please check your endpoint URL."
            )
        except requests.exceptions.HTTPError as e:
            if response.status_code == 401:
                raise RuntimeError("Invalid Azure OpenAI API key")
            elif response.status_code == 404:
                raise RuntimeError(f"Azure OpenAI deployment '{self.model}' not found")
            else:
                raise RuntimeError(f"Azure OpenAI error: {response.text}")
        except Exception as e:
            raise RuntimeError(f"Error generating with Azure OpenAI: {str(e)}")


class MockLLMProvider(LLMProvider):
    """Mock LLM Provider for testing and lightweight development"""

    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate mock response"""
        # Lightweight mock response used in development when no external LLM is configured
        if "google" in prompt.lower():
            return json.dumps({
                "overallSummary": "Google's terms provide broad authorization for data collection to enhance services and ad personalization, balanced by centralized user controls via the 'My Activity' dashboard. Recently, policies have expanded to explicitly cover the use of publicly available data for training AI models like Gemini.",
                "keyPoints": [
                    "Extensive Data Collection: Searches, location data, and usage patterns are collected to power personalized advertisements.",
                    "Centralized Control: Users can manage, export, and delete their data via the 'Google Account' privacy settings.",
                    "AI Development: Data policies allow the use of publicly accessible data to train generative AI systems."
                ],
                "redFlags": [
                    {
                        "title": "Cross-Service Tracking",
                        "description": "Deep integration across YouTube, Maps, Search, and Android results in a comprehensive data profile.",
                        "severity": "high",
                        "year": 2025
                    },
                    {
                        "title": "Broad AI Permissions",
                        "description": "Policy updates grant extensive rights to use public information for AI training.",
                        "severity": "medium",
                        "year": 2024
                    }
                ],
                "timelineChanges": [
                    {
                        "year": 2024,
                        "change": "Updated terms to allow scraping of publicly available data.",
                        "impact": "Increased data usage for AI models like Gemini."
                    },
                    {
                        "year": 2025,
                        "change": "Enhanced user tools for managing sensitive location histories.",
                        "impact": "Improved user privacy controls."
                    }
                ],
                "recommendations": [
                    {
                        "title": "Audit 'My Activity'",
                        "description": "Regularly audit 'My Activity' and turn on the auto-delete feature.",
                        "priority": "important"
                    },
                    {
                        "title": "Adjust Ad Settings",
                        "description": "Review and adjust privacy settings in the Google Ad Center to limit tracking.",
                        "priority": "standard"
                    }
                ]
            })
            
        return json.dumps({
            "overallSummary": "This is a mock response. Real LLM analysis is disabled.",
            "keyPoints": [
                "Mock response - LLM provider not configured",
                "Enable Azure OpenAI and set LLM_PROVIDER=azure_openai to use a real service"
            ],
            "redFlags": [],
            "timelineChanges": [],
            "recommendations": []
        })


class LLMService:
    """Service for LLM operations. Defaults to a fast Mock provider for development.

    Use environment variable LLM_PROVIDER to change behaviour:
      - "mock" (default) : fast local mock provider
      - "azure_openai"  : use Azure OpenAI (requires AZURE_OPENAI_* env vars)
    """

    def __init__(self, provider: Optional[LLMProvider] = None):
        if provider is None:
            provider_type = os.getenv("LLM_PROVIDER", "mock").lower()

            if provider_type == "azure_openai":
                try:
                    provider = AzureOpenAIProvider()
                except Exception as e:
                    print(f"Warning: Azure OpenAI not available or misconfigured: {e}")
                    print("Falling back to MockLLMProvider...")
                    provider = MockLLMProvider()
            else:
                provider = MockLLMProvider()

        self.provider = provider

    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate text using the configured LLM provider"""
        return self.provider.generate(prompt, max_tokens)

    @staticmethod
    def create_provider(provider_name: str) -> LLMProvider:
        """Factory to create a provider instance by name.

        Supported names: 'mock', 'azure_openai'
        Raises ValueError for unknown provider or missing configuration.
        """
        name = (provider_name or "mock").lower()
        if name == "mock":
            return MockLLMProvider()
        if name == "azure_openai":
            # May raise ValueError if env vars missing
            return AzureOpenAIProvider()
        raise ValueError(f"Unsupported LLM provider: {provider_name}")

