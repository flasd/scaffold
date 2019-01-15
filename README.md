Scaffold
Builds AuthContext, ThemeContext & RouterContext into a app;

### Installation

Install the latest version from NPM with the following command:

```sh
npm install @flasd/scaffold
```

### Usage

To start using the Scaffold functionality, you'll need to wrap your app in it.

```javascript
import Scaffold from "@flasd/scaffold";

export default function App() {
  return (
    <Scaffold
      theme={
        {
          /* theme customization */
        }
      }
    >
      Your components
    </Scaffold>
  );
}
```

Scaffold wraps your app with a ThemeContext, AuthContext and a Router from `react-router-dom`;

Also, it exports a few usefull components and decorators.

#### history

This module is used to control routing using the `react-router-dom` as its context. Check its docs at [this url](https://www.npmjs.com/package/history).

```javascript
import { history } from "@flasd/scaffold";

history.push("/my-route");
```

#### ProtectedRoute

Instrument routes so that they won't show up if the user is not logged-in.

```javascript
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "@flasd/scaffold";

export default function App() {
  return (
    <Switch>
      <ProtectedRoute
        path="/my-route"
        component={MyComponent}
        fallbackPath="/login"
      />
    </Switch>
  );
}

// It has the following prop-types
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  fallbackPath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
```

#### Public Route

Same thing as ProtectedRoute but does the oposite. If it finds 'login' in the url it will redirect the user to a fallback path.

```javascript
import { Switch } from "react-router-dom";
import { PublicRoute } from "@flasd/scaffold";

export default function App() {
  return (
    <Switch>
      <PublicRoute
        path="/login"
        component={Login}
        fallbackPath="/home"
      />
    </Switch>
  );
}

// It has the following prop-types
PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  fallbackPath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
```

#### withAuth

Decorator to inject auth state and functions into a component. The AuthContext manages authentication internaly and exposes two methods to interface with your control: `login()` & `logout()`.

```javascript
import { withAuth } from '@flasd/scaffold';

export function MyComponent(props) {
  const {
     user,
     hasAuth,
     fingerprint,
     login,
     logout,
  } = props;

  return <div>Hello</div>;
}

export default withAuth()(MyComponent);
```

Ok, let's break it down:
##### login
The login function should be called after you authenticated your user with your backend. It spectsa JWT token with a paylaod or just an Object, that follows the following schema:

```typescript
type User = {
  uid: !String,
  name: !String,
  role: !String,
}
```

##### logout

Logs the user out. Simple as that.

##### fingerprint

The first time your app runs on a user machine, we create a fingerprint from he's/she's machine. You can use this to ensure users are not moving tokens around.

##### user & hasAuth

`user` follows the same schema as shown above. `hasAuth` is a boolean.

#### withTheme

Inject theme variables into any component:

```javascript
import { withTheme } from '@flasd/scaffold';

export function MyComponent(props) {
  const {
    mainColor,
    accentColor,
    logoUrl,
    fontFamily,
    baseFontSize,
  } = props;

  return <div>Hello</div>;
}

export default withTheme()(MyComponent);
```
All properties are strings and the defaults are just empty strings. You can overide them globally when you render `<Scafold />` or your can pass a object to `withTheme` with the properties you wish to overide.

### Copyright e Licença

Copyright (c) 2019 [Marcel de Oliveira Coelho](https://github.com/flasd) under the [MIT License](https://github.com/flasd/scaffold/blob/master/LICENSE.md). Go Crazy. :rocket: