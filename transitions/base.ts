import type { TransitionProps } from 'nuxt/dist/app/compat/capi'

export const pageTransition: TransitionProps = {
  duration: 250,
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(_, done) {
    done()
  },
  onLeave(_, done) {
    done()
  },
}
