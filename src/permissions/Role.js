import Methods from '../until/Store'

var currentPermissions = Methods.store('permissions')
var actions = {
  indexable() {
      return currentPermissions.includes('role-index')
  },

  editable() {
      return currentPermissions.includes('role-edit')
  },

  createable() {
    return currentPermissions.includes('role-create')
  }
}

export default actions
