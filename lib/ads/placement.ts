export const AD_REAPPEAR_DELAY = 5000;

/** Skip two distinct sections; card and banner slots in one section count once. */
export function nextAdSection<T>(sections: T[], current: number): number {
  const seen = new Set<T>([sections[current]]);
  let remaining = 3;
  for (let index = current + 1; index < sections.length; index++) {
    if (seen.has(sections[index])) continue;
    seen.add(sections[index]);
    if (--remaining === 0) return index;
  }
  return -1;
}
