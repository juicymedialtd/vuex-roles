import rolesModule from './store/roles';

/**
 * Remove an element from the DOM in a Vue-compatible way
 * From: https://stackoverflow.com/a/43543814/11653306
 *
 * @param {HTMLElement} el The element
 * @param {Vue.VNode} vnode The vnode
 */
function removeElement(el, vnode) {
  // replace HTMLElement with comment node
  const comment = document.createComment(' ');
  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined,
  });
  vnode.elm = comment;
  vnode.text = ' ';
  vnode.isComment = true;
  vnode.context = undefined;
  vnode.tag = undefined;
  vnode.data.directives = undefined;

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}

export default {
  install(Vue, { store }) {
    if (!store) {
      throw new Error('Please provide a Vuex store.');
    }

    // Register the module with the store
    store.registerModule('roles', rolesModule);

    /**
     * Add v-role directive
     *
     * Removes an element if the user doesn't have the specified roles
     */
    Vue.directive('role', {
      update(el, roles, vnode) {
        if (roles.value) {
          const rolesArray = roles.value.split('|');
          if (!Vue.prototype.$roles.hasAnyRole(rolesArray)) {
            removeElement(el, vnode);
          }
        } else {
          throw new Error('Please specify a role');
        }
      },
    });

    /**
     * Add v-permission directive
     *
     * Removes an element if the user doesn't have the specified permissions
     */
    Vue.directive('permission', {
      update(el, permissions, vnode) {
        if (permissions.value) {
          const permissionsArray = permissions.value.split('|');
          if (!Vue.prototype.$roles.hasAnyPermission(permissionsArray)) {
            removeElement(el, vnode);
          }
        } else {
          throw new Error('Please specify a permission');
        }
      },
    });

    /**
     * Map Vuex getters and setters to $roles
     */
    Vue.prototype.$roles = {
      getRoles: () => store.getters['roles/getRoles'],
      hasRole: (role) => store.getters['roles/hasRole'](role),
      hasAnyRole: (roles) => store.getters['roles/hasAnyRole'](roles),
      hasAllRoles: (roles) => store.getters['roles/hasAllRoles'](roles),

      getPermissions: () => store.getters['roles/getPermissions'],
      hasPermission: (permission) => store.getters['roles/hasPermission'](permission),
      hasAnyPermission: (permissions) => store.getters['roles/hasAnyPermission'](permissions),
      hasAllPermissions: (permissions) => store.getters['roles/hasAllPermissions'](permissions),

      setRoles: (roles) => store.dispatch('roles/setRoles', roles),
      setPermissions: (permissions) => store.dispatch('roles/setPermissions', permissions),

      addRole: (role) => store.dispatch('roles/addRole', role),
      addPermission: (permission) => store.dispatch('roles/addPermission', permission),
    };
  },
};
