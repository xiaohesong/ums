import Methods from '../until/Store'

var currentPermissions = Methods.store('permissions')
var actions = {
  indexable() {
      console.log('permissions', currentPermissions)
      return currentPermissions.includes('user-index')
  },

  editable() {
      console.log('permissions', currentPermissions)
      return currentPermissions.includes('user-edit')
  },

  createable() {
    console.log('permissions', currentPermissions)
    return currentPermissions.includes('user-create')
  }
}

export default actions
