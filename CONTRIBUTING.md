# Contributing to LATINOS

LATINOS is building an open, practice-first Latin Dance OS. The current focus is the Force Lab: helping learners understand where an action begins, how force travels through the body, what compensation looks like, and what to practise next.

You do not need to be a developer to contribute.

## Dance knowledge contributions

Use the GitHub issue chooser and select the closest form:

- `动作 / 发力知识` for a movement explanation, cue, drill, or correction;
- `资料线索` for a public article, video, competition reference, or official source;
- `体验反馈` when something on the site is confusing, unsafe, or hard to practise.

Please separate these fields:

1. what can be observed;
2. the teaching cue you use;
3. subjective sensation;
4. the source or teacher lineage, when shareable;
5. safety limits or people for whom the drill may not be suitable.

Do not paste private class transcripts, paid-course materials, identifiable student recordings, or media you do not have permission to publish.

## Code and design contributions

1. Fork `EOMZON/LATINOS`.
2. Create a focused branch such as `force/rumba-weight-transfer` or `fix/mobile-force-chain`.
3. Keep formal frontdoor work in `sites/frontdoor/` and experiments in `apps/demos/`.
4. Run:

   ```bash
   cd sites/frontdoor
   pnpm verify
   ```

5. Open a pull request and complete the source, privacy, safety, screenshots, and verification checklist.

## Content review states

- `pending`: proposed but not yet edited;
- `editorial-approved`: structure and language checked;
- `professional-review`: reviewed by an identified Latin dance professional;
- `published`: safe to show publicly with source and license information intact.

Conflicting teaching systems may coexist when they are clearly attributed. A pull request must not erase disagreement by presenting one cue as universal fact.

## Public / private boundary

Public artifacts may include rewritten knowledge cards, original diagrams, drills, public references, and de-identified learning observations. Raw Minutes transcripts, teacher/student identity, private audio, login data, and copyrighted class media stay outside the public repository.

## Maintainer promise

Contributors should receive a clear outcome: accepted, changes requested with a reason, or declined with a documented boundary. Opening a contribution does not grant permission for unrelated commercial reuse of a contributor's media.
