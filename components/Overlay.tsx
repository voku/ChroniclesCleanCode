import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { Interaction } from '../types';
import { CodeBlock } from './CodeBlock';

interface OverlayProps {
  interaction: Interaction | null;
  onClose: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ interaction, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: focus the close button when overlay opens
  useEffect(() => {
    if (interaction && closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [interaction]);

  if (!interaction) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        aria-describedby="overlay-desc"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <h2 id="overlay-title" className="text-xl font-serif font-bold tracking-wide">{interaction.title}</h2>
            </div>
            <button 
              ref={closeButtonRef}
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close details"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            <p id="overlay-desc" className="text-slate-600 text-lg leading-relaxed">
              {interaction.description}
            </p>

            <div className="space-y-6">
              <CodeBlock 
                title={interaction.badExample.title} 
                code={interaction.badExample.code} 
                type="bad" 
              />

              <div className="relative flex items-center py-2" role="separator">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm uppercase font-semibold">VS</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {interaction.betterExample.map((example, idx) => (
                <CodeBlock 
                  key={idx}
                  title={example.title} 
                  code={example.code} 
                  type="good" 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
