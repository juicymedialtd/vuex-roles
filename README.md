# Vuex Roles and Permissions

A simple Vuex plugin for managing user roles and permissions.

## Installation
### NPM
`npm i vuex-roles`

## Usage
### Usage with Vue 2
```js
// Import Vue and your Vuex store
import Vue from 'vue'; 
import store from './store';
import Roles from 'vuex-roles';

// Register the plugin, passing the store is required
Vue.use(Roles, { store });

// Create our Vue instance
const app = new Vue({
  el: '#app',
  store,
});

// Register some roles and permissions
app.$roles.setRoles(['admin']);
app.$roles.setPermissions(['users.create', 'users.delete']);
```

#### Directives

#### Methods
