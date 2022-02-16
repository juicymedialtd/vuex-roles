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
import Permissions from 'vuex-permissions';

// Register the plugin, passing the store is required
Vue.use(Permissions, { store });

// Create our Vue instance
const app = new Vue({
  el: '#app',
  store,
});

// Register some roles and permissions
app.$permissions.setRoles(['admin']);
app.$permissions.setPermissions(['users.create', 'users.delete']);
```

#### Directives

#### Methods
