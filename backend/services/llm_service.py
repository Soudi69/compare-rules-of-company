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

class OllamaProvider(LLMProvider):
    """Ollama LLM Provider"""
    
    def __init__(self, model: str = "llama2", base_url: str = "http://localhost:11434"):
        self.model = model
        self.base_url = base_url
    
    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate text using Ollama"""
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "num_predict": max_tokens,
                    "temperature": 0.7,
                },
                timeout=120
            )
            response.raise_for_status()
            return response.json()["response"]
        except requests.exceptions.ConnectionError:
            raise RuntimeError(
                f"Could not connect to Ollama at {self.base_url}. "
                "Make sure Ollama is running with: ollama serve"
            )
        except Exception as e:
            raise RuntimeError(f"Error generating with Ollama: {str(e)}")

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
            
            data = {
                "messages": [
                    {"role": "system", "content": "You are a helpful AI assistant analyzing corporate AI policies and ethics."},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": max_tokens,
                "temperature": 0.7,
            }
            
            # Azure OpenAI expects: https://<resource-name>.openai.azure.com/openai/deployments/<deployment-name>/chat/completions
            url = f"{self.endpoint}openai/deployments/{self.model}/chat/completions?api-version=2024-02-15-preview"
            
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
    """Mock LLM Provider for testing"""
    
    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate mock response"""
        # This is a placeholder - will be used if Ollama is not available
        return json.dumps({
            "overallSummary": "This is a mock response. Please run Ollama to get real analysis.",
            "keyPoints": [
                "Mock response - actual analysis requires Ollama",
                "Please ensure Ollama is running with llama2 model"
            ],
            "redFlags": [
                {
                    "title": "Mock Red Flag",
                    "description": "This is a mock response",
                    "severity": "medium"
                }
            ],
            "timelineChanges": [],
            "recommendations": []
        })

class LLMService:
    """Service for LLM operations"""
    
    def __init__(self, provider: Optional[LLMProvider] = None):
        if provider is None:
            provider_type = os.getenv("LLM_PROVIDER", "ollama").lower()
            
            if provider_type == "azure_openai":
                try:
                    provider = AzureOpenAIProvider()
                    # Test connection
                    provider.generate("Hello", max_tokens=10)
                except Exception as e:
                    print(f"Warning: Azure OpenAI not available: {e}")
                    print("Falling back to Ollama...")
                    try:
                        provider = OllamaProvider()
                        provider.generate("test", max_tokens=10)
                    except Exception:
                        print("Warning: Ollama not available, using mock provider")
                        provider = MockLLMProvider()
            else:
                # Try Ollama first, fall back to mock
                try:
                    provider = OllamaProvider()
                    # Test connection
                    provider.generate("test", max_tokens=10)
                except Exception:
                    print("Warning: Ollama not available, using mock provider")
                    provider = MockLLMProvider()
        
        self.provider = provider
    
    def generate(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate text using the LLM provider"""
        return self.provider.generate(prompt, max_tokens)

