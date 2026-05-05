import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, updateForm, Message } from '../store/interactionSlice';
import { RootState, AppDispatch } from '../store';
import { Send, Loader2, Sparkles, User } from 'lucide-react';
import axios from 'axios';

const AiChat: React.FC = () => {
  const messages = useSelector((state: RootState) => state.interaction.messages);
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    dispatch(addMessage({ role: 'user', content: userMessage }));
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/ai/chat', {
        message: userMessage
      });
      
      const { output, data } = response.data;
      
      if (output) {
        dispatch(addMessage({ role: 'assistant', content: output }));
      } else {
        dispatch(addMessage({ role: 'assistant', content: "Task completed." }));
      }

      if (data) {
        dispatch(updateForm(data));
      }
      
    } catch (error) {
      console.error(error);
      dispatch(addMessage({ role: 'assistant', content: 'Sorry, I encountered an error communicating with the server.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">AI Copilot</h2>
            <p className="text-xs text-indigo-300 font-medium tracking-wide uppercase mt-0.5">Ready to assist</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-3 mb-6 relative z-10 custom-scrollbar">
        {messages.map((msg: Message, idx: number) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`} style={{ animationDelay: `${idx * 0.05}s` }}>
            
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mr-3 shrink-0 mt-1">
                <Sparkles size={14} className="text-indigo-400" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-none border border-indigo-400/30' 
                : 'glass-input text-slate-200 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center ml-3 shrink-0 mt-1">
                <User size={14} className="text-indigo-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mr-3 shrink-0 mt-1">
                <Sparkles size={14} className="text-indigo-400" />
              </div>
            <div className="glass-input rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="relative mt-auto shrink-0 z-10 group/input">
        <input 
          type="text" 
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
          placeholder="Command your Copilot..."
          className="w-full pl-5 pr-14 py-4 glass-input rounded-2xl focus:outline-none transition-all duration-300 placeholder-slate-500"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md group-focus-within/input:bg-indigo-500"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />}
        </button>
      </div>
    </div>
  );
};

export default AiChat;
