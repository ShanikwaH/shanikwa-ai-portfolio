import React from 'react';
import { Sparkles, RotateCcw, Brain } from 'lucide-react';

const AIChat = ({
  uploadedData,
  chatMessages,
  currentMessage,
  setCurrentMessage,
  isTyping,
  onSend,
  onClear,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">
        Intelligent AI Assistant
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Sophisticated AI responses tailored to your data and questions
      </p>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="p-4 border-b border-white/20 flex justify-between items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <div>
            <h3 className="font-semibold flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              AI Data Analysis Expert
            </h3>
            <p className="text-xs text-gray-300">
              {uploadedData ? `Data loaded: ${uploadedData.length} rows` : 'Ready to help with data analysis questions'}
              <span className="text-green-400 ml-2">• Smart Responses Active</span>
            </p>
          </div>
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ask me about data analysis, business insights, or Shanikwa's capabilities!</p>
              <div className="mt-4 space-y-2 text-sm">
                <p>Try: "How can I improve my business ROI?"</p>
                <p>Or: "What insights can you find in my data?"</p>
                <p>Or: "Explain correlation analysis"</p>
                {uploadedData && <p>Or: "Analyze my uploaded data"</p>}
              </div>
            </div>
          )}

          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}>
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSend()}
              placeholder="Ask about data analysis, business insights, or capabilities..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={onSend}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
