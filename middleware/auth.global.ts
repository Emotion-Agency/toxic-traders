export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { isAuthenticated, checkAuth } = useAuth()

    checkAuth()

    if (to.path.startsWith('/auth') && isAuthenticated.value) {
      return navigateTo('/', {
        external: true,
      })
    }

    if (!isAuthenticated.value && !to.path.startsWith('/auth')) {
      return navigateTo('/auth/login', {
        external: true,
      })
    }
  }
})
