import Methods from '../until/Store'

var currentPermissions = Methods.store('permissions')
var actions = {
  indexable() {
      console.log('permissions', currentPermissions)
      return currentPermissions.includes('role-index')
  },

  editable() {
      console.log('permissions', currentPermissions)
      return currentPermissions.includes('role-edit')
  },

  createable() {
    console.log('permissions', currentPermissions)
    return currentPermissions.includes('role-create')
  }
}

export default actions
