# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Read `AGENTS.md` first.** It is the authoritative contributor manual (lesson contract, quiz schema, dependency allowlist, commit rules, CI/automation contract, certification rules). This file only adds what AGENTS.md doesn't cover.

## How this checkout is used

This is a personal fork used for *learning*, not contributing. The user's own work lives in `learner/mark/phase-NN/` (Jupyter notebooks, experiments) on `mark/*` branches. Treat `phases/`, `certifications/`, `projects/` as read-only reference material unless the user explicitly asks to change curriculum content. The current focus is the Building and Deploying AI Applications path (`learning-paths/building-and-deploying-ai-applications.json`), worked on the `mark/building-and-deploying` branch. Its progress tracker is `learner/mark/building-and-deploying/PATH-LEARNING.md`: read it to find the next lesson and update it when a lesson's status changes. No dedicated tutor skill exists for this path. When teaching a lesson from it, follow the path order rather than `/learn`'s numeric phase order. Learner-mode skills (`learn`, `check-understanding`, `claude-certification`, `build-project`, etc.) live under `skills/` and `.claude/skills/`.

## Commands

```bash
# Run one lesson (Python example; see AGENTS.md for TS/Rust/Julia equivalents)
cd phases/NN-phase/MM-lesson/code
python3 main.py
python3 -m unittest discover tests -v
python3 -m unittest tests.test_main.SomeTestCase.test_name   # single test

# Curriculum-wide checks
python3 scripts/audit_lessons.py              # CI-blocking lesson contract audit
python3 scripts/audit_certifications.py
python3 scripts/run_lesson_tests.py --phase 01-math-foundations   # run every lesson's tests (heavy deps -> skipped)
python3 scripts/lesson_run.py --phase 14 [--execute] [--strict]   # syntax check (or run) lesson code
python3 scripts/check_quiz_bias.py --check
python3 scripts/check_readme_counts.py        # advisory

# Scaffolding / site
scripts/scaffold-lesson.sh <phase-dir> <lesson-slug> [title]
node site/build.js                            # regenerates site/data.js (CI owns this on main)
```

Lesson entry files may start with `# requires: pkg1, pkg2`; `lesson_run.py --execute` skips those when deps are missing.

## Architecture notes

- `README.md`, `ROADMAP.md`, and `glossary/terms.md` are data sources: `site/build.js` parses them into `site/data.js`, and `scripts/build_catalog.py` builds the gitignored `catalog.json`. README lesson rows must be markdown links to the lesson dir or the site loses the URL.
- `book/` + `scripts/build_book.py` render lessons into a book; `i18n/` + `scripts/translate_*.py` handle translations. Certifications are excluded from both pipelines.
- `certifications/claude/` is manifest-driven: `program.json` (metadata/disclaimer), `prerequisites.json` (lesson DAG), `tracks/*.json` (blueprints and ordered routes referencing lesson paths), `assessments/` (separate multi-answer schema).
