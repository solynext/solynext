export interface ChatLink { label: string; href: string }
export interface ChatReply { text: string; links?: ChatLink[] }
export interface ChatMessage extends ChatReply { id: string; role: "user" | "assistant" }
export interface ChatRequest { message: string; history: ChatMessage[]; page?: string }
/** Browser adapter; credentials and website grounding stay on the server. */
export interface ChatService { reply: (request: ChatRequest, signal: AbortSignal) => Promise<ChatReply> }
