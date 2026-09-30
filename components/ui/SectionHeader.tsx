import React from "react";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 sm:mb-16 lg:mb-20 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {kicker && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0057FF]/10 border border-[#0057FF]/30 text-xs font-semibold tracking-wider text-[#0057FF] uppercase mb-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
          <span>{kicker}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#050505] text-balance leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#374151] leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
