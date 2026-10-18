"use client";

import { useEffect, useRef } from "react";

interface Player {
  mute(): void;
  playVideo(): void;
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
    void loadAPI().then(api => {
      if (disposed || !container.current) return;
      const mount = document.createElement("div");
      container.current.appendChild(mount);
      player = new api.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId: "9HaU8NjH7bI",
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: "9HaU8NjH7bI",
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
            // Reapply half speed when the playlist loops.
            if (data === 1) target.setPlaybackRate(0.5);
          },
        },
      });
    });
    return () => { disposed = true; player?.destroy(); };
  }, []);
  return <div ref={container} className="hero-video-background" aria-hidden="true" />;
}
