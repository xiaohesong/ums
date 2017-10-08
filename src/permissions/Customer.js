import Methods from '../until/Store'

var currentPermissions = Methods.store('permissions')
var actions = {
  indexable() {
      return currentPermissions.includes('user-index')
  },

  editable() {
      return currentPermissions.includes('user-edit')
  },

  createable() {
    return currentPermissions.includes('user-create')
  }
}

export default actions
