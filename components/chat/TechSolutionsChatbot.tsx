"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Send, Trash2, X } from "lucide-react";
import { quickActions, welcomeMessage } from "@/lib/chat/responses";
import { chatService } from "@/lib/chat/service";
import type { ChatMessage, ChatRequest } from "@/lib/chat/types";
import { readChatHistory, saveChatHistory, clearChatHistory } from "@/lib/chat/history";
import { ChatAvatar } from "./ChatAvatar";
import styles from "./TechSolutionsChatbot.module.css";

export function TechSolutionsChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: "welcome", role: "assistant", text: welcomeMessage }]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [historyReady, setHistoryReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const failedRequest = useRef<ChatRequest | null>(null);
  const widget = useRef<HTMLElement>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const saved = readChatHistory(window.localStorage);
        if (saved) setMessages(saved);
      } catch { setStorageNotice("Chat history cannot be saved in this browser."); }
      setHistoryReady(true);
    });
    return () => { mounted = false; };
  }, []);
  useEffect(() => {
    if (!historyReady) return;
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const saved = saveChatHistory(window.localStorage, messages);
        setStorageNotice(previous => saved ? "" : previous || "Chat history cannot be saved in this browser.");
      } catch { setStorageNotice(previous => previous || "Chat history cannot be saved in this browser."); }
    });
    return () => { mounted = false; };
  }, [messages, historyReady]);
  useEffect(() => {
    if (!open) return;
    // Avoid opening the mobile keyboard until the visitor chooses to type.
    if (!window.matchMedia("(min-width: 641px)").matches) return;
    let frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => input.current?.focus({ preventScroll: true })); });
    return () => cancelAnimationFrame(frame);
  }, [open]);
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!open || !viewport) return;
    const element = widget.current;
    const fit = () => {
      element?.style.setProperty("--chat-viewport-height", `${viewport.height}px`);
      element?.style.setProperty("--chat-keyboard-offset", `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`);
      if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
    };
    fit(); viewport.addEventListener("resize", fit); viewport.addEventListener("scroll", fit);
    return () => {
      viewport.removeEventListener("resize", fit); viewport.removeEventListener("scroll", fit);
      element?.style.removeProperty("--chat-viewport-height");
      element?.style.removeProperty("--chat-keyboard-offset");
    };
  }, [open]);
  useEffect(() => {
    if (open && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [open, messages, pending, error]);

  const minimize = () => { setOpen(false); setConfirmClear(false); launcher.current?.focus({ preventScroll: true }); };
  const clear = () => {
    request.current?.abort(); request.current = null; failedRequest.current = null;
    setMessages([{ id: "welcome", role: "assistant", text: welcomeMessage }]);
    setDraft(""); setPending(false); setError(""); setConfirmClear(false);
    try {
      setStorageNotice(clearChatHistory(window.localStorage) ? "" : "Saved history could not be cleared in this browser. Please check browser storage permissions.");
    } catch { setStorageNotice("Saved history could not be cleared in this browser. Please check browser storage permissions."); }
    input.current?.focus({ preventScroll: true });
  };
  const respond = async (payload: ChatRequest) => {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setPending(true); setError(""); failedRequest.current = null;
    try {
      const reply = await chatService.reply(payload, controller.signal);
      if (!controller.signal.aborted) setMessages(previous => [...previous, { ...reply, id: crypto.randomUUID(), role: "assistant" }]);
    } catch {
      if (!controller.signal.aborted) { failedRequest.current = payload; setError("The assistant couldn't respond. Please try again or contact our team."); }
    } finally {
      if (!controller.signal.aborted) setPending(false);
      if (request.current === controller) request.current = null;
    }
  };
  const send = (value: string) => {
    const text = value.trim().slice(0, 1000);
    if (!text || !historyReady || request.current || failedRequest.current) return;
    const message: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    const history = [...messages, message];
    setMessages(history); setDraft("");
    void respond({ message: text, history });
  };

  return <aside ref={widget} className={styles.widget} aria-label="SolyNext service assistant" onKeyDown={event => { if (open && event.key === "Escape") { event.stopPropagation(); minimize(); } }}>
    <section id="solynext-chat" className={`${styles.panel} ${open ? styles.open : ""}`} role="dialog" aria-label="Tech Solutions chat" aria-modal="false" aria-hidden={!open} inert={!open}>
      <header className={styles.header}>
        <ChatAvatar role="assistant" large/>
        <div><h2>SolyNext assistant</h2><p>Technology & digital solutions</p></div>
        <div className={styles.headerActions}><button type="button" className={styles.close} onClick={() => setConfirmClear(value => !value)} aria-label="Clear chat" title="Clear saved chat" disabled={messages.length === 1 || !historyReady} aria-expanded={confirmClear} aria-controls="chat-clear-confirm"><Trash2 size={16}/></button><button type="button" className={styles.close} onClick={minimize} aria-label="Minimize chat"><X size={19}/></button></div>
      </header>
      {confirmClear && <div className={styles.clearConfirm} id="chat-clear-confirm"><p>Clear this chat and its saved history from this browser?</p><div><button type="button" onClick={clear}>Clear history</button><button type="button" onClick={() => setConfirmClear(false)}>Keep chat</button></div></div>}
      <div className={styles.transcript} ref={transcript} role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions text">
        <p className={styles.intro}>LET’S BUILD SOMETHING GREAT</p>
        {messages.map(message => <div className={`${styles.message} ${message.role === "user" ? styles.user : styles.assistant}`} key={message.id}>
          <span className={styles.speaker}><ChatAvatar role={message.role}/>{message.role === "user" ? "You" : "SolyNext"}</span>
          <div className={styles.bubble}><p>{message.text}</p>{message.links && <div className={styles.links}>{message.links.map(link => <Link key={link.href} href={link.href} onClick={minimize}>{link.label}<ArrowUpRight size={13} aria-hidden="true"/></Link>)}</div>}</div>
        </div>)}
        {messages.length === 1 && <div className={styles.quickActions} aria-label="Suggested questions">{quickActions.map(action => <button type="button" key={action} onClick={() => send(action)} disabled={pending || !historyReady}>{action}<ArrowUpRight size={12} aria-hidden="true"/></button>)}</div>}
        {pending && <div className={styles.typing} role="status"><span aria-hidden="true"><i/><i/><i/></span><span>SolyNext is typing…</span></div>}
        {error && <div className={styles.error} role="alert"><p>{error}</p><button type="button" onClick={() => { if (failedRequest.current) void respond(failedRequest.current); }}>Try again</button><Link href="/contact" onClick={minimize}>Contact team</Link></div>}
      </div>
      <form className={styles.composer} onSubmit={event => { event.preventDefault(); send(draft); }}>
        <label className={styles.srOnly} htmlFor="solynext-chat-input">Your message</label>
        <input ref={input} id="solynext-chat-input" value={draft} onChange={event => setDraft(event.target.value)} maxLength={1000} placeholder="What would you like to build?" autoComplete="off"/>
        <button type="submit" aria-label="Send message" disabled={!draft.trim() || pending || Boolean(error) || !historyReady}><Send size={18}/></button>
      </form>
      <p className={styles.footnote}>{storageNotice ? <span role="status">{storageNotice}</span> : <>Saved on this browser · <Link href="/contact" onClick={minimize}>Contact our team</Link></>}</p>
    </section>
    <button ref={launcher} type="button" className={styles.launcher} aria-label={open ? "Minimize SolyNext chat" : "Open SolyNext chat"} aria-expanded={open} aria-controls="solynext-chat" aria-haspopup="dialog" onClick={() => open ? minimize() : setOpen(true)}>{open ? <X size={23}/> : <MessageCircle size={25}/>}</button>
  </aside>;
}
