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
