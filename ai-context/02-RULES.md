# VROlympics Application Rules

These rules govern how AI agents operate in this repository.

## Fresh Agent Behavior

- **Every session starts fresh** - agents have no conversation memory
- **All context must be in files** - read `ai-context/` before operating
- **Update files** when making changes that affect context

## One Unit of Work Per Session

- **Work on one task** at a time
- **Tasks come from sprint files** in `sprints/`
- **Update sprint status** when task is complete
- **Don't start new tasks** until current one is done

## Mandatory Retro Updates

- **Optionally create/update retro** after completing a sprint
  - Only create retro file if there are notable learnings, issues, or improvements to document
  - If sprint completed smoothly without significant learnings, do NOT create retro file
- **Process issues** are as important as code issues
- **Retros inform** next iteration

## Mandatory Tests

- **Every feature** must have tests
  - HTML validation tests
  - Form validation tests
  - Responsive design tests
  - Google Sheets integration tests
- **Tests are part of acceptance criteria**
- **No feature is complete** without tests
- **Run tests** before marking task complete

## Context Documentation Updates

When making changes that affect:

- **Structure** → Update `03-REPO-MAP.md`
- **Design** → Update `01-DESIGN.md`
- **Decisions** → Update `05-DECISIONS.md`
- **Rules** → Update this file (`02-RULES.md`)

## No Scope Expansion Without Design Update

- **Features beyond MVP** require `01-DESIGN.md` update
- **Non-goals can become goals**, but must be explicit
- **Scope changes** must be documented and approved
- **Refer to explicit non-goals** in `01-DESIGN.md`

## MVP Discipline

- **Stay within MVP scope** (see `01-DESIGN.md`)
- **Explicit non-goals** are boundaries, not suggestions
- **Push back** if asked to expand scope without design update
- **Focus on "Coming Soon" landing page** - no complex features

## Testing Requirements

For this static landing page:

- **HTML validation** - Valid HTML5
- **CSS validation** - Valid CSS3
- **Form validation** - Client-side email validation
- **Responsive design tests** - Works on mobile, tablet, desktop
- **Integration tests** - Google Sheets form submission works
- **Manual testing** - Visual appearance matches design

## Code Quality

- **Follow project conventions** (see `04-DEV-TEST.md`)
- **Write readable code** - future agents need to understand it
- **Comment complex logic** - especially form submission and API integration
- **Keep files organized** - follow structure in `03-REPO-MAP.md`
- **Mobile-first** - design for mobile, enhance for desktop

## File Organization

- **Follow repo structure** (see `03-REPO-MAP.md`)
- **Don't create files** outside defined structure without updating `03-REPO-MAP.md`
- **Keep related code together** - HTML, CSS, JS in appropriate directories
- **Static assets** in `public/` or `assets/` directory

## Control Tower Boundary (HARD RULE)

- **NEVER edit Control Tower files** - You cannot modify any files in `control-tower/` or `../control-tower/` for any reason
- **NEVER edit templates** - You cannot modify files in `templates/` or `../templates/` for any reason
- **NEVER edit project types** - You cannot modify files in `project-types/` or `../project-types/` for any reason
- **This is a hard boundary** - Control Tower created this app, but you operate it. Control Tower is separate and autonomous.
- **Control Tower suggestions** - Suggestions for Control Tower improvements are compiled during Evaluation/Retro Mode by reviewing retros and debug sessions, not during regular development or sprint retros
- **Control Tower improvements happen through Control Tower's evaluation/retro mode**, not through app modifications

## Retro Requirements

- **Optionally create/update retro** after completing a sprint
  - Only create retro file if there are notable learnings, issues, or improvements to document
  - If sprint completed smoothly without significant learnings, do NOT create retro file
  - If created, document:
    - What went well
    - What went poorly
    - Design issues
    - Process issues
    - Improvements for next iteration
- **Update `retro/latest.md`** only if there are new learnings to add

## VROlympics-Specific Rules

- **Brand consistency**: Use exact colors from `01-DESIGN.md`
- **Draft copy is acceptable**: Don't spend time perfecting copy
- **Image placeholders OK**: Don't need real graphics for MVP
- **Google Sheets simplicity**: Use simplest integration method that works
- **Fast iteration**: Prioritize working over perfect

## Rule Violations

If a rule is violated:

1. **Retro should document** the violation
2. **Process should be updated** to prevent recurrence
3. **Rules should be clarified** if ambiguous
