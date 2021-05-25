export const state = () => ({
  isMenu: false
})

export const getters = {
  isMenu: state => state.isMenu ? state.isMenu : false
}

export const mutations = {
  setIsMenu (state, status) {
    state.isMenu = status
  }
}

export const actions = {
  isMenu (context, status) {
    context.commit('setIsMenu', status)
  }
}
