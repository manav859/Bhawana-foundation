import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-bg-light px-6 py-20">
      <div className="flex flex-col items-center text-center max-w-[600px] gap-6">
        <h1 className="font-display text-[120px] lg:text-[160px] font-black text-primary-blue leading-none opacity-20">
          404
        </h1>
        <h2 className="font-display text-[32px] lg:text-[40px] font-bold text-text-dark -mt-10 lg:-mt-14 z-10">
          Page Not Found
        </h2>
        <p className="font-sans text-[16px] lg:text-[18px] text-text-secondary leading-[1.6]">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="mt-6 flex items-center justify-center gap-2 px-8 py-4 bg-primary-blue text-white font-sans text-[16px] font-bold rounded-full hover:bg-primary-blue/90 shadow-md transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
