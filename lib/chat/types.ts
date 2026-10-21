export interface ChatLink { label: string; href: string }
export interface ChatReply { text: string; links?: ChatLink[] }
export interface ChatMessage extends ChatReply { id: string; role: "user" | "assistant" }
export interface ChatRequest { message: string; history: ChatMessage[] }
/** Replace the local adapter with a backend request; keep API keys on the server. */
export interface ChatService { reply: (request: ChatRequest, signal: AbortSignal) => Promise<ChatReply> }
