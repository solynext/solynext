/** A quiet two-note chime, synthesized locally with no audio downloads. */
export function createNotificationSound() {
  let context: AudioContext | null = null;
  let disposed = false;
  let lastPlayed = -Infinity;
  function unlock() {
    if (disposed) return;
    try {
      context ??= new AudioContext();
      if (context.state === "suspended") void context.resume().catch(() => {});
    } catch { /* Notifications remain usable when audio is unavailable. */ }
  }
  function play() {
    if (disposed || !context || context.state !== "running" || context.currentTime - lastPlayed < 1) return;
    lastPlayed = context.currentTime;
    try {
      for (const [frequency, delay, volume] of [[783.99, 0, 0.045], [1174.66, 0.12, 0.035]]) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + delay;
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.48);
        gain.gain.linearRampToValueAtTime(0, start + 0.55);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.56);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      }
    } catch { /* An audio failure must not interrupt the notification feed. */ }
  }
  function dispose() {
    disposed = true;
    if (context && context.state !== "closed") void context.close().catch(() => {});
    context = null;
  }
  return { unlock, play, dispose };
}
