export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    return
  }

  const { checkAuth, isAuthenticated } = useAuth()

  checkAuth()

  const nuxtApp = useNuxtApp()

  const isExternal =
    import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered

  if (to.path.startsWith('/auth') && isAuthenticated.value) {
    return navigateTo('/', {
      external: isExternal,
    })
  }

  if (!to.path.startsWith('/auth') && !isAuthenticated.value) {
    return navigateTo('/auth/login', {
      external: isExternal,
    })
  }
})
