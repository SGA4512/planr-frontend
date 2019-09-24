# Corporate Event Planner

### Style

- 2 spaces for indentation for JS and CSS (Prettier extension)
- Components should be written in PascalCase.
- Functional components will be written by default. If state is required, use use React hooks instead of writing class components. Because the app's component tree hierarchy isn't overly complex, manage state without Redux or useReducer in order to focus on building app features. Props will either be passed down from parent to child as normal or with the help of the Context API.
- Functional components will be declared with variable names and exported as follows:
  ```
  const ComponentName = props => {
      return (//JSX)
  }
  export default ComponentName
  ```
- Generally, attempt to destructure props as follows:

  ```
  // in parent file reference child component
  <ComponentName {...props} />
  ```

  ```
  const ComponentName = props => {
      const {varOne, varTwo, varThree} = props

      return (
          <h1>varOne</h1>
          <p>`${varTwo} and ${varThree}`</p>
      )
  }
  ```
