import Image from "next/image";
import logo from "@/public/solynext-logo.png";

export function BrandLogo({ size = 40, className }: { size?: number; className?: string }) {
  return <Image src={logo} alt="" width={size} height={size} className={className} style={{ objectFit: "contain", flexShrink: 0 }} />;
}
