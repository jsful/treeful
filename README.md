# Webpack Boilerplate v2.1.0

This is a boilerplate that utilizes Webpack with React and Redux. The purpose is to have a light base template that has only necessary modules. The modules included in this boilerplate are:

* Dev server with express (http://expressjs.com)
* Hot module replacement with webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware)
* Data flow with react-redux (https://github.com/rackt/react-redux)
* Routing with react-router-redux (https://github.com/rackt/react-router-redux)
* Animation with velocity-react (https://github.com/twitter-fabric/velocity-react)
* Device detection with mobile-detect (https://github.com/hgoebl/mobile-detect.js)
* Redux devtool with a chrome extension (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* Code linting with eslint (http://eslint.org)

### How to use

Clone repository

```sh
$ git clone git@github.com:justinjung90/webpack-boilerplate.git
```

Install modules and run dev server

```sh
$ npm install
$ npm start
```

Build

```sh
$ npm run build
```

### Optimization

In order to optimize javascript for adaptive websites, it was necessary to dynamically load javascript depending on the detected device. It is done by dynamically adding a script tag. `device.js` imports `mobile-detect` to determine the device from front-end, and creates a script tag with a javascript source that is relevant. Please refer to `device.js` for details.

### Inheritance

For components that will have different views for different devices, we can utilize class inheritance to keep the common logic in parent class and to make appropriate views in child classes. States and methods from the parent are inherited to children, and they can be easily extended and overridden. Please refer to `header.js`, `header-desktop.js` and `header-mobile.js` for details.

# Modules

This section contains modules that have been used in previous projects. Tricky examples for each module are documented.

# react-redux

https://github.com/rackt/react-redux

### Mapping states and actions in a component

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as global from '../../redux/action-global';

class Home extends Component {
    ...
}

export default connect(
    (state) => {
        return {
            count: state.count
        };
    },
    (dispatch) => {
        return {
            increaseCount: () => dispatch(global.increaseCount),
            decreaseCount: () => dispatch(global.decreaseCount)
        };
    }
)(Home);
```

`connect` function from react-redux returns a function with state-mapping logic, and takes a React element as the function's parameter to re-render the component when state has changed. Similar has been done to map actions to a component. Thus, you should call the function to components that will be mounted only (ie. you should not call connect function to a parent component and expect child components to share same states and actions).

# react-router-redux

https://github.com/rackt/react-router-redux

### Getting url and navigating pages programatically

Current url can be read from `state.routing.location.pathname`. Navigating pages programatically requires routeActions from react-redux-router.

```javascript
import { routeActions } from 'react-router-redux';

class HeaderDesktop extends Header {
    ...
}

export default connect(
    (state) => {
        return {
            url: state.routing.location.pathname
        };
    },
    (dispatch) => {
        return {
            goToHome: () => dispatch(routeActions.push('/')),
            goBackOnce: () => dispatch(routeActions.goBack()),
            goBackTwice: () => dispatch(routeActions.go(-2))
        };
    }
)(HeaderDesktop);
```

# velocity-react

https://github.com/twitter-fabric/velocity-react

### VelocityComponent

Component to add animations to an element and its children. Must wrap a single element only.

```javascript
import { VelocityComponent } from 'velocity-react';

this.fadeAwayAnimation = {
    duration: 500,
    delay: 500,
    easing: 'ease',
    animation: {
        opacity: [0, 1], // [{to}, {from}]
    }
};
...
<VelocityComponent {...this.fadeAwayAnimation}>
    <div className='element'>
        <div className='child-element'></div>
        <div className='child-element'></div>
    </div>
</VelocityComponent>
```

### VelocityTransitionGroup

Add enter and leave animations to an element when mounting and unmounting respectively. Useful for creating page transitions.

```javascript
import { VelocityTransitionGroup } from 'velocity-react';

this.enterAnimation = {
    duration: 500,
    delay: 500,
    easing: 'ease',
    animation: {
        opacity: [1, 0],  // [{to}, {from}]
        translateY: [0, '5%']
    }
};
this.leaveAnimation = {
    duration: 500,
    easing: 'ease',
    animation: {
        opacity: [0, 1],
        translateY: ['5%', 0]
    }
};
...
<VelocityTransitionGroup enter={this.enterAnimation} leave={this.leaveAnimation}>
    // here, you must pass a unique key for each child as a property. `this.props.location.pathname` is a good example of a unique key
    // you can also pass extra properties to children
    {React.cloneElement(this.props.children, {key: this.props.location.pathname, extraProp: 'extraProp'})}
</VelocityTransitionGroup>
```

# Redux devtool - chrome extension

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

Redux has an awesome devtool that makes state view and management easier. The awesome devtool should be usable for both desktop mode and mobile mode in a browser, and thus an option of using chrome extension was chosen. You may click the extension icon to open the window, or open chrome's devtool and search for the tab 'Redux'. In the project, it's been linked to Redux devtool with the following code: 

```javascript
const createDevStore = compose(applyMiddleware(reduxRouterMiddleware), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f)(createStore);
```