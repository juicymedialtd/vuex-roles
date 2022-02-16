// initial state
const state = {
  roles: [],
  permissions: [],
};

// getters
const getters = {
  getRoles: (s) => s.roles,
  getPermissions: (s) => s.permissions,

  hasRole: (s) => (role) => s.roles.includes(role),
  hasAnyRole: (s) => (roles) => s.roles.some((r) => roles.includes(r)),
  hasAllRoles: (s) => (roles) => roles.every((r) => s.roles.includes(r)),

  hasPermission: (s) => (permission) => s.permissions.includes(permission),
  hasAnyPermission: (s) => (permissions) => s.permissions.some((r) => permissions.includes(r)),
  hasAllPermissions: (s) => (permissions) => permissions.every((r) => s.permissions.includes(r)),
};

// actions
const actions = {
  setRoles(context, payload) {
    context.commit('setRoles', payload);
  },
  setPermissions(context, payload) {
    context.commit('setPermissions', payload);
  },
  addRole(context, payload) {
    context.commit('addRole', payload);
  },
  addPermission(context, payload) {
    context.commit('addPermission', payload);
  },
};

// mutations
const mutations = {
  setRoles(s, payload) {
    s.roles = payload;
  },
  setPermissions(s, payload) {
    s.permissions = payload;
  },
  addRole(s, payload) {
    s.roles.push(payload);
  },
  addPermission(s, payload) {
    s.permissions.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
