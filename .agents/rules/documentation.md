---
trigger: always_on
---

Use SOLID, DRY, and KISS principles throughout the codebase:

- Single Responsibility: every file, class, and function must do exactly one thing. If you can describe it with "and" — split it.
- Open/Closed: extend behavior through new files/modules, never by modifying existing stable logic.
- DRY: if the same logic appears more than once — extract it into a shared utility, hook, or service.
- KISS: prefer the simplest solution that works. No premature abstractions.

File structure rules:
- Split code into separate files by logical layer: UI components, services, hooks, utils, types, constants — never mix them.
- A file that contains different kinds of logic must be broken into multiple files.
- Each component file renders UI only — no business logic, no API calls inside components.