import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    success: null,
  }),

  getters: {
    token: () => Cookies.get('token'),
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      this.loading = true

      try {
        const response = await axiosInstance.post('/login', credentials)

        const token = response.data.data.token

        Cookies.set('token', token)

        this.user = response.data.data.user

        this.success = response.data.message

        console.log(response.data.data.user.role)

        if (response.data.data.user.role === 'admin') {
          await router.push({ name: 'admin.dashboard' })
        } else {
          await router.push({ name: 'app.dashboard' })
        }

      } catch (error) {
        console.log(error)

        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        const response = await axiosInstance.post('/logout')

        Cookies.remove('token')

        this.user = null
        this.error = null

        this.success = response.data.message

        router.push({ name: 'login' })
      } catch (error) {
        console.log(error)

        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async register() { },

    async checkAuth() { }
  }

});
