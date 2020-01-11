export default [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./views/test.vue')
  }
]