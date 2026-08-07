# content-schema.md

Defines every content "block type" used across Step 1, 2, and 3. Every
block in `content-step-1.json` / `content-step-2.json` / `content-step-3.json`
must be one of these 12 types. This schema maps 1:1 onto the bracket tags
already used in the finalized content files (`[Ponder]`, `[Concept-N]`,
etc.) — nothing new was invented, just formalized into a shape a renderer
can switch on.

The frontend renders a step as an ordered array of these block objects. A
single `BlockRenderer` component switches on `type` and delegates to the
matching block component (see `project-build.md` for the component list).

---

## 1. `banner`
Section start/end marker, or a congratulatory transition message.
```json
{ "type": "banner", "role": "start" | "end", "text": "string" }
```

## 2. `markdown`
Plain narrative text. Supports standard markdown (bold, blockquotes for
dialogue, lists). This is the majority block type — most of the story is
this.
```json
{ "type": "markdown", "text": "string (markdown)" }
```

## 3. `challenge`
The highlighted question posed to the learner at the start of a problem
(maps to `[Challenge]`).
```json
{ "type": "challenge", "text": "string" }
```

## 4. `ponder`
A "think before you see the answer" gate. Shows `prompt` first; learner
must click Next/Reveal before `reveal` content appears. Used for both the
top-level Think prompt and the nested "will this stop?" mid-story check.
```json
{ "type": "ponder", "prompt": "string", "reveal": "string (markdown)" }
```

## 5. `qa-reflection`
The Summary section's sequence of question → revealed-explanation pairs,
stepped through one at a time (learner clicks Next after each answer to
see the next question).
```json
{
  "type": "qa-reflection",
  "intro": "string (optional lead-in line)",
  "items": [
    { "question": "string", "answer": "string" }
  ]
}
```

## 6. `concept`
A labeled concept explainer: text plus an optional static, non-interactive
code snippet with an optional one-line note underneath it. Used for
Concept-1/2/3 in Step 2.
```json
{
  "type": "concept",
  "id": "string",
  "title": "string",
  "text": "string (markdown)",
  "code": "string (optional, python)",
  "codeNote": "string (optional)"
}
```

## 7. `concept-map`
The "map the story to the concept" recap list (Step 2 Summary-Section).
```json
{
  "type": "concept-map",
  "intro": "string",
  "items": [
    { "story": "string", "concept": "string" }
  ]
}
```

## 8. `mcq`
A single multiple-choice question with immediate feedback.
```json
{
  "type": "mcq",
  "question": "string",
  "options": ["string", "string", "string"],
  "correctIndex": 0
}
```
**Note:** the source content (`content-step-2.md`) listed options but never
marked which one is correct. Correct answers have been inferred from
context and filled into `content-step-2.json` — flagged clearly there for
your confirmation before build. Do not assume they're pre-verified by you.

## 9. `fact`
A boxed aside, question-and-answer style (maps to `[Fact]`).
```json
{ "type": "fact", "question": "string", "answer": "string (markdown)" }
```

## 10. `code-steps`
A progressive, incremental code-build walkthrough — each step shows an
instruction and the code as it exists at that point (Step 3's
Designing-Recursion section).
```json
{
  "type": "code-steps",
  "title": "string",
  "steps": [
    { "instruction": "string", "code": "string (python)" }
  ]
}
```

## 11. `fill-blank`
An interactive fill-in-the-blank code exercise (Step 3's
Play-with-Recursion section).
```json
{
  "type": "fill-blank",
  "title": "string",
  "instruction": "string",
  "code": "string (python, blanks marked as ____ with a trailing id comment or positional order)",
  "blanks": [
    { "id": "blank1", "answer": "string" }
  ],
  "optionPool": ["string", "string"]
}
```
**Open decision, needs your call:** the source content lists options as a
numbered list without specifying the exact interaction (drag-and-drop vs.
click-to-select). For a first build, **click-to-select is recommended**
over drag-and-drop: tap a blank to make it active, then tap the correct
option from a shown list to fill it. This is materially simpler to build
correctly (no drag library, no mobile touch-drag edge cases) and just as
effective pedagogically for a 2-blank exercise. See `project-build.md` for
where this decision plugs into the build. Override this if you have a
strong preference for drag-and-drop.

## 12. `video`
An optional, non-blocking external video reference.
```json
{
  "type": "video",
  "title": "string",
  "url": "string",
  "note": "string (optional)",
  "optional": true
}
```

---

## Reveal / pacing behavior (applies across block types)

Two blocks gate content behind a click: `ponder` (prompt → reveal) and
`qa-reflection` (question → answer → next question). Every other block
type renders fully once it appears.

## Reveal / pacing behavior — beat-based, not accumulating (Step 1 only, for now)

**Superseded from the original accumulating/scrolling design.** For Step
1, blocks no longer stack up in a long scrolling column. Instead:

