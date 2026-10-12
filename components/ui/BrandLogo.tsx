import Image from "next/image";

export function BrandLogo({ size = 40, className }: { size?: number; className?: string }) {
  return <Image src="/solynext-logo.png" alt="" width={size} height={size} className={className} style={{ objectFit: "contain", flexShrink: 0 }} />;
}
