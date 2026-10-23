# SolyNext assistant

The public assistant provides predefined SolyNext service guidance in the browser. It does not call an external AI provider, require an API key, or send conversations to a model.

- `lib/chat/service.ts` returns service replies after a short, cancellable delay so the animated typing dots are visible.
- `lib/chat/responses.ts`, `analysis.ts`, and `capabilities.ts` handle service questions and relevant follow-ups. Unrelated questions redirect visitors to SolyNext services.
- `app/api/chat/route.ts` retains a validated, rate-limited endpoint for predefined replies, without provider access. The public widget does not need this endpoint.
- Delete conversation immediately aborts a pending reply, resets the conversation, and removes saved browser history without confirmation.
- Completed exchanges are saved only in browser storage, limited to 100 exchanges and seven days of inactivity.

Validate the active assistant with:

```powershell
node --test tests/chat-responses.test.mjs tests/chat-history.test.mjs
```

Legacy provider modules are not connected to the public assistant.
