# AGENTS.md
# Vice City Responsive Guide — Project Instructions

## 1. Project Identity

**Project Name:** Vice City Responsive Guide  
**Project Type:** Educational Web Application  
**Theme:** Grand Theft Auto VI (GTA VI)  
**Primary Language:** JavaScript  
**Frontend Framework:** Vue 3  
**Build Tool:** Vite  
**Routing:** Vue Router  
**State Management:** Pinia  
**Styling:** CSS3
**Language:** Brazilian Portuguese

The project is an interactive educational guide designed to teach responsive web development through practical explanations, commented code examples, and interactive laboratories.

Its visual identity is inspired by the atmosphere of Grand Theft Auto VI, particularly Vice City, combining tropical environments, urban aesthetics, neon lighting, sunset gradients, and modern editorial design.

The application is an independent academic project and must not be presented as an official Rockstar Games product.

---

## 2. Primary Development Objectives

The main objective is to deliver a complete, functional, responsive, and visually distinctive educational application.

All development decisions must prioritize:

1. Compliance with the requirements documented in `docs/ERS.md`.
2. Clean and maintainable code.
3. Responsive design and mobile-first development.
4. Reusable Vue components.
5. Consistent visual identity.
6. Accessibility and usability.
7. Performance optimization.
8. Functional and reliable interactive laboratories.

The ERS document is the primary source of truth for project requirements.

Do not silently modify, remove, reinterpret, or replace documented requirements.

If a requirement is ambiguous or technically incomplete, identify the issue and propose a solution before making significant architectural decisions.

---

## 3. Documentation and Requirement Compliance

Before starting development or making significant architectural changes:

- Read `docs/ERS.md` completely.
- Review the existing project structure.
- Inspect existing components and dependencies.
- Identify which requirements have already been implemented.
- Avoid recreating existing functionality unnecessarily.

The implementation must follow the functional requirements (RF), non-functional requirements (RNF), laboratory specifications (LAB), and acceptance criteria defined in the ERS.

Every implemented feature should have a clear relationship with a documented requirement.

Do not introduce unnecessary functionality simply because it seems interesting or visually appealing.

Additional features may be proposed, but significant scope changes require explicit approval.

---

## 4. Technology Stack

The project must use the following technologies:

### Core technologies

- Vue 3 using the Composition API.
- Vite for development and production builds.
- JavaScript as the primary programming language.
- Vue Router for application navigation.
- Pinia for centralized state management.
- HTML5 and CSS3 for interface development.

### Required development practices

- Use Single File Components (`.vue`).
- Prefer `<script setup>` syntax.
- Use semantic HTML elements.
- Use reusable and modular components.
- Use CSS variables for shared design tokens.
- Use lazy loading for routes when appropriate.
- Use reactive Vue features instead of unnecessary direct DOM manipulation.

Do not introduce additional frameworks or libraries without evaluating their necessity and compatibility with the existing project.

Do not replace required technologies with alternative solutions.

---

## 5. Architecture and Code Organization

Maintain a modular architecture with clear separation of responsibilities.

Suggested project structure:

```text
src/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── styles/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── content/
│   └── labs/
│
├── views/
│   ├── HomeView.vue
│   ├── ResponsivenessView.vue
│   ├── UnitsView.vue
│   ├── LayoutView.vue
│   ├── ImagesView.vue
│   ├── VuePracticesView.vue
│   └── ChallengeView.vue
│
├── router/
│   └── index.js
│
├── stores/
│   ├── settingsStore.js
│   └── labsStore.js
│
├── services/
│   └── api.js
│
├── App.vue
└── main.js
```

This structure is a recommendation, not permission to create unnecessary directories or files.

Adapt it to the actual project structure when appropriate.

### Component organization

- Components must have a single, clearly defined responsibility.
- Avoid unnecessarily large Vue components.
- Separate presentation logic from business logic whenever practical.
- Reuse components instead of duplicating markup and styles.
- Keep page-specific components close to their corresponding feature when that improves organization.

### Naming conventions

