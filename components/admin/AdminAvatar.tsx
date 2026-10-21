"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./AdminAvatar.module.css";

export function AdminAvatar({ image, initials, className, alt = "" }: { image: string | null; initials: string; className?: string; alt?: string }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  return <span className={`${styles.avatar} ${className ?? ""}`}>
    {image && failedImage !== image ? <Image src={image} alt={alt} width={80} height={80} unoptimized className={styles.photo} onError={() => setFailedImage(image)}/> : initials}
  </span>;
}
