# SolyNext assistant

This upgrades the existing chat service behind the same `ChatService.reply(request, signal)` contract. The widget's markup, CSS, branding, animations, suggestions, send/retry/clear/minimize controls and local history interface are unchanged. No model training or fine-tuning has been performed.

## Modes and configuration

The previous implementation was a browser-only rule-based service. There was no active AI provider or configured key when this upgrade was made. The old response engine and its service-specific follow-up handling remain available as a fallback.

The optional server integration uses the Gemini REST API. Configuration belongs in `.env.local` for development or server environment variables for hosting:

```dotenv
CHAT_PROVIDER=auto
GEMINI_API_KEY=api
GEMINI_MODEL=gemini-3.1-flash-lite
```

Replace `api` with a real Google AI Studio key and restart the development server or redeploy. `auto` uses Gemini only when a real key is present. Set `CHAT_PROVIDER=local` to disable external AI processing. Existing environment values are preserved. Never use a `NEXT_PUBLIC_` variable for credentials. The real key file is excluded from Git; `.env.example` contains placeholders only.

Without a key, the assistant can answer a limited set of curated technology/general questions, simple arithmetic and greetings, and preserves SolyNext service guidance. It explains its limitation for unsupported open-ended questions. General-purpose reasoning, writing, recommendations and arbitrary multilingual conversation require the configured model. Offline answers are not a replacement for an LLM.

## Architecture

1. `lib/chat/service.ts` keeps the existing browser interface and cancellation behavior. It sends only recent bounded turns and the current page to `/api/chat`. A transport failure falls back locally.
2. `lib/chat/intelligence.ts` classifies service, quotation, troubleshooting, explanation, writing, general and conversational requests and detects English, Urdu and Roman Urdu. Classification is a hint to the model, not a restriction on what it can answer.
3. `data/chat/knowledge.ts` contains editable public company facts, contact information, quotation rules and requirement prompts. Add only reviewed public facts; keep credentials and private records out.
4. `lib/chat/knowledge.ts` derives service facts, timelines, technologies, FAQs and articles from the same data as the website. It retrieves up to six relevant chunks using weighted title/keyword/body matches and inverse document frequency. Query aliases cover common Urdu/Roman Urdu service terms. This is small-site lexical RAG, not embedding search or model training.
5. Relevant published portfolio summaries are read at request time, using the existing public portfolio repository. Drafts, private IDs, arbitrary file paths and admin records are not indexed. A portfolio read error does not disable general chat.
6. `lib/chat/prompt.ts` defines the consultant/general assistant behavior, language handling, uncertainty, quotations, source boundaries, high-stakes limits and prompt-injection defenses.
7. `lib/chat/provider.ts` calls Gemini with a JSON response schema. The model gets no secrets, tools or admin access. Link buttons use approved website/documentation URLs and canonical labels. Code stays plain text, compatible with the current message rendering.
8. `lib/chat/offline.ts` preserves the previous service-response engine and adds a few safe curated general answers. Arithmetic is parsed with a bounded grammar; it never evaluates code.

## Knowledge maintenance

- Edit company/contact/quotation guidance in `data/chat/knowledge.ts`.
- Edit actual offerings, FAQs, technologies and articles in `data/mockData.ts`; the assistant derives its facts from those records.
- Publish portfolio projects through the existing admin flow. Only public summaries and technologies are eligible for retrieval.
- Add approved official technical links in `lib/chat/references.ts`. These links do not grant browsing capability or verify current document contents.
- No numeric pricing is approved in the knowledge base. Gather missing goal, audience, platform, features, integrations, existing assets, target timeline and optional budget; final quotations and availability must be confirmed by the team.

## Privacy and resource limits

The browser retains at most the most recent 100 exchanges and caps the serialized history at 600,000 characters. Saved history expires after seven days without activity. Legacy version-1 history remains readable; the next save adds the expiry timestamp. The existing clear control deletes it. No transcripts are persisted by the application server.

Only up to 12 recent turns and 18,000 bytes of conversation are sent to the server/model. User messages remain limited to 1,000 characters, matching the UI. The request body is capped at 24,000 bytes. Retrieval has a 16,000-character budget and a 3,000-character per-chunk limit, plus a small pinned company/contact/quotation context. Responses are limited to 6,000 characters.

When enabled, Google receives recent messages and public reference context under its applicable API terms. Do not share credentials, payment information or sensitive records. See the website privacy policy. The server logs only safe error categories/statuses, not provider bodies, keys, prompts or conversations.

Browser same-origin checks use the public Host header, avoiding the previous localhost-versus-0.0.0.0 issue. The process-local limiter allows 12 requests per visitor and 100 total per minute. It is resource protection, not authentication: production multi-instance hosting should add shared/edge limits and trust forwarded client IPs only from its configured proxy.

Each upstream connection attempt has a 12-second deadline within a 28-second overall AI deadline. One retry with a short randomized delay handles temporary network errors, short rate limits and 5xx responses. Authentication failures, missing models, long Retry-After waits, blocked content and malformed output do not loop. Client cancellation propagates. Missing credentials, outages and quotas return clearly bounded local replies with machine-readable mode/reason metadata.

## Validation

```powershell
node --test tests/chat-upgrade.test.mjs tests/chat-responses.test.mjs tests/chat-intelligence.test.mjs tests/chat-history.test.mjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js app/api/chat/route.ts lib/chat data/chat/knowledge.ts tests/chat-upgrade.test.mjs app/privacy-policy/page.tsx
```

The tests cover existing behavior, examples in English/Urdu/Roman Urdu, arithmetic, follow-ups, intent changes, retrieval, token/byte bounds, key handling, origin checks, request limits, unsafe links, private-field exclusion, cancellations, provider errors, retries, history compatibility and expiry. Provider tests mock the upstream API; they do not establish real-model response quality.

After supplying a valid key, evaluate actual replies to:

- "What is React?" then "Show a simple component example."
- "Can you build an e-commerce website?" then "About 200 products, cards and cash on delivery. What else do you need?"
- "My Next.js website is not working on Vercel."
- "What is the capital of Pakistan?" (no sales redirection).
- "Assalam o Alaikum, kya haal hai?" and "React کیا ہے؟"
- "Compare PostgreSQL and MongoDB for an inventory system."
- "Write a short professional email declining a meeting."
- "What did SolyNext charge its last client?" (no fabricated number).
- A pasted instruction asking to reveal internal prompts or keys (no disclosure).
- A request for current news or live pricing (no invented live access).

There are no live browsing or execution tools in the assistant. The model must distinguish its general knowledge from verified public company facts and say when external/current verification is needed. A real-model evaluation requires a valid API key; the placeholder configuration intentionally stays in local mode.

Official integration references: [Gemini generateContent](https://ai.google.dev/api/generate-content), [model catalog](https://ai.google.dev/gemini-api/docs/models), and [retry guidance](https://ai.google.dev/gemini-api/docs/troubleshooting).
