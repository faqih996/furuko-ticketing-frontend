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
    token: () => Cookies.get('token') || null,
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      this.loading = true

      try {
        const response = await axiosInstance.post('/login', credentials)

        const token = response.data.data.token

        Cookies.set('token', token)

        this.success = response.data.message

        if (response.data.data.user.role === 'admin') {
          router.push({ name: 'admin.dashboard' })
        } else {
          router.push({ name: 'app.dashboard' })
        }

      } catch (error) {
        this.error = handleError(error)
      } finally {
        this.loading = false
      }
    },
  }

});
