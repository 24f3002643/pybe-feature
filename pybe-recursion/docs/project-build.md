# project-build.md

Technical build specification. This document assumes `content-schema.md`
and the three `content-step-*.json` files are final. If they change,
update this document's affected sections before continuing the build.

---

## 1. Architecture summary

This is a **schema-driven content renderer**, not a page-by-page hand-built
app. There are 12 fixed block types (see `content-schema.md`). The entire
frontend is one generic mechanism: fetch an array of blocks for the
current step, walk through them in order, render each with the component
matching its `type`.

This matters for the vibe-coding LLM: **do not build Step 1, Step 2, and
Step 3 as three separate hand-coded pages.** Build the 12 block components
and one `BlockRenderer` + one `StepFlow` engine, once. All three steps run
through the exact same rendering machinery, driven only by which JSON they
load.

- **No authentication, no user accounts, no cross-session persistence** —
  confirmed by the project owner. Progress lives only in React state for
  the current browser session; a page refresh resets to the start. Do not
  build login, sessions, or a Users collection.
- **MongoDB's role is narrow and specific:** it stores the three steps'
  content documents (seeded once from the JSON files below), so content
  edits don't require a frontend redeploy. It is not storing any
  learner-specific data.

## 2. Stack

- **MongoDB** — one collection, `content`, holding one document per step.
- **Express** — one read-only route group, serving step content.
- **React (Vite)** — renders the block-driven learner experience.
- **Node** — runtime for Express.

## 3. Folder structure

```
pybe-recursion/
├── server/
│   ├── models/
│   │   └── ContentStep.js        # { stepId: String, blocks: [Mixed] }
│   ├── routes/
│   │   └── content.js            # GET /api/content/:stepId, GET /api/content
│   ├── seed/
│   │   ├── content-step-1.json
│   │   ├── content-step-2.json
│   │   ├── content-step-3.json
│   │   └── seed.js               # one-time script: reads the 3 JSON files, inserts into Mongo
│   └── server.js
└── client/
    └── src/
        ├── components/
        │   ├── blocks/
        │   │   ├── Banner.jsx
        │   │   ├── Markdown.jsx
        │   │   ├── Challenge.jsx
        │   │   ├── Ponder.jsx
        │   │   ├── QAReflection.jsx
        │   │   ├── Concept.jsx
        │   │   ├── ConceptMap.jsx
        │   │   ├── MCQ.jsx
        │   │   ├── Fact.jsx
        │   │   ├── CodeSteps.jsx
        │   │   ├── FillBlank.jsx
        │   │   └── Video.jsx
        │   ├── BlockRenderer.jsx   # switch(block.type) -> matching component
        │   └── StepFlow.jsx        # walks the block array, manages "how far revealed" state, Next button
        ├── data/                   # local copies of the 3 JSON files, used until M3 (see below)
        ├── pages/
        │   └── App.jsx             # step 1 -> 2 -> 3 navigation
        └── main.jsx
```

## 4. API surface (minimal, by design)

```
GET /api/content            -> { step1: [...blocks], step2: [...], step3: [...] }
GET /api/content/:stepId    -> [...blocks]   (stepId: "step1" | "step2" | "step3")
```
No POST/PUT/DELETE routes are needed anywhere in this app. If the LLM
building this proposes write routes, a login system, or a users
collection, that is scope creep — decline it.

## 5. Component contract

`BlockRenderer` receives one block object and renders the matching
component from the table in `content-schema.md`. Each block component
should be a small, pure, presentational component — it receives its block
data as props and renders; it does not know about the overall step
sequence.

`StepFlow` is the only component that manages sequencing/reveal state:
- Keeps track of how many blocks are currently "revealed" for the active
  step.
- Most blocks render immediately once revealed, **except**:
  - `markdown` blocks, which internally reveal their own text in
    auto-advancing chunks (paragraph/sentence-level, ~600–900ms apart —
    this chunking lives inside the `Markdown` component itself, not in
    `StepFlow`).
  - `ponder` and `qa-reflection`, which gate further reveal behind a
    click.
  (See `content-schema.md`, "Reveal / pacing behavior," for full detail.)
- Renders a "Next" control to advance to the next block once the current
  one has finished revealing.
- When the step's blocks are exhausted, exposes a callback/prop so `App`
  can advance to the next step.

## 6. Two decisions confirmed as defaults (override if you disagree)

1. **Fill-blank interaction: click-to-select**, not drag-and-drop. Tap a
   blank to focus it, tap an option to fill it. Simpler to build
   correctly, no drag library dependency, no mobile drag edge cases.
2. **Text reveal: chunked, staggered reveal — not a flat fade-in, and not
   a character-by-character typewriter.** `markdown` block text is split
   into paragraph/sentence chunks; each chunk fades/slides in ~600–900ms
   after the previous one, auto-advancing with no click needed (like a
   sequence of chat messages arriving). `ponder` and `qa-reflection`
   blocks are the exception — they stay click-gated, since that pause is
   where the learner is meant to stop and think. This gives the "someone
   is talking to you" pacing without the build cost of a true typewriter
   (no per-character timing, no skip/pause control, and markdown chunks
   always render as complete, correctly-formatted units). See
   `content-schema.md`, "Reveal / pacing behavior," for full detail.

