export const state = () => ({
  isMenu: false
})

export const getters = {
  isMenu: state => state.isMenu ? state.isMenu : false
}

export const mutations = {
  setIsMenu (state) {
    state.isMenu = !state.isMenu
  }
}

export const actions = {
  isMenu (context, status) {
    context.commit('setIsMenu', status)
  }
}
