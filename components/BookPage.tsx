import React from 'react';
import { motion } from 'framer-motion';
import { Chapter, StorySegment } from '../types';
import { Sparkles, Shield, Play, Code, Eye, Terminal } from 'lucide-react';
import { highlightPHP } from './CodeBlock';

interface BookPageProps {
  chapter: Chapter;
  onInteract: (interactionId: string) => void;
  isCover?: boolean;
  onStart?: () => void;
}

export const BookPage: React.FC<BookPageProps> = ({ chapter, onInteract, isCover, onStart }) => {
  // Enhanced renderer that respects code lines and styles comments
  const renderTextSegment = (text: string) => {
    return text.split('\n').map((line, i) => {
      // If empty line, render a break
      if (!line.trim()) {
        return <div key={i} className="h-6" aria-hidden="true"></div>;
      }
      
      // If comment (Narrator voice)
      if (line.trim().startsWith('//')) {
        return (
          <div key={i} className="text-slate-500 font-serif italic mb-2 ml-1 text-lg leading-relaxed">
            {line}
          </div>
        );
      }
      
      // Standard code line
      return (
        <div key={i} className="font-mono text-slate-800 font-medium mb-1 pl-4 border-l-4 border-slate-200 whitespace-pre-wrap leading-8 text-base hover:border-emerald-300 transition-colors">
           {highlightPHP(line)}
        </div>
      );
    });
  };

  if (isCover) {
    return (
      <article 
        className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 border-4 border-slate-800 rounded-r-md shadow-inner relative overflow-hidden" 
        aria-label="Book Cover"
      >
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #34d399 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Hero Logo / Badge */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8 relative z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-30 animate-pulse rounded-full"></div>
            <div className="w-56 h-56 rounded-full bg-slate-950 border-4 border-emerald-500 shadow-2xl relative group overflow-hidden flex items-center justify-center ring-4 ring-emerald-900/50">
              {/* Syntax Sentinel Avatar Image */}
              <img 
                src="https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400" 
                alt="Syntax Sentinel Avatar" 
                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
              
              {/* HUD Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <Shield className="w-24 h-24 text-white/20 absolute" />
                 <Code className="w-12 h-12 text-emerald-400/80 animate-pulse relative z-10" />
              </div>
            </div>
            
            {/* Orbital Rings */}
            <div className="absolute -inset-4 border border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-8 border border-dashed border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>
        </motion.div>

        {/* Title Section */}
        <div className="relative z-10 space-y-4 max-w-md">
           <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
           >
             <h1 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tight mb-2 text-shadow-lg">
               The Chronicles of <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                 Clean Code
               </span>
             </h1>
             <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-4"></div>
           </motion.div>

           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="text-slate-400 text-lg font-light italic"
           >
             "Because readable code is the ultimate superpower."
           </motion.p>
        </div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onStart && onStart();
          }}
          className="mt-12 group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg tracking-wide shadow-lg shadow-emerald-900/50 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative">Start the Journey</span>
          <Play className="w-5 h-5 fill-current relative" />
        </motion.button>
        
        <div className="absolute bottom-4 text-slate-600 text-xs font-mono">
           v1.0.0 &bull; Build: Stable
        </div>
      </article>
    );
  }

  // Standard Page Render
  return (
    <div className="h-full p-6 md:p-10 flex flex-col relative">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between border-b-2 border-slate-100 pb-4">
        <div>
           <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1 block">
             Chapter {chapter.id}
           </span>
           <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
             {chapter.title}
           </h2>
        </div>
        <div className="hidden sm:block text-slate-300">
           <Terminal size={24} />
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 space-y-6">
        {chapter.content.map((segment, index) => {
          if (segment.type === 'interaction') {
            return (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="my-6"
               >
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     if (segment.interactionId) onInteract(segment.interactionId);
                   }}
                   className="w-full group relative overflow-hidden bg-slate-900 rounded-xl p-1 shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 text-left"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 group-hover:border-emerald-500/50 transition-colors relative z-10">
                        <div className="flex justify-between items-start mb-3">
                           <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                              <Code size={14} />
                              <span>Interactive Snippet</span>
                           </div>
                           <Eye size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        
                        <div className="font-mono text-sm text-slate-300 mb-4 bg-black/30 p-3 rounded border-l-2 border-red-400">
                           {segment.content}
                        </div>

                        <div className="flex items-center text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                           <span className="border-b-2 border-emerald-500 pb-0.5">Refactor This Code</span>
                           <Play size={14} className="ml-2 fill-emerald-500 text-emerald-500" />
                        </div>
                    </div>
                 </button>
               </motion.div>
            );
          }
          
          return (
            <div key={index} className="prose prose-slate max-w-none">
              {renderTextSegment(segment.content)}
            </div>
          );
        })}
      </div>

      {/* Footer / Page Number */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-slate-400 text-xs font-mono">
         <span>Syntax Sentinel</span>
         <span>{chapter.id > 0 ? `Page ${chapter.id * 2}` : ''}</span>
      </div>
    </div>
  );
};