<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the joborg frontend. A new `instrumentation-client.ts` was created at the project root (Next.js 15.3+ pattern) to initialize PostHog with a reverse proxy via `/ingest`. The `next.config.ts` was updated with the required rewrites. User identification is wired into the Zustand auth store so both fresh logins and returning visitors (loaded from localStorage) are identified. Ten events covering the full user lifecycle — from sign-up to tracker management and logout — were instrumented across six files.

| Event Name | Description | File |
|---|---|---|
| `user_signed_up` | User successfully completes registration and creates an account. | `src/app/(auth)/auth/register/page.tsx` |
| `user_logged_in` | User successfully logs in to their account. | `src/app/(auth)/auth/login/page.tsx` |
| `verification_email_resent` | User requests a new verification email to be resent. | `src/app/(auth)/auth/login/page.tsx` |
| `password_reset_requested` | User requests a password reset email. | `src/app/(auth)/auth/forgot-password/page.tsx` |
| `tracker_created` | User creates a new career page tracker. | `src/app/(app)/trackers/TrackersClient.tsx`, `src/app/(app)/dashboard/DashboardClient.tsx` |
| `tracker_updated` | User updates an existing tracker's details. | `src/app/(app)/trackers/TrackersClient.tsx` |
| `tracker_deleted` | User permanently deletes a career page tracker. | `src/app/(app)/trackers/TrackersClient.tsx` |
| `tracker_paused` | User pauses monitoring for a tracker. | `src/app/(app)/trackers/TrackersClient.tsx` |
| `tracker_resumed` | User resumes monitoring for a paused tracker. | `src/app/(app)/trackers/TrackersClient.tsx` |
| `user_logged_out` | User logs out of their account (also calls `posthog.reset()`). | `src/stores/authStore.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/495632/dashboard/1792992)
- [Sign-up to Tracker Creation Funnel (wizard)](https://us.posthog.com/project/495632/insights/Iac7ui6H)
- [New Sign-ups Over Time (wizard)](https://us.posthog.com/project/495632/insights/lrSimlFY)
- [Tracker Activity Over Time (wizard)](https://us.posthog.com/project/495632/insights/PjLyEvS1)
- [Daily Active Users (wizard)](https://us.posthog.com/project/495632/insights/1eMUgriQ)
- [User Churn — Logouts Over Time (wizard)](https://us.posthog.com/project/495632/insights/eemfK0fO)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — `loadAuthFromStorage` in `src/stores/authStore.ts` now does this, but verify it fires correctly on a hard reload when a session is stored in localStorage.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
