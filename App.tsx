import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { BookPage } from './components/BookPage';
import { Overlay } from './components/Overlay';
import { TableOfContents } from './components/TableOfContents';
import { chapters, interactions } from './data';
import { Interaction } from './types';
import { ChevronLeft, ChevronRight, List, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Page wrapper for HTMLFlipBook
// Must forward ref to allow the library to manipulate the DOM
const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren<any>>((props, ref) => {
  return (
    <div className="bg-[#fdfbf7] h-full shadow-inner border-r border-slate-200 overflow-hidden" ref={ref} data-density="hard">
      {props.children}
    </div>
  );
});

const App: React.FC = () => {
  const [activeInteraction, setActiveInteraction] = useState<Interaction | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const bookRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Calculate total pages for UI logic
  // Cover (1) + (Chapters-1 * 2) + End (1)
  const totalPages = 1 + (chapters.length - 1) * 2 + 1;

  const handleNext = () => {
    if (isMobile) {
        if (currentPage < totalPages - 1) {
            setDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    } else {
        bookRef.current?.pageFlip()?.flipNext();
    }
  };

  const handlePrev = () => {
    if (isMobile) {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    } else {
        bookRef.current?.pageFlip()?.flipPrev();
    }
  };

  const handleJumpToChapter = (chapterIndex: number) => {
    // Index 0 = Cover (pg 0)
    // Index 1 = Chapter 1 (pg 1 is left, pg 2 is right) -> starts at pg 1
    // Index 2 = Chapter 2 (pg 3 is left, pg 4 is right) -> starts at pg 3
    let targetPage = 0;
    if (chapterIndex > 0) {
      targetPage = (chapterIndex - 1) * 2 + 1;
    }
    
    if (isMobile) {
        setDirection(targetPage > currentPage ? 1 : -1);
        setCurrentPage(targetPage);
    } else {
        bookRef.current?.pageFlip()?.flip(targetPage);
    }
  };

  const handleInteract = (id: string) => {
    const interaction = interactions[id];
    if (interaction) {
      setActiveInteraction(interaction);
    }
  };

  const onPageFlip = useCallback((e: any) => {
    // Only update state if not mobile, to avoid conflict during resize or if lib fires unexpectedly
    if (!isMobile) {
        setCurrentPage(e.data);
    }
  }, [isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeInteraction || isTocOpen) {
        if (e.key === 'Escape') {
            setActiveInteraction(null);
            setIsTocOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeInteraction, isTocOpen, currentPage, isMobile]); // Added dependencies for accurate state closure

  // Responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      const maxWidth = Math.min(window.innerWidth - 32, 1200);
      const maxHeight = window.innerHeight - 40;
      
      let width, height;

      if (mobile) {
        // Mobile: Single page view (Portrait)
        // Use nearly full width but leave tiny margins for the look
        width = Math.min(window.innerWidth - 10, 600);
        // Calculate height to fit comfortably
        height = Math.min(window.innerHeight - 80, 900); 
      } else {
        // Desktop: dimensions passed to HTMLFlipBook are for a SINGLE PAGE
        width = (maxWidth * 0.8) / 2; 
        height = width * 1.414; // A4 aspect ratio approx
        
        if (height > maxHeight) {
           height = maxHeight;
           width = height / 1.414;
        }
      }

      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to generate the pages array without Fragments
  const allPages = useMemo(() => {
    const pages = [];

    // 1. Cover
    pages.push(
      <Page key="cover" number="0">
         <BookPage chapter={chapters[0]} onInteract={handleInteract} isCover={true} onStart={handleNext} />
      </Page>
    );

    // 2. Chapters
    chapters.slice(1).forEach((chapter) => {
       // Left Page (Title/Art)
       pages.push(
         <Page key={`${chapter.id}-left`} number={`${chapter.id}-left`}>
            <div className="h-full flex flex-col items-center justify-center bg-[#f4f1ea] text-center p-8 border-r border-slate-300/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 pointer-events-none"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 to-slate-300"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 to-slate-300"></div>

                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-emerald-400 shadow-xl ring-4 ring-emerald-500/10">
                    <span className="font-serif text-4xl font-bold">{chapter.id}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 px-4 leading-tight">{chapter.title}</h2>
                <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-8"></div>
                
                <div className="bg-white/50 p-4 rounded-lg border border-slate-200 max-w-[240px]">
                    <p className="text-slate-600 italic text-sm font-serif">
                        "Look for the clues on the facing page. The code reveals the truth."
                    </p>
                </div>
            </div>
         </Page>
       );

       // Right Page (Content)
       pages.push(
         <Page key={`${chapter.id}-right`} number={`${chapter.id}-right`}>
             <BookPage chapter={chapter} onInteract={handleInteract} />
         </Page>
       );
    });

    // 3. Back Cover
    pages.push(
      <Page key="end" number="end">
        <div className="h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-8 text-center relative overflow-hidden border-l border-slate-700">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 opacity-50"></div>
              <div className="z-10 flex flex-col items-center">
                  <div className="w-16 h-16 border-2 border-emerald-500/30 rounded-full flex items-center justify-center mb-6">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-serif text-emerald-500 mb-2">System Halted.</h3>
                  <p className="text-sm text-slate-500 mb-8">Refactoring Complete.</p>
                  
                  <button 
                    onClick={() => handleJumpToChapter(0)}
                    className="px-8 py-3 border border-slate-600 rounded-full hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    Reboot System
                  </button>
              </div>
              <div className="absolute bottom-8 text-[10px] text-slate-700 font-mono">
                  Runtime: 0.004s // Memory: 2MB
              </div>
        </div>
      </Page>
    );

    return pages;
  }, [handleInteract]); // handleNext is stable enough

  // Mobile Transition Variants
  const mobilePageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 20 : -20,
      zIndex: 10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-30%' : '30%', // Parallax effect
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }),
  };

  return (
    <main className="min-h-screen bg-slate-200 flex flex-col items-center justify-center font-sans overflow-hidden" aria-label="Interactive Storybook">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-300 to-slate-400 opacity-50" aria-hidden="true"></div>

      {/* Top Bar Controls */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
         <button 
           onClick={() => setIsTocOpen(true)}
           className="bg-white/90 backdrop-blur text-slate-800 p-3 rounded-full shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 border border-slate-200 group"
           title="Table of Contents"
         >
           <List size={20} className="group-hover:text-emerald-600 transition-colors" />
         </button>
         {currentPage > 0 && (
             <button 
                onClick={() => handleJumpToChapter(0)}
                className="bg-white/90 backdrop-blur text-slate-800 p-3 rounded-full shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 border border-slate-200 group"
                title="Restart Book"
             >
                <RotateCcw size={20} className="group-hover:text-emerald-600 transition-colors" />
             </button>
         )}
      </div>

      {/* Book Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-0 md:p-8 overflow-hidden">
        
        {/* Desktop Navigation Left */}
        <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 bg-white text-slate-800 p-4 rounded-full shadow-xl z-20 transition-all hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none border border-slate-100`}
        >
            <ChevronLeft size={24} />
        </button>

        {/* The Book */}
        {isMobile ? (
             /* Mobile Custom View */
             <div 
                className="relative w-full h-full max-w-[600px] flex items-center justify-center perspective-[1200px]"
                style={{ height: dimensions.height, width: dimensions.width }}
             >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={mobilePageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full shadow-2xl rounded-sm bg-[#fdfbf7] overflow-hidden origin-left"
                    >
                         {/* We must clone the element to ensure it receives props if needed, though mostly standard render */}
                         {allPages[currentPage]}
                    </motion.div>
                </AnimatePresence>
             </div>
        ) : (
            /* Desktop FlipBook */
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="shadow-2xl rounded-sm bg-slate-800"
            >
                {/* @ts-ignore */}
                <HTMLFlipBook
                    width={dimensions.width}
                    height={dimensions.height}
                    size="fixed"
                    minWidth={300}
                    maxWidth={800}
                    minHeight={400}
                    maxHeight={1000}
                    maxShadowOpacity={0.4}
                    showCover={true}
                    mobileScrollSupport={false} // Disabled built-in mobile scroll as we use custom
                    onFlip={onPageFlip}
                    ref={bookRef}
                    className="bg-slate-800"
                    startPage={currentPage}
                    drawShadow={true}
                    flippingTime={800}
                    usePortrait={false} // Force standard view for this block, logic handled by rendering conditional
                    startZIndex={1}
                    autoSize={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                >
                {allPages}
                </HTMLFlipBook>
            </motion.div>
        )}

        {/* Desktop Navigation Right */}
        <button 
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1} 
            className={`hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 bg-white text-slate-800 p-4 rounded-full shadow-xl z-20 transition-all hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none border border-slate-100`}
        >
            <ChevronRight size={24} />
        </button>

        {/* Mobile Persistent Swipe Indicators (Visible Controls) */}
        {isMobile && !activeInteraction && (
          <>
            {/* Left Zone (Prev) */}
            <AnimatePresence>
              {currentPage > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handlePrev}
                  className="md:hidden absolute left-0 top-0 bottom-0 w-16 z-30 flex items-center justify-start pl-1 bg-gradient-to-r from-black/50 via-black/20 to-transparent group outline-none touch-manipulation"
                  aria-label="Previous Page"
                >
                   <motion.div 
                     whileTap={{ scale: 0.9, x: -5 }}
                     className="bg-white text-slate-900 p-3 rounded-r-xl shadow-lg border-y border-r border-slate-200 flex items-center justify-center opacity-90"
                   >
                      <ChevronLeft className="drop-shadow-sm stroke-[3px]" size={24} />
                   </motion.div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Right Zone (Next) */}
            <AnimatePresence>
              {currentPage < totalPages - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleNext}
                  className="md:hidden absolute right-0 top-0 bottom-0 w-16 z-30 flex items-center justify-end pr-1 bg-gradient-to-l from-black/50 via-black/20 to-transparent group outline-none touch-manipulation"
                  aria-label="Next Page"
                >
                   <motion.div 
                     whileTap={{ scale: 0.9, x: 5 }}
                     className="bg-emerald-500 text-white p-3 rounded-l-xl shadow-lg border-y border-l border-emerald-400 flex items-center justify-center opacity-95"
                   >
                      <ChevronRight className="drop-shadow-sm stroke-[3px]" size={24} />
                   </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </>
        )}

      </div>

      {/* Overlays */}
      {activeInteraction && (
        <Overlay 
          interaction={activeInteraction} 
          onClose={() => setActiveInteraction(null)} 
        />
      )}
      
      <AnimatePresence>
        {isTocOpen && (
            <TableOfContents 
                isOpen={isTocOpen} 
                onClose={() => setIsTocOpen(false)} 
                currentIndex={chapters.findIndex(c => c.id === (currentPage === 0 ? 0 : Math.ceil(currentPage / 2)))}
                onSelectChapter={handleJumpToChapter}
            />
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;