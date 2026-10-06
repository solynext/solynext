import React from "react";

interface SectionHeaderProps {
  kicker?: string;
  as?: "h1" | "h2";
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  as: Heading = "h2",
  kicker,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`section-header mb-12 sm:mb-16 lg:mb-20 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {kicker && (
        <div
          className={`section-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0057FF]/15 border border-[#0057FF]/40 text-xs font-semibold tracking-wider text-[#00D9FF] uppercase mb-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
          <span>{kicker}</span>
        </div>
      )}
      <Heading
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance leading-[1.15] ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`section-description mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
