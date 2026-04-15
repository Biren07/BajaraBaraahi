import Link from "next/link";

export default function Logo({ className = "text-black" }) {
  return (
    <Link
      href="/"
      className={`flex flex-col items-center leading-none select-none ${className}`}
    >
      {/* Main Logo Text */}
      <span className="font-serif font-bold text-xl md:text-2xl tracking-wider">
        BAJRABARAHI
      </span>

      {/* Divider Line + Dot */}
      <div className="flex items-center gap-1 my-[2px]">
        <span className="w-8 h-[2px] bg-current" />
        <span className="w-1.5 h-1.5 bg-current rounded-full" />
        <span className="w-8 h-[2px] bg-current" />
      </div>

      {/* Subtitle */}
      <span className="text-[9px] md:text-[10px] tracking-[0.25em]">
        BOOK SUPPLIERS
      </span>
    </Link>
  );
}