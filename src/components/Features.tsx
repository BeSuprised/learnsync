import React from 'react';
import { Brain, Target, Users, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Adaptive learning paths that evolve with your progress and understanding'
  },
  {
    icon: Target,
    title: 'Personalized Goals',
    description: 'Set and track custom learning objectives tailored to your needs'
  },
  {
    icon: Users,
    title: 'Peer Learning',
    description: 'Connect with learners sharing similar interests and goals'
  },
  {
    icon: Sparkles,
    title: 'Interactive Content',
    description: 'Engage with dynamic, multimedia learning materials'
  },
  {
    icon: BookOpen,
    title: 'Diverse Resources',
    description: 'Access a wide range of learning styles and materials'
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Monitor your achievements and learning journey'
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Revolutionizing Education
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};