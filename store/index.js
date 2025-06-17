import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    // 可以有多个持久化实例
    createPersistedState({
      key: 'app_config_data', // 状态保存到本地的 key
      paths: ['hasLogin', 'userInfo', 'cookie', 'currentRole'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
      storage: {
        // 存储方式定义
        getItem: (key) => uni.getStorageSync(key), // 获取
        setItem: (key, value) => uni.setStorageSync(key, value), // 存储
        removeItem: (key) => uni.removeStorageSync(key) // 删除
      }
    })
  ],
  state: {
    hasLogin: false,
    userInfo: {
      token: ''
    },
    lang: 'zh-cn',
    cookie: '',
    role: 1,
    tabsConfig: {}
  },
  getters: {
    currentTabs: (state) => state.tabsConfig[state.role]
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role
      console.log('当前角色', role)
      uni.setStorage({
        //缓存用户信息
        key: 'currentRole',
        data: role
      })

      if (role == 1) {
        uni.switchTab({
          url: '/pages/category/category'
        })
      } else if (role == 2) {
        uni.switchTab({
          url: '/pages/order/peihuo'
        })
      } else if (role == 3) {
        uni.switchTab({
          url: '/pages/order/driver'
        })
      }
    },
    SET_USER(state, user) {
      state.hasLogin = true
      state.userInfo = user
      uni.setStorage({
        key: 'userInfo',
        data: user
      })
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = {}
      uni.removeStorage({
        key: 'userInfo'
      })
    },
    setUserInfo(state, provider) {
      state.userInfo = provider
      uni.setStorage({
        //缓存用户信息
        key: 'userInfo',
        data: provider
      })
    },
    setCookie(state, provider) {
      state.cookie = provider
      uni.setStorage({
        key: 'cookieKey',
        data: provider
      })
    }
  },
  actions: {
    userLogin({ commit }, data) {
      console.log(123)
      const role = data.group_id || 1

      commit('SET_USER', data)
      commit('SET_ROLE', role)
    }
  }
})

export default store
