import React from 'react';
import { motion } from 'framer-motion';
import { X, Book } from 'lucide-react';
import { chapters } from '../data';

interface TOCProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (index: number) => void;
  currentIndex: number;
}

export const TableOfContents: React.FC<TOCProps> = ({ isOpen, onClose, onSelectChapter, currentIndex }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#f4f1ea] w-full max-w-md rounded-lg shadow-2xl border-4 border-slate-800 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
         {/* Decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-800 via-emerald-600 to-slate-800"></div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <Book className="text-emerald-600" />
              Index
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {chapters.map((chapter, idx) => (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(idx);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded flex items-center justify-between group transition-all ${
                  // Logic handles the offset because Cover is usually index 0 in the flipbook array logic, 
                  // but visually our chapters array aligns differently. 
                  // We'll pass the exact array index.
                  currentIndex === idx 
                    ? 'bg-emerald-100 text-emerald-900 border-l-4 border-emerald-500 font-bold' 
                    : 'hover:bg-white text-slate-700 hover:pl-4 border-l-4 border-transparent'
                }`}
              >
                <span className="font-serif text-sm">
                  {idx === 0 ? 'Cover' : chapter.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {idx === 0 ? '' : `Pg ${idx}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};