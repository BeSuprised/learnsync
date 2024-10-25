import React from 'react';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { AIChat } from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Features />
      
      <section id="demo" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Experience AI-Powered Learning
          </h2>
          <AIChat />
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LearnSync</h3>
              <p className="text-gray-400">
                Bridging the gap between teaching at scale and individual needs through AI.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
                <li><a href="#demo" className="hover:text-white transition">Try Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-gray-400">
                Join our community of learners and educators.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;