## Gemini Added Memories
- Svelte Project Rules:
- Svelte 5
- Use TypeScript, not JavaScript.
- Add appropriate TypeScript types and interfaces
- You MUST import all methods, classes and types used in the code you generate.
- Use ES modules format exclusively - never commons. You may need to set '"type": "module" in package. json , - When using Node. js:
- use built in '--experimental-strip-types" instead of 'ts-node' or 'tsx' to run typescript
- use built in '--env-file instead of the doten package , - when writing CSS
- prefer CSS grid over flexbox when both make sense for the layout
- use position: absolute; sparingly - prefer modern layout techniques..•
- use modern CSS Features such as nesting, custom properties, container queries, subgrid and color functions
- Use 'fetch() over axios - assume full support with no polyfills needed
- for web servers, use frameworks with standard Web Request + Response - NEVER express.
- use the latest version of all libraries
- when tailwind code is requested, use Tailwind v4 - NEVER v3
- Use Biome over ESlint and Prettier unless otherwise
- Include proper error handling and logging
- Include comments explaining complex logic
- When needed, use Vite as a build tool
- prefer function declarations over function expressions
- Use pointer events over touch or mouse events
- You may use Modern HTML features such as Dialog and​​​ Popover​
- Always use Tailwind 4, never Tailwind 3 when using Tailwind
- Always use `onClick`, never `on:click` in Svelte projects

See [PLANNING.md](./PLANNING.md)