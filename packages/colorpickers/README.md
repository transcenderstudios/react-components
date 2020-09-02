# @zendeskgarden/react-colorpickers [![npm version](https://flat.badgen.net/npm/v/@zendeskgarden/react-colorpickers)](https://www.npmjs.com/package/@zendeskgarden/react-colorpickers)

This package includes components related to colorpickers in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/react-colorpickers

# Peer Dependencies - Also Required
npm install react react-dom prop-types styled-components @zendeskgarden/react-theming
```

## Usage

```jsx static
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Example } from '@zendeskgarden/react-colorpickers';

/**
 * Place a `ThemeProvider` at the root of your React application
 */
<ThemeProvider>
  <Example>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi...</Example>
</ThemeProvider>;
```

<!--
  TODO:

  * [ ] Add colorpickers to root README table.
  * [ ] Add colorpickers to demo `index.html`.
  * [ ] Add colorpickers to `styleguide.base.config.js` webpack globals.
  * [ ] Delete this comment block.
-->
