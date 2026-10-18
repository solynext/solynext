"use client";

import { useEffect, useRef } from "react";

interface Player {
  mute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setPlaybackRate(rate: number): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
}
interface PlayerEvent { target: Player; data: number }
interface YouTubeAPI {
  Player: new (element: HTMLElement, options: {
    host: string;
    videoId: string;
    playerVars: Record<string, string | number>;
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent): void;
    };
  }) => Player;
}
type VideoWindow = Window & { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void };
let apiPromise: Promise<YouTubeAPI> | undefined;

function loadAPI() {
  const videoWindow = window as VideoWindow;
  if (videoWindow.YT?.Player) return Promise.resolve(videoWindow.YT);
  apiPromise ??= new Promise<YouTubeAPI>(resolve => {
    const previous = videoWindow.onYouTubeIframeAPIReady;
    videoWindow.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (videoWindow.YT) resolve(videoWindow.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function HeroVideo() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let player: Player | undefined;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const background = container.current;
    void loadAPI().then(api => {
      if (disposed || !container.current) return;
      const mount = document.createElement("div");
      container.current.appendChild(mount);
      player = new api.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId: "9HaU8NjH7bI",
        playerVars: {
          autoplay: 1, mute: 1,
          controls: 0, playsinline: 1, disablekb: 1, fs: 0, rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: ({ target }) => {
            const iframe = target.getIframe();
            iframe.tabIndex = -1;
            iframe.title = "Technology background video";
            target.mute();
            target.setPlaybackRate(0.5);
            target.playVideo();
          },
          onStateChange: ({ target, data }) => {
            clearTimeout(revealTimer);
            if (background) delete background.dataset.playing;
            if (data === 1) {
              target.setPlaybackRate(0.5);
              // Wait for YouTube's temporary loading overlay to disappear.
              revealTimer = setTimeout(() => {
                if (!disposed && background) background.dataset.playing = "true";
              }, 1200);
            } else if (data === 0) {
              // Loop a single video without playlist navigation controls.
              target.seekTo(0, true);
              target.setPlaybackRate(0.5);
              target.playVideo();
            }
          },
        },
      });
    });
    return () => {
      disposed = true;
      clearTimeout(revealTimer);
      if (background) delete background.dataset.playing;
      player?.destroy();
    };
  }, []);
  return <div ref={container} className="hero-video-background" aria-hidden="true" />;
}
