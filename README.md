# lukkari-app
A timetable React Native Android mobile application for Aalto University's students.

Currently application contains counter functionality. This is implemented to help React Native beginners understand how React Native, Redux, Redux Saga, ImmutableJS and Chai work. Router wasn't added yet, because I wasn't sure which implementation is the best.

## Pre-install checklist
* [Install everythin needed for React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)
* Install Android emulator. Good option is [Genymotion](http://facebook.github.io/react-native/docs/android-setup.html#install-genymotion)
* Make sure that your NPM's version is higher than 2.X. `npm --version` will print out version. Should be something like 3.5.4


## Setup development environment
* Git clone this project
* Run `npm install`
* Add local.properties file in project android folder's root path.
```
sdk.dir=<path/to/android-sdk>
```

## Run project
`react-native run-android`

## Run tests
`npm run test`

## Problems?
#### Packages missing (IF Symbol, see next chapter)
NPM is good, but sometimes somethings strange happens and it hasn't loaded all the packages or it can't handle them properly. To fix this remove node_modules in root folder with:  
* `rm -rf node_modules`
* `npm install`

#### Error msg: Can't find variable Symbol
React Native doesn't support [ES6 Symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) in Android. With iOS it works. When you start the application and see error msg "Can't find variable symbol" click the first file in error msg. This should open the file in your text editor. When the file is open add `var Symbol = require('es6-symbol');` after `use strict`. This Polyfills Symbol functionality into Redux Saga. Repeat this procedure until every file that uses Symbol contains Polyfill import.

## Application structure
```
.
├── README.md
├── android
│   ├── build.gradle
|   ...
│   ├── local.properties
│   └── settings.gradle
├── index.android.js
├── index.ios.js
├── ios
│   ├── mspApp
│   ├── mspApp.xcodeproj
│   └── mspAppTests
├── package.json
├── src
│   ├── components
│   ├── middleware
│   ├── sagas
│   ├── services
│   ├── state
│   ├── utils
│   └── views
└── test
    ├── counter
    └── test.helper.js
```
## Other

#### ImmutableJS
Let's keep data immutable. This will remove problems that mutable data can cause. Immutable always returns new object or list instead of mutating the existing one.

#### Redux Saga
We will use async functionality in the future. Saga's role is to help with async processes.


### Material:
* [react-native](https://github.com/facebook/react-native)
* [redux](https://github.com/rackt/redux)
* [react-redux](https://github.com/rackt/react-redux)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [immutableJS](https://github.com/facebook/immutable-js)
* [Blog post: Redux, React, and Immutable setup and testing](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
