# SolyNext assistant

The floating assistant appears on public routes through `PublicSiteFrame`; admin routes are excluded. It sends chat requests to the same-origin `/api/chat` Route Handler. When `OPENROUTER_API_KEY` is configured on the server, replies are generated with the OpenRouter Chat Completions API using `OPENROUTER_MODEL` (default: `openai/gpt-4o`). The API key is never sent to the browser. Without a key, or when the provider is unavailable, the endpoint returns a clearly limited local answer.

The assistant can answer general questions and provide technology and SolyNext service guidance. Its server prompt includes relevant published company, service, technology, FAQ, blog, and public portfolio information. User messages and bounded recent conversation history are sent to OpenRouter when AI is enabled. Do not enter credentials, API keys, payment details, or sensitive personal or business information. Provider processing is subject to OpenRouter's privacy terms. Requests are not stored in the application's server database; completed conversations are retained in browser storage for up to seven days, capped at the welcome message and the latest 100 exchanges. The Delete conversation control clears saved history and aborts a pending request.

The endpoint validates same-origin requests, content type, request size, message/history shape, and rate limits. Generated links are restricted to approved public site routes and documentation. Replies are rendered as text. AI responses do not send inquiries, book appointments, or make external changes; confirm service availability, pricing, and commitments with the team.

## Integration points

- `components/chat/TechSolutionsChatbot.tsx`: accessible widget UI, browser history, request cancellation, and page context.
- `app/api/chat/route.ts`: request validation, rate limiting, public knowledge retrieval, provider selection, and offline fallback.
- `lib/chat/provider.ts`: OpenRouter request/response handling, bounded retry and timeout behavior, and approved-link validation.
- `lib/chat/service.ts`: cancellable browser adapter for the same-origin endpoint.
- `lib/chat/knowledge.ts` and `data/chat/knowledge.ts`: retrieval from published company and site content.
- `lib/chat/prompt.ts`: assistant behavior and safety instructions.
- `lib/chat/history.ts`: validated, bounded browser persistence and safe restored links.

Set `OPENROUTER_API_KEY` in the local server environment or deployment secret manager. Optionally set `OPENROUTER_MODEL`; never use a `NEXT_PUBLIC_` prefix for provider credentials. `node --test tests/chat*.test.mjs` runs the focused assistant tests. The production build fetches Geist Google Fonts and requires network access.
