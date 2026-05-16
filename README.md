# TopSpeech Daily Lesson Prototype

This repository contains a progressive web app (PWA) prototype for a daily lesson experience in a speech therapy context. The prototype is built as a small interactive lesson flow with a start screen, four exercise cards, animated transitions, feedback states, and a completion screen.

## What is included

- `task_2/index.html` — main entry point for the lesson prototype
- `task_2/styles.css` — responsive styling and UI layout
- `task_2/app.js` — lesson logic, progress handling, feedback, and retry counter
- `task_2/manifest.json` — PWA metadata for installability
- `task_2/sw.js` — simple service worker cache for offline support
- `task_2/icon.svg` — app icon used by the manifest

## Prototype behavior

- Start screen with a friendly daily lesson intro
- Four exercises covering different card types:
  - choice selection
  - pair recognition
  - mirror-mode cue
  - phrase selection
- Animated card entrance and progress bar updates
- Correct/incorrect feedback with a retry option
- Retry counter that treats retries as persistence wins
- Lesson completion screen with reward messaging

## How to run

### Option 1: Use Live Server in VS Code

1. Open the `d:\Frontend_project\speech` folder in VS Code.
2. Open `task_2/index.html`.
3. Install the `Live Server` extension if needed.
4. Right-click the editor and choose `Open with Live Server`.
5. View the app in your browser.

### Option 2: Use a local HTTP server

1. Open a terminal in `d:\Frontend_project\speech`.
2. Run one of the following commands:

- With Python:
  ```bash
  cd task_2
  python -m http.server 8000
  ```

- With Node.js and `npx`:
  ```bash
  cd task_2
  npx serve .
  ```

3. Open the browser at:

- `http://127.0.0.1:8000` (Python)
- or the URL printed by `serve`

## Notes

- The prototype uses static content only and does not require a backend.
- The service worker is included so the PWA behaves like an installable app when served over HTTP.
- If button text does not appear, refresh the browser cache with a hard reload (Ctrl+F5).
