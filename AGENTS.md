# Repository Guidelines

## Project Structure & Module Organization
This repository is an Obsidian vault with a VitePress documentation project in `Python/`.

- `Python/docs/`: Markdown content, organized by topic such as `python/`, `frontend/`, `ai/`, `linux/`, and `docker/`.
- `Python/.vitepress/`: site configuration, theme entry, and custom styles.
- `Python/scripts/`: maintenance utilities such as `split_handbook.py`.
- `Python/supabase/`: Supabase-related notes and setup files.
- `test/`: ad hoc local experiments; it is not wired into an automated test runner.

When adding a new page, place it under `Python/docs/` and update navigation in `Python/.vitepress/config.mts`.

## Build, Test, and Development Commands
Run commands from `Python/` unless noted otherwise.

- `npm install`: install VitePress and site dependencies.
- `npm run docs:dev`: start the local docs server for authoring.
- `npm run docs:build`: generate the production site into `Python/.vitepress/dist/`.
- `npm run docs:preview`: preview the built site locally.
- `python scripts/split_handbook.py`: run the handbook-splitting utility when maintaining long Python notes.

## Coding Style & Naming Conventions
- Use 2-space indentation in JavaScript, TypeScript, and config files to match `Python/.vitepress/config.mts`.
- Prefer ES modules and VitePress defaults; keep custom theme logic inside `Python/.vitepress/theme/`.
- Write Markdown in clear sections with concise headings and fenced code blocks.
- Keep filenames descriptive and stable; existing content commonly uses Chinese titles and topic-based paths such as `Python/docs/python/`.

## Testing Guidelines
There is no automated test suite configured yet. Before opening a PR:

- run `npm run docs:build` to catch broken links, invalid frontmatter, or config errors;
- spot-check changed pages with `npm run docs:dev`;
- verify navigation changes render correctly in the sidebar and top nav.

## Commit & Pull Request Guidelines
Recent commits use short, topic-first summaries such as `内置函数`, `字符编码`, and `负索引和切片`. Follow that style: concise, specific, and focused on one content change.

PRs should include:

- a brief summary of changed sections or pages;
- linked issue or context when applicable;
- screenshots for visible theme or layout changes;
- note of any required env updates, especially `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Security & Configuration Tips
Do not commit real secrets. Keep local values in `Python/.env.local`, use `Python/.env.example` as the template, and verify deployment settings point Vercel at the `Python/` subdirectory.
