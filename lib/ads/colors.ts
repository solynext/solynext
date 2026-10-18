function luminance(hex: string) {
  const channels = [1, 3, 5].map(offset => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

export function contrastRatio(first: string, second: string) {
  const a = luminance(first), b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Keep the chosen text color when readable; otherwise use black or white. */
export function readableAdColors(background: string, foreground: string) {
  const valid = (color: string) => /^#[0-9a-f]{6}$/i.test(color);
  const surface = valid(background) ? background : "#132b24";
  const text = valid(foreground) && contrastRatio(surface, foreground) >= 4.5
    ? foreground
    : contrastRatio(surface, "#ffffff") >= contrastRatio(surface, "#000000") ? "#ffffff" : "#000000";
  return { background: surface, foreground: text };
}
