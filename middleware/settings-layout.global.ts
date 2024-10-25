export default defineNuxtRouteMiddleware(to => {
  if (to.path.includes('settings')) {
    setPageLayout('settings')
  } else {
    return
  }
})