- Vue components: PascalCase.
- Variables and functions: camelCase.
- Constants: UPPER_SNAKE_CASE when appropriate.
- CSS classes: descriptive kebab-case.
- Store names: descriptive and consistent.
- File names: consistent with the existing project conventions.

Use meaningful names instead of generic names such as `Component1`, `Test2`, or `NewFile`.

---

## 6. Visual Identity — GTA VI / Vice City

The visual identity is a fundamental part of the project.

The interface must evoke the atmosphere of GTA VI without sacrificing readability or usability.

### Visual direction

Use visual references associated with:

- Vice City.
- Tropical environments.
- Neon lighting.
- Sunset gradients.
- Urban nightlife.
- Modern editorial layouts.
- Cinematic photography.
- Contemporary digital interfaces.

### Suggested color palette

Use CSS variables in `:root` to centralize the design system.

Suggested initial palette:

```css
:root {
  --color-background: #100d1c;
  --color-surface: #1c1530;
  --color-surface-light: #2a2042;

  --color-primary: #ff4fa3;
  --color-secondary: #a855f7;
  --color-accent: #36d9e8;

  --color-text: #fff5fa;
  --color-text-muted: #b9adc9;

  --color-border: rgba(255, 255, 255, 0.12);

  --gradient-sunset: linear-gradient(
    135deg,
    #ff4fa3,
    #a855f7,
    #36d9e8
  );
}
```

These values are initial design suggestions and may be refined to achieve a more cohesive interface.

### Design principles

- Avoid generic AI-generated dashboard aesthetics.
- Avoid excessive gradients, glows, and decorative effects.
- Maintain strong visual hierarchy.
- Prioritize typography and spacing.
- Use animations purposefully and sparingly.
- Maintain consistency across all application pages.
- Ensure sufficient contrast between text and backgrounds.
- Avoid visual effects that interfere with reading educational content.

### Intellectual property

Do not claim that the application is officially associated with Rockstar Games.

Prefer original graphic compositions and legally usable visual assets.

If copyrighted images are used, ensure their use is appropriate for the academic project's context.

---

## 7. Responsive Design Standards

Responsive design is one of the central educational and technical requirements of this project.

All pages and components must follow a mobile-first development approach.

### Mandatory rules

1. Write the default CSS for mobile devices.
2. Use `min-width` media queries for larger screens.
3. Prefer `rem` for typography and spacing.
4. Use CSS variables for shared spacing and color values.
5. Prevent horizontal overflow.
6. Ensure images adapt to their containers.
7. Make interactive elements usable on touchscreens.
8. Adapt navigation to smaller screens.

### Example

```css
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 48rem) {
  .container {
    max-width: 48rem;
    margin-inline: auto;
  }
}

@media (min-width: 64rem) {
  .container {
    max-width: 72rem;
  }
}
```

### Mobile navigation

On smaller screens:

- Replace the desktop navigation menu with a menu button.
- Allow the user to open and close the navigation.
- Ensure navigation links remain accessible.
- Prevent the menu from overflowing the viewport.

### Images

Use appropriate responsive image techniques:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Use `width` and `height` attributes in HTML whenever appropriate to reserve image space and prevent layout shifts.

Use `loading="lazy"` for images that are not immediately visible.

Do not lazy-load the primary above-the-fold image when doing so would negatively affect LCP.

---

## 8. Educational Content Requirements

The application must contain the five mandatory technical sections and the final Challenge page specified in the ERS.

Every technical section must contain:

1. A concise explanation understandable to first-semester students.
2. A commented and functional code example.
3. The corresponding guiding question and its answer.
4. References and consulted documentation.

### Mandatory educational sections

**Section 1 — Introduction to Responsiveness**

- Importance of responsive design.
- Viewport meta tag.
- Media queries.
- Differences between screen sizes.

**Section 2 — CSS Units**

- Absolute and relative units.
- px, rem, em, %, fr, vw, vh, dvh, and ch.
- Practical applications of each unit.

**Section 3 — Flexbox and Grid**

- One-dimensional and two-dimensional layouts.
- justify-content.
- align-items.
- flex-wrap.
- gap.
- repeat(auto-fit, minmax()).

