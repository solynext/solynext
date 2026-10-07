# SolyNext service assistant

The floating chatbot appears on public routes through `PublicSiteFrame`. Admin routes are excluded. It uses existing brand tokens and Geist typography; its CSS is scoped to the widget.

This is a frontend service guide. Replies are curated text, not AI-generated answers. A local intent and conversation-frame analyzer considers the requested solution, business goal, industry, platform, features, and recent user turns before choosing a response. Completed conversations save in this browser's local storage and restore after reload, including their project context. The chat does not submit inquiries or send conversations to a backend; contact links take visitors to the existing contact page.

The header's clear-chat control removes the saved conversation, resets project context, and cancels any pending reply. The assistant uses a female illustrated avatar and the user a male illustrated avatar. Local history is bounded to the welcome and the latest 100 completed exchanges. An in-flight question does not replace the last completed saved conversation. Invalid storage is ignored, restored links are restricted to existing public service/contact routes, and blocked storage produces a notice while the chat remains usable.

The internal relevance bands are highly relevant (80–100), partially relevant (40–79), and irrelevant (0–39). Scores are deterministic routing heuristics, not measured semantic probabilities. Scores, evidence, and classification metadata never appear in replies. Partial business goals get digital-service guidance; unrelated advice gets an apology and a service redirect. Bounded follow-ups carry project context, explicit changes can select another solution, and unrelated/new-project turns clear stale requirements. The analyzer is intentionally bounded and may ask for clarification; it does not claim unrestricted natural-language understanding.

## Integration points

- `components/chat/TechSolutionsChatbot.tsx`: presentation, local conversation state, accessible controls, typing/error feedback, and viewport handling.
- `lib/chat/types.ts`: request, message, reply, and asynchronous service contracts.
- `lib/chat/responses.ts`: welcome, quick actions, service routing, and the out-of-scope redirect.
- `lib/chat/analysis.ts`: intent detection, private relevance scores, and reconstruction of recent conversation context.
- `lib/chat/capabilities.ts`: curated capabilities, service URLs, and published technologies, grounded in `data/mockData.ts`.
- `lib/chat/history.ts`: versioned browser persistence, validation, safe restored links, retention limits, and clearing.
- `lib/chat/service.ts`: cancellable local response adapter. Replace `reply(request, signal)` with a request to your backend while retaining the UI. The request includes conversation history; the reply contains plain text and optional links.

For a future AI integration, keep provider credentials on the server, enforce the SolyNext-only topic boundary on the backend, validate generated links, and render replies as text. The current UI handles failed requests with retry/contact actions and aborts pending work on unmount.

Run `node --test tests/chat*.test.mjs` to check relevance bands, industry versus request intent, business bridges, context changes, metadata privacy, capability boundaries, service routing, adapter history forwarding, and cancellation. The existing Next.js production build fetches Geist Google Fonts and requires network access.
