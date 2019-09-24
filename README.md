# Corporate Event Planner

### Style Guide

- 2 spaces for indentation for JS and CSS (Prettier extension)
- Components should be written in PascalCase.
- Functional components will be written by default. If state is required, use use React hooks instead of writing class components. Because the app's component tree hierarchy isn't overly complex, manage state without Redux or useReducer in order to focus on building app features. Props will either be passed down from parent to child as normal or with the help of the Context API.
