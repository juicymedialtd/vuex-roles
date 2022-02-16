import permissionsModule from './store/permissions';

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
    store.registerModule('permissions', permissionsModule);

    /**
     * Add v-permission directive
     *
     * Removes an element if the user doesn't have the specified permissions
     */
    Vue.directive('permission', {
      update(el, permissions, vnode) {
        if (permissions.value) {
          const permissionsArray = permissions.value.split('|');
          if (!Vue.prototype.$permissions.hasAnyPermission(permissionsArray)) {
            removeElement(el, vnode);
          }
        } else {
          throw new Error('Please specify a permission');
        }
      },
    });

    /**
     * Add v-role directive
     *
     * Removes an element if the user doesn't have the specified roles
     */
    Vue.directive('role', {
      update(el, roles, vnode) {
        if (roles.value) {
          const rolesArray = roles.value.split('|');
          if (!Vue.prototype.$permissions.hasAnyRole(rolesArray)) {
            removeElement(el, vnode);
          }
        } else {
          throw new Error('Please specify a role');
        }
      },
    });

    /**
     * Map Vuex getters and setters to $permissions
     */
    Vue.prototype.$permissions = {
      getRoles: () => store.getters['permissions/getRoles'],
      hasRole: (role) => store.getters['permissions/hasRole'](role),
      hasAnyRole: (roles) => store.getters['permissions/hasAnyRole'](roles),
      hasAllRoles: (roles) => store.getters['permissions/hasAllRoles'](roles),

      getPermissions: () => store.getters['permissions/getPermissions'],
      hasPermission: (permission) => store.getters['permissions/hasPermission'](permission),
      hasAnyPermission: (permissions) => store.getters['permissions/hasAnyPermission'](permissions),
      hasAllPermissions: (permissions) => store.getters['permissions/hasAllPermissions'](permissions),

      setRoles: (roles) => store.dispatch('permissions/setRoles', roles),
      setPermissions: (permissions) => store.dispatch('permissions/setPermissions', permissions),

      addRole: (role) => store.dispatch('permissions/addRole', role),
      addPermission: (permission) => store.dispatch('permissions/addPermission', permission),
    };
  },
};
