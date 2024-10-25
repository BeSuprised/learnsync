import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Brain, ArrowRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Message {
  type: 'user' | 'ai';
  content: string;
  options?: string[];
}

interface LearningState {
  topic: string;
  level: string;
  style: string;
  step: number;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'ai',
    content: "👋 Hi! I'm your AI learning companion. I can help create a personalized learning experience just for you. What topic would you like to explore?",
    options: ['Mathematics', 'Programming', 'Science', 'Language Learning', 'Other']
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [learningState, setLearningState] = useState<LearningState | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): Message => {
    if (!learningState) {
      setLearningState({ topic: userInput, level: '', style: '', step: 0 });
      return {
        type: 'ai',
        content: `Great choice! Let's personalize your ${userInput} learning journey. What's your current level?`,
        options: ['Beginner', 'Intermediate', 'Advanced']
      };
    }

    if (!learningState.level) {
      const level = userInput.toLowerCase();
      setLearningState({ ...learningState, level, step: 1 });
      return {
        type: 'ai',
        content: "Perfect! To make your learning experience more effective, what's your preferred learning style?",
        options: ['Visual (diagrams & videos)', 'Reading & Writing', 'Interactive Practice', 'Discussion Based']
      };
    }

    if (!learningState.style) {
      const style = userInput.toLowerCase();
      setLearningState({ ...learningState, style, step: 2 });
      return generateLearningPlan(learningState.topic, learningState.level, style);
    }

    return generateTopicResponse(learningState.topic, userInput, learningState.level);
  };

  const generateLearningPlan = (topic: string, level: string, style: string): Message => {
    const plans: Record<string, Message> = {
      programming: {
        type: 'ai',
        content: `📚 Here's your personalized ${level} programming learning path:

### Next Steps
1. **Core Concepts Review**
   - Data structures
   - Algorithms
   - Problem-solving patterns

2. **Hands-on Project**
   Let's build something real! Choose your project:`,
        options: ['Build a Web App', 'Create an API', 'Develop a Game', 'Data Analysis Tool']
      },
      mathematics: {
        type: 'ai',
        content: `🔢 Your customized ${level} mathematics pathway:

### Current Focus
1. **Concept Mastery**
   - Key theorems
   - Problem patterns
   - Real-world applications

2. **Practice Area**
Choose what you'd like to focus on:`,
        options: ['Problem Solving', 'Theory Deep Dive', 'Applied Mathematics', 'Interactive Exercises']
      }
    };

    return plans[topic.toLowerCase()] || {
      type: 'ai',
      content: `🎯 Your personalized learning path for ${topic}:

### Getting Started
1. **Foundation Building**
   - Core principles
   - Key concepts
   - Practical applications

2. **Next Steps**
Choose your learning direction:`,
      options: ['Theoretical Overview', 'Practical Examples', 'Interactive Exercises', 'Real-world Projects']
    };
  };

  const generateTopicResponse = (topic: string, query: string, level: string): Message => {
    if (query.toLowerCase().includes('project')) {
      return {
        type: 'ai',
        content: `🚀 Here's a ${level} project idea for ${topic}:

### Project Overview
1. **Goal**: Build a real-world application
2. **Skills**: Problem-solving, design, implementation
3. **Timeline**: 2-3 weeks

Would you like to:`,
        options: ['See Project Details', 'Start Project', 'Explore Prerequisites', 'Try Something Else']
      };
    }

    if (query.toLowerCase().includes('exercise')) {
      return {
        type: 'ai',
        content: `💪 Let's practice ${topic}!

### Exercise
Here's a ${level} challenge for you to solve:
\`\`\`
${generateExercise(topic, level)}
\`\`\`

How would you like to proceed?`,
        options: ['See Solution', 'Get Hint', 'Try Different Exercise', 'Learn Related Concept']
      };
    }

    return {
      type: 'ai',
      content: `Let's explore ${topic} together!

### Available Resources
1. 📚 Interactive Lessons
2. 🎯 Practice Exercises
3. 🚀 Real Projects
4. 📊 Progress Tracking

What interests you most?`,
      options: ['Start Lesson', 'Try Exercise', 'Begin Project', 'View Progress']
    };
  };

  const generateExercise = (topic: string, level: string): string => {
    const exercises: Record<string, Record<string, string>> = {
      programming: {
        beginner: 'Create a function that reverses a string without using built-in reverse()',
        intermediate: 'Implement a cache decorator with timeout functionality',
        advanced: 'Design a thread-safe queue implementation with blocking operations'
      },
      mathematics: {
        beginner: 'Solve: 2x + 5 = 13',
        intermediate: 'Find the derivative of f(x) = x³ + 2x² - 4x + 1',
        advanced: 'Prove the uniqueness of prime factorization'
      }
    };

    return exercises[topic.toLowerCase()]?.[level.toLowerCase()] || 
           'Custom exercise based on your level and topic';
  };

  const processUserInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: userInput }]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = generateResponse(userInput);
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processUserInput(input);
  };

  const handleOptionClick = (option: string) => {
    processUserInput(option);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">AI Learning Assistant</h3>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="h-[500px] overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${
                  message.type === 'user' ? 'bg-indigo-100' : 'bg-purple-100'
                }`}>
                  {message.type === 'user' ? 
                    <User className="w-5 h-5 text-indigo-600" /> : 
                    <Bot className="w-5 h-5 text-purple-600" />
                  }
                </div>
                <div className={`flex flex-col space-y-2 ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`p-4 rounded-xl ${
                    message.type === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <ReactMarkdown 
                      className="prose prose-sm max-w-none"
                      components={{
                        code: ({node, ...props}) => (
                          <code className="bg-gray-800 text-gray-200 rounded px-1 py-0.5" {...props} />
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  
                  {message.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center space-x-1"
                        >
                          <span>{option}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-500"
            >
              <Bot className="w-5 h-5" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center"
          disabled={isTyping}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};