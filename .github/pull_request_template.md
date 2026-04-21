## What does this PR do?

<!-- Brief description of the change. Link to issue if relevant. -->

Closes #

## Type of change

<!-- Mark with an x in the brackets, e.g., [x] -->

- [ ] feat — new feature
- [ ] fix — bug fix
- [ ] chore — maintenance, no code change
- [ ] docs — documentation only
- [ ] refactor — code restructure, no behavior change
- [ ] test — adding or fixing tests
- [ ] ci — CI/CD configuration change

## Changes

<!-- Bullet points of what actually changed -->

-
-
-

## Testing

<!-- How did you verify this works? -->

- [ ] Tests pass locally (`npm test`)
- [ ] Tested in browser against ALB endpoint
- [ ] No new dependencies added (or noted below)

## Security checklist

- [ ] No secrets, tokens, or credentials in code
- [ ] No new public endpoints exposed without authentication consideration
- [ ] No new third-party dependencies that haven't been reviewed
- [ ] Trivy scan passes (will run automatically)
- [ ] Gitleaks scan passes (will run automatically)

## Deployment impact

- [ ] No breaking API changes
- [ ] No environment variable changes required
- [ ] No database schema changes (N/A for in-memory store)
- [ ] Backward compatible with current ECS task definition

## Reviewer notes

<!-- Anything specific the reviewer should focus on? Edge cases? -->

---

**Once merged to `main`, AWS CodePipeline will automatically deploy this change to production.**
