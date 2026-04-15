import React from 'react';

const ReflectionCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bla p-6">
      {/* Main Card Container */}
      <div className="relative w-full  bg-gray-100 border border-gray-100 shadow-sm p-12 md:p-20 overflow-hidden">
        
        {/* Top Header Section */}
        <div className="flex items-start gap-4 mb-10">
          <div className="flex items-center justify-center w-20 h-14 border border-red-100 rounded-full">
            <span className="text-red-800 text-5xl">ℛ</span>
          </div>
          <div>
            <h4 className="text-black text-xl tracking-[0.2em] font-semibold uppercase">
              Institutional Reflection
            </h4>
            <p className="text-red-800 text-xs tracking-wider font-mono mt-1">
              ARCHIVE CODE: QOTD-2025-AX
            </p>
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative">
          {/* Decorative Quote Mark */}
          <span className="absolute -top-10 -left-10 text-gray-100 text-8xl font-serif select-none">
            &ldquo;
          </span>
          
          <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif italic text-gray-800 leading-tight">
            "Knowledge is the snow upon the peak; it is visible to all, yet felt only by the one who climbs."
          </h1>
        </div>

        {/* Footer Section */}
        <div className="mt-16 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-red-800"></div>
            <p className="text-red-800 text-xs font-bold tracking-[0.15em] uppercase">
              The Manuscript of Shifting Mists
            </p>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden md:block w-[1px] h-10 bg-gray-200 mx-4"></div>

          <div className="max-w-md">
            <p className="text-black text-[10px] md:text-xs leading-relaxed tracking-widest uppercase italic">
              True understanding is not acquired through observation alone, but 
              through the exertion of the soul.
            </p>
          </div>
        </div>

        {/* Subtle Background Accent */}
        <div className="absolute top-10 right-10 opacity-20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-300">
             <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReflectionCard;