# SolyNext assistant

The chat widget uses `/api/chat`. The server selects relevant public service, FAQ, technology, industry, career, article and published project content and sends a bounded recent conversation to Gemini. It includes the visitor's current page for more relevant answers. No external pages are fetched and unpublished portfolio projects are excluded.

## Enable Gemini

The local `.env.local` is configured below. Replace `api` with your real key. For deployment, add these values to your hosting provider's server environment:

```dotenv
GEMINI_API_KEY=api
GEMINI_MODEL=gemini-3.8-flash
```

Restart the dev server, or redeploy after changing hosting environment values. Use a model available to your Google account; the model name is configurable. Do not use a `NEXT_PUBLIC_` prefix: the key must stay on the server. Do not commit the key or paste it into the chat widget. No key is needed to run the existing basic answers.

## Behavior

- Website-first answers with follow-up context, general technical guidance and multilingual replies.
- Brief, polite handling of harmless off-topic questions and redirection when appropriate.
- Only known website URLs can be returned as link buttons.
- Company facts must come from website context; missing facts, prices and commitments are referred to the team.
- Missing credentials or provider failures produce clearly labeled basic answers. No fake AI success state.
- Requests have body/history limits, same-origin browser checks, 30-second provider timeout and process-local rate limits (12 requests per visitor per minute, 120 total per process). Multi-instance deployments should additionally enforce limits at the hosting edge with a trusted client-IP configuration; forwarded IPs alone are not authentication.
- Messages persist in browser storage. Recent messages go to Google when enabled; the application does not persist chat transcripts on the server.

## Verify after adding the key

Ask about UI/UX timelines, a follow-up like "what is included?", a project comparison, Urdu/Roman Urdu, an unrelated question, and an unpublished or invented offering. Confirm correct page links and no unsupported promises. Test a disabled/invalid key to check the labeled fallback.

The provider integration follows https://ai.google.dev/api/generate-content and https://ai.google.dev/gemini-api/docs/models. A real provider smoke test requires your key.
