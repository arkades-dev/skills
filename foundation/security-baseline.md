---
id: security-baseline
name: Security baseline
version: "1.0.0"
appliesToWorkerTypes:
  - CEO
  - Frontend
  - Backend
  - DBA
  - QA
  - Security
  - Founding
  - Specialist
appliesToFiles:
  - "**/*"
docsBaseUrl: https://owasp.org/www-project-top-ten
loadMode: always
---

# Security baseline

> **Security baseline** — never compromise:
>
> 1. NEVER log secrets, tokens, API keys, or credentials. Redact before logging.
> 2. Validate at every boundary: network input, user input, third-party responses. Trust internal code.
> 3. NO `eval`, `Function(...)`, or string-to-code in any context.
> 4. Parameterize SQL — never string-concatenate user input. Use the ORM's escape mechanism.
> 5. `bun install --ignore-scripts` for untrusted package contexts; postinstall hooks are arbitrary code.
> 6. Default to least-privilege when designing new permissions or roles.

## Curated docs

- [OWASP Top 10](https://owasp.org/www-project-top-ten/): The canonical list of common web app vulnerabilities.
- [OWASP Cheat Sheet — Secrets management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html): How to handle credentials in code, logs, and runtime.
- [OWASP Cheat Sheet — SQL injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html): Parameterization patterns and ORM-safe queries.
- [OWASP Cheat Sheet — Input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html): Validation at trust boundaries.
- [Bun install scripts](https://bun.sh/docs/install/lifecycle-scripts): How postinstall hooks work and how `--ignore-scripts` defends against them.