**Section 4 — Responsive Images**

- max-width: 100%.
- height: auto.
- HTML width and height attributes.
- loading="lazy".
- aspect-ratio.
- object-fit.
- srcset.

**Section 5 — Vue Best Practices**

- Folder organization.
- Component naming.
- Typed props and events.
- :key in v-for.
- CSS variables and design tokens.
- Core Web Vitals: LCP, INP, and CLS.
- Lazy-loaded routes.

**Final Section — Challenge**

Create an educational challenge that requires the user to apply knowledge acquired from the previous sections.

Do not omit any mandatory topic or guiding question.

The GTA VI theme should provide context and visual identity, not replace the technical educational content.

---

## 9. Interactive Laboratories

At least three functional interactive laboratories are mandatory.

Each laboratory must demonstrate the corresponding technical concept through actual user interaction.

### LAB01 — Responsive Container

The user must be able to change the width of a container using a slider.

Requirements:

- Provide a functional range input.
- Update the container width in real time.
- Display the current width.
- Visually demonstrate the effect of different dimensions.

### LAB02 — CSS Unit Converter

The user must be able to experiment with CSS units.

Requirements:

- Support rem, em, and percentage conversions.
- Display calculated pixel values.
- Explain the reference value used in each calculation.
- Update results when the user changes input values.

Do not present mathematically misleading conversions. Percentage and em calculations must account for their relevant reference context.

### LAB03 — Breakpoint Monitor

Display a fixed indicator showing:

- Current viewport width.
- Active breakpoint.
- Responsive state of the application.

The indicator must update automatically when the browser window is resized.

### Laboratory standards

- All controls must be functional.
- Results must update reactively.
- Use Pinia when state needs to be shared across components.
- Keep calculations separate from presentation where appropriate.
- Provide clear visual feedback.
- Ensure laboratories remain usable on mobile devices.

Additional laboratories may be proposed, but the three mandatory laboratories must be completed first.

---

## 10. Vue Router and Pinia

### Vue Router

Use Vue Router to implement navigation between the application sections.

Requirements:

- Create one route for each educational section.
- Create a route for the homepage.
- Create a route for the final challenge.
- Use meaningful route names and paths.
- Implement lazy loading where appropriate.
- Ensure direct access to application routes works after deployment.

### Pinia

Use Pinia for centralized state management.

Potential responsibilities include:

- Shared laboratory configurations.
- User interface preferences.
- Shared application settings.
- State that needs to persist across multiple components during navigation.

Do not introduce unnecessary global state.

Use local component state for isolated interactions.

---

## 11. API Integration

The project must include functional API consumption, as specified in the ERS.

Before selecting an API:

1. Identify what information the application actually needs.
2. Evaluate whether the API is publicly accessible.
3. Verify its documentation and response format.
4. Check whether authentication is required.
5. Ensure its use is compatible with the project's deployment environment.

The integration must be meaningful and related to the application.

Do not implement fake API requests or hardcode responses while presenting them as real external data.

Handle:

- Loading states.
- Successful responses.
- Errors.
- Empty responses when applicable.

Never expose private API keys, credentials, or secrets in frontend code or public repositories.

If the appropriate API has not been selected, propose suitable options before implementing the integration.

---

## 12. Performance and Accessibility

Performance and accessibility must be considered throughout development.

### Performance

- Avoid unnecessary component re-rendering.
- Optimize images and other static assets.
- Implement route-level lazy loading.
- Avoid unnecessarily large dependencies.
- Prevent layout shifts.
- Use appropriate image dimensions.
- Consider Core Web Vitals.

### Accessibility

- Use semantic HTML.
- Provide descriptive alternative text for meaningful images.
- Maintain sufficient color contrast.
- Ensure keyboard navigation works.
- Provide visible focus states.
- Use accessible labels for form controls.
- Do not communicate information exclusively through color.
- Respect reduced-motion preferences when implementing animations.

---

## 13. Code Quality and Development Rules

The following rules must be respected throughout development.

### General rules

