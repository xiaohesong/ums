import Methods from '../until/Store'

var currentPermissions = Methods.store('permissions')
var actions = {
  customerIndexable() {
      return currentPermissions.includes('user-index')
  },

  roleIndexable() {
      return currentPermissions.includes('role-index')
  }
}

export default actions
