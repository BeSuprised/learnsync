import React from 'react';
import { Brain, BookOpen, Users } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8" />
          <span className="text-xl font-bold">LearnSync</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-indigo-200 transition">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-200 transition">How it Works</a>
          <a href="#demo" className="hover:text-indigo-200 transition">Try Demo</a>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition">
          Get Started
        </button>
      </nav>
      
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Learning Evolved with
          <TypeAnimation
            sequence={[
              ' AI',
              2000,
              ' Personalization',
              2000,
              ' Intelligence',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300"
          />
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience education that adapts to your unique learning style, powered by advanced AI
          that understands and grows with you.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Start Learning
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Join Community
          </button>
        </div>
      </div>
    </header>
  );
};