import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { chatWithLLM } from '../services/api'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatBarProps {
  context?: string // Optional context about current analysis or company
  onClose?: () => void
}

export default function ChatBar({ context, onClose }: ChatBarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await chatWithLLM(input, context)
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response'
      setError(errorMessage)
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-dark-900/95 to-dark-800/90 border-l border-orange-500/30 rounded-lg shadow-2xl shadow-orange-500/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-orange-500/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5 text-amber-300" />
          <h3 className="text-sm font-semibold text-amber-200">AI Chat Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400/70 hover:text-red-300 transition-colors"
              title="Clear chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-orange-500/20 text-orange-400/70 hover:text-orange-300 transition-colors"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-12 h-12 text-orange-500/20 mb-3" />
            <p className="text-amber-200/50 text-sm font-medium">Start a conversation</p>
            <p className="text-amber-200/30 text-xs mt-1">Ask questions about AI ethics and policies</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-orange-600/40 to-purple-600/30 text-amber-100 rounded-br-none shadow-lg shadow-orange-500/20'
                  : 'bg-gradient-to-r from-purple-900/40 to-orange-900/30 text-amber-50 rounded-bl-none shadow-lg shadow-purple-500/20 border border-purple-500/20'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-amber-200/50' : 'text-purple-200/50'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-purple-900/40 to-orange-900/30 text-amber-50 px-4 py-3 rounded-lg rounded-bl-none shadow-lg shadow-purple-500/20 border border-purple-500/20">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
              ❌ {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-orange-500/20 p-3 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 bg-dark-800/50 border border-orange-500/30 rounded-lg px-3 py-2 text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/50 transition-all disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-orange-600/40 to-purple-600/40 hover:from-orange-600/60 hover:to-purple-600/60 text-amber-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