## 7. Build order (milestones)

This is deliberately **not** strict bottom-up (build generic primitives
with no context) or strict top-down (build page shells before knowing
what's inside them). It's **schema-first, then vertical-slice-first**:
get the actual learner experience working and demoable as early as
possible, with the backend added last, since for static content the
backend is mechanical, not risky.

### M0 — Freeze content (done, pending your confirmation)
- `content-schema.md` and the three `content-step-*.json` files are the
  input to everything below. Confirm the two open decisions (MCQ correct
  answers, fill-blank interaction) before starting M1.

### M1 — Frontend-only, Step 1 working end-to-end
- Scaffold a plain Vite + React app. No Express, no MongoDB yet.
- Import `content-step-1.json` directly as a local file (`client/src/data/`).
- Build `BlockRenderer` and every block component **type actually used in
  Step 1**: `banner`, `markdown`, `challenge`, `ponder`, `qa-reflection`.
- Build `StepFlow` with reveal/Next logic.
- Goal: Step 1, with real content, fully playable in the browser. This is
  your first genuinely demoable artifact — the thing Prakash Sir asked you
  to go build, not describe.

### M1b — Step 1 visual & pacing enhancement (after M1, before M2)
Applied only to Step 1, for now — see `content-schema.md`, "Reveal /
pacing behavior — beat-based" and "Visual scene layout," for full detail.
Steps 2/3 are explicitly not decided yet and keep the original
accumulating layout until revisited.

Scope of this milestone:
- Convert Step 1's `StepFlow` from an accumulating scrolling column to a
  **beat-based model**: one block visible at a time, clearing fully on
  advance, with an added "← Back" control.
- Add the split-pane layout: fixed 400px left image pane (200px stacked
  band on mobile), scrolling-if-needed right content pane.
- Add the base theater image (`client/src/assets/theater-scene.png` —
  generated manually beforehand, not by the agent) with three CSS-driven
  states layered on top of it: lights-out (triggered by the power-failure
  line), a thought bubble over Raghav (triggered by the "which row am I
  sitting in" line, manually-calibrated position), and a congrats overlay
  (triggered by the end banner).
- **Do not regenerate or request multiple images** — one base image, all
  states are CSS filters/overlays on top of it, so they stay visually
  consistent.

Before starting M1b, confirm the base image file already exists at
`client/src/assets/theater-scene.png` — generate it externally (Gemini/
ChatGPT image generation, prompt in `content-schema.md`) and place it in
the repo yourself; this is not part of the agent's coding task.

### M2 — Extend to Step 2 and Step 3, still frontend-only
(unchanged from before — see below; note the layout/pacing model for
these two steps is still open, revisit after M1b is reviewed)
- Add the remaining block components: `concept`, `concept-map`, `mcq`,
  `fact`, `code-steps`, `fill-blank`, `video`.
- Wire `App.jsx` to move from Step 1 → Step 2 → Step 3 using local JSON
  imports for all three.
- Goal: the entire 3-step learner experience works, end to end, with zero
  backend. This is the point to actually go through it yourself and see
  whether the pacing, reveals, and difficulty feel right — the real test
  of the design.

### M3 — Add Express + MongoDB
- Stand up `server/` per the folder structure above.
- Write `seed.js`, run it once to load the 3 JSON files into MongoDB.
- Add the two GET routes.
- In the React app, swap the local JSON imports for a `fetch('/api/content')`
  call. Nothing about the rendering logic changes — only where the data
  comes from.
- Goal: a real MERN app, but functionally identical to what you already
  tested in M2.

### M4 — Polish (optional, time-permitting)
- True typewriter text reveal, if you still want it after seeing the
  fade-in version in action.
- Visual theming/styling pass.
- Mobile responsiveness check.
- Deploy (see note below on GitHub Student Pack hosting/domain).

## 8. Why this order, concretely

- You get a **real, demoable thing after M1** (hours, not days) — directly
  answering Prakash Sir's actual feedback ("implement it, don't just
  describe it").
- The riskiest, least-certain part of this whole project isn't the
  MERN plumbing — it's whether the case study's pacing and reveal
  structure actually lands with a learner. M2 lets you test that before
  any backend work is sunk.
- M3 (Express + MongoDB) is low-risk and mechanical specifically *because*
  the content is static and finalized — there's no real uncertainty left
  in that step by the time you reach it, so it's safe to leave for last.

## 9. Deployment note

Once ready to share a live link (rather than running locally for a demo),
the GitHub Student Developer Pack (see earlier project discussion) can
provide a free domain and cloud credits (DigitalOcean/Azure) for hosting
both the Express API and the React build.