- Do not generate unnecessary files.
- Do not duplicate existing components.
- Do not introduce unused dependencies.
- Do not leave unfinished placeholder implementations.
- Do not use fake functionality to simulate completed features.
- Do not remove existing working functionality without justification.
- Do not overwrite project configuration files without inspecting them first.
- Do not make architectural changes without explaining their purpose.

### Implementation rules

Before modifying existing code:

1. Inspect the relevant files.
2. Understand how the current implementation works.
3. Identify dependencies and possible side effects.
4. Make the smallest reasonable change.
5. Verify that the change works.

After implementation:

1. Check for syntax errors.
2. Check for missing imports.
3. Verify component behavior.
4. Test responsive layouts.
5. Run the production build when appropriate.

Never claim that a feature works without verifying its implementation.

If a requirement cannot be completed, explain the limitation rather than silently omitting it.

---

## 14. Development Workflow

Development must proceed incrementally.

Recommended implementation order:

**Phase 1 — Project Foundation**

- Inspect the development environment.
- Initialize Vue 3 and Vite if necessary.
- Configure Vue Router.
- Configure Pinia.
- Establish the initial folder structure.
- Define the design tokens.

**Phase 2 — Visual Foundation**

- Create the main application layout.
- Establish typography and colors.
- Implement the desktop navigation.
- Implement mobile navigation.
- Create reusable visual components.

**Phase 3 — Educational Pages**

- Implement the homepage.
- Create the five technical sections.
- Add explanations and commented examples.
- Answer all guiding questions.
- Add consulted references.

**Phase 4 — Interactive Laboratories**

- Implement Responsive Container.
- Implement CSS Unit Converter.
- Implement Breakpoint Monitor.
- Verify calculations and interactions.

**Phase 5 — Integration**

- Implement Pinia state management.
- Implement the selected API integration.
- Configure lazy-loaded routes.

**Phase 6 — Final Challenge**

- Implement the Challenge page.
- Create a question based on the educational content.
- Verify that its answer can be obtained using the guide.

**Phase 7 — Testing and Optimization**

- Test mobile layouts.
- Test desktop layouts.
- Verify all navigation routes.
- Verify laboratory functionality.
- Verify API behavior.
- Check accessibility.
- Run the production build.
- Fix identified issues.

**Phase 8 — Deployment and Documentation**

- Prepare the GitHub repository.
- Write the README.
- Configure deployment.
- Verify the published application.
- Capture the application running on a mobile device.

This workflow may be adjusted when necessary, but all mandatory requirements must remain covered.

---

## 15. Agent Communication and Decision-Making

The agent must communicate clearly and transparently throughout development.

When receiving a new development task:

- Identify the relevant requirements.
- Inspect existing implementations.
- Explain the proposed approach when the task involves significant changes.
- Avoid unnecessary implementation complexity.
- Report completed work accurately.
- Identify remaining tasks and known limitations.

When facing ambiguity:

- Do not guess when the decision could affect architecture, functionality, or project scope.
- Present the available alternatives.
- Explain the technical implications.
- Request clarification when necessary.

Do not assume that more code, more libraries, or more visual effects automatically improve the project.

Prioritize correctness, maintainability, and compliance with the ERS.

---

## 16. Final Project Acceptance

The project must not be considered complete until all mandatory acceptance criteria in `docs/ERS.md` have been verified.

The final application must:

- Use Vue 3 and Vite.
- Implement Vue Router.
- Use Pinia.
- Consume a real API.
- Include all five mandatory technical sections.
- Answer all guiding questions.
- Include explanations, commented examples, and references.
- Provide at least three functional interactive laboratories.
- Include the final Challenge page.
- Follow mobile-first responsive design.
- Provide a functional mobile navigation menu.
- Avoid unintended horizontal scrolling and content overflow.
- Be published online.
- Have a GitHub repository with a README.
- Include a screenshot of the application running on a mobile device.

**Final principle:**

Build the application described in the ERS, not an unrelated interpretation of it.

Every technical decision, component, visual element, and interaction must contribute to the project's educational purpose, technical quality, or user experience.