- Only the **current block's** content is visible at a time.
- Within a block, its internal chunks (see `markdown` staggered reveal,
  above) still stack and stagger as before.
- When the learner advances to the **next block** (via Next, or a
  `ponder`/`qa-reflection` completing), the current block's content
  clears entirely and the next block's content starts fresh in the same
  space — a "beat" ending and the next one beginning, not a growing list.
- A **"← Back"** control sits alongside Next, decrementing to the
  previous block's content (re-rendered fresh, not restored mid-reveal),
  since scroll-back is no longer available as a way to re-read something.
- If a single block's content doesn't fit the available vertical space,
  that block's own content area scrolls internally — the outer page/layout
  itself does not scroll.

Steps 2 and 3 are **not yet decided** to use this beat-based model or the
split-pane layout below — revisit after Step 1 is reviewed. Until decided
otherwise, Steps 2/3 keep the original accumulating layout from
`project-build.md`.

## Visual scene layout (Step 1 only, for now)

The screen is split into two panes:

- **Left pane — fixed, non-scrolling, 400px wide on desktop.** Displays a
  single base illustration of the movie theater (see image spec below).
  On narrow/mobile viewports, this collapses to a ~200px-tall band
  stacked above the text instead of side-by-side.
- **Right pane — takes remaining width, beat-based per above (not a
  scrolling column).**

### Base image
- One AI-generated image, portrait orientation, generated at **1024×1536**
  (2:3 ratio).
- Displayed via `object-fit: cover` at 400px wide × full viewport height
  (desktop) or full-width × ~200px (mobile).
- Scene: theater interior viewed from behind the seated rows, facing a
  blank screen at the front, tiered/stadium-style seating rising
  backward, a few seated silhouette figures visible from behind (no
  faces), lights on. See exact generation prompt in
  `development-log.md` / conversation history — generate once, reuse for
  all states below via CSS, not multiple separate images.

### CSS-driven states on the same base image (do NOT generate separate images per state)
1. **Lights on** (default) — image as generated, no filter.
2. **Lights out** (triggered when the power-failure line reveals) — a
   dark semi-transparent overlay fades in over the image, plus a
   brightness/contrast CSS filter reduction, to simulate the room going
   dark without literally blacking out the image.
3. **Thought bubble** (triggered when the "Which row am I sitting in?"
   line reveals) — a CSS-built rounded box with a pointer/tail, absolutely
   positioned over Raghav's approximate seat location in the image (this
   position must be manually calibrated once against the generated image
   — hardcode the x/y coordinates, don't attempt to auto-detect). Shows
   the thought text, disappears when the block advances.
4. **Congrats overlay** (triggered on the Step 1 end banner) — large bold
   text over the image reading something like "Congratulations 👏, you
   have learnt recursion!", with a dark scrim/backdrop-blur behind the
   text for legibility. Optionally also revert the lights-out filter back
   to lit, as a small "resolution" moment.

### Image generation prompt (for Gemini/ChatGPT image generation, run manually — not part of the agent's coding task)
> A wide interior view of an empty movie theater auditorium, photographed
> from behind the rows of seats, looking toward a large blank cinema
> screen at the front. Seats are arranged in ascending tiers,
> stadium-style, rising upward and backward like a typical auditorium.
> Only the backs of a few seated silhouette figures are visible in the
> rows — no faces visible. Warm ambient lights are on, softly
> illuminating the room. Cinematic, atmospheric, slightly stylized
> digital illustration, moody indigo and warm amber color palette.
> Vertical/portrait composition, tall narrow framing, 1024x1536. No text,
> no logos, no visible faces.

Once generated, save as `client/src/assets/theater-scene.png` (or .jpg) —
the agent's coding task assumes this file already exists at that path; it
does not generate it.

A `markdown` block's text is split into its natural chunks (paragraphs, or
individual sentences for short ones — the existing content is already
written in short paragraphs, so paragraph-level chunking works directly).
Each chunk fades/slides in after a brief delay from the previous one — the
same visual language chat apps use for a sequence of messages arriving.
This produces the "someone is talking to you" feeling through pacing
between complete thoughts, not through per-letter animation.

- **Narrative chunks auto-advance** — each chunk appears roughly 600–900ms
  after the previous one, no click needed. This keeps momentum and reads
  like being told a story.
- **`ponder` and `qa-reflection` blocks do NOT auto-advance** — they
  already gate on a click (see below), and that pause is deliberate: it's
  where the learner is meant to stop and think, not be carried along.

This is simpler to build correctly than a true typewriter (no per-character
timing, no skip/pause control needed, and markdown chunks always render as
complete, correctly-formatted units — never a half-rendered bold tag or
blockquote), while still avoiding the "entire block dumped at once" feel of
a flat fade-in.
