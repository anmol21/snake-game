# Snake Game

A tiny, dependency-free browser Snake game used as the deterministic sample repository for Background Agent.

## Run

```bash
npm test
npm start
```

Open <http://localhost:4173> and use the arrow keys or WASD.

## Example agent tasks

- Add a pause/resume control and test the state transition.
- Add a wrap-around board mode without breaking collision behavior.
- Persist the best score locally and show it beside the current score.

## Design goals

- No install step or external services.
- Fast deterministic tests with Node's built-in test runner.
- Small enough to understand quickly, but complete enough for meaningful code changes.

MIT licensed.
