import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface CodeBlockProps {
  title: string;
  code: string;
  type: 'bad' | 'good';
}

export const highlightPHP = (code: string) => {
  // Tokenize code into actionable parts for syntax highlighting
  // Captures: comments, strings, keywords, variables, operators, punctuation
  const regex = /(\/\/.*$|\/\*[\s\S]*?\*\/|'(?:\\'|[^'])*'|"(?:\\"|[^"])*"|\b(?:if|else|elseif|endif|foreach|endforeach|while|endwhile|for|endfor|as|continue|break|return|class|extends|implements|public|private|protected|function|new|throw|try|catch|finally|bool|float|int|string|array|void|true|false|null|const|static|self|parent)\b|\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*|->|::|[(){}\[\];,])/gm;
  
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(code)) !== null) {
    // Add text before the match (whitespace, symbols not matched)
    if (match.index > lastIndex) {
      parts.push(<span key={`txt-${lastIndex}`}>{code.slice(lastIndex, match.index)}</span>);
    }
    
    const token = match[0];
    const index = match.index;
    
    let className = "text-slate-600"; // default for operators/punctuation
    
    if (token.startsWith('//') || token.startsWith('/*')) {
      className = "text-slate-400 italic";
    } else if (token.startsWith("'") || token.startsWith('"')) {
      className = "text-amber-600";
    } else if (token.startsWith('$')) {
      className = "text-blue-600";
    } else if (['true', 'false', 'null'].includes(token)) {
      className = "text-orange-600 font-semibold";
    } else if (['if', 'else', 'elseif', 'foreach', 'as', 'continue', 'return', 'class', 'extends', 'implements', 'public', 'private', 'protected', 'function', 'new', 'throw', 'try', 'catch'].includes(token)) {
      className = "text-purple-600 font-bold";
    } else if (['bool', 'float', 'int', 'string', 'array', 'void'].includes(token)) {
      className = "text-teal-600 font-semibold";
    } else if (token === '->' || token === '::') {
      className = "text-pink-500 font-bold";
    } else if (/[(){}\[\];,]/.test(token)) {
      className = "text-slate-500";
    }
    
    parts.push(<span key={`tok-${index}`} className={className}>{token}</span>);
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < code.length) {
    parts.push(<span key={`txt-${lastIndex}`}>{code.slice(lastIndex)}</span>);
  }
  
  return parts;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, type }) => {
  const [highlightedContent, setHighlightedContent] = useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(true);

  const borderColor = type === 'bad' ? 'border-red-400' : 'border-emerald-500';
  const bgColor = type === 'bad' ? 'bg-red-50' : 'bg-emerald-50';
  const badgeColor = type === 'bad' ? 'bg-red-200 text-red-800' : 'bg-emerald-200 text-emerald-800';
  
  useEffect(() => {
    setIsLoading(true);
    // Simulate syntax processing time
    const timer = setTimeout(() => {
        setHighlightedContent(highlightPHP(code));
        setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className={`rounded-lg border-l-4 ${borderColor} ${bgColor} p-4 mb-6 shadow-sm text-left`}>
      <div className="flex items-center justify-between mb-3">
        <span 
          className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${badgeColor}`}
          id={`code-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {title}
        </span>
      </div>
      <div 
        className="bg-white/80 p-5 rounded border border-black/5 shadow-inner overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[8rem] relative"
        tabIndex={0}
        role="region"
        aria-labelledby={`code-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px]">
                 <Loader2 className={`w-8 h-8 animate-spin mb-2 ${type === 'bad' ? 'text-red-400' : 'text-emerald-500'}`} />
                 <span className="text-xs text-slate-400 font-mono tracking-wide animate-pulse">Running Syntax Analysis...</span>
             </div>
        ) : (
            <pre className="font-mono text-sm whitespace-pre-wrap text-slate-800 leading-7 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}} />
                <code>
                {highlightedContent}
                </code>
            </pre>
        )}
      </div>
    </div>
  );
};
