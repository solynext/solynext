import Image from "next/image";
import wordmark from "@/public/solynext-wordmark.png";

export function BrandWordmark() {
  return <Image src={wordmark} alt="SolyNext" className="brand-desktop-wordmark" sizes="170px" />;
}
