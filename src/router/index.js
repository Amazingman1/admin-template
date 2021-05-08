import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/add-news-paper',
    component: Layout,
    redirect: '/commo-page/add-news-paper',
    name: '新增报件',
    meta: {
      title: '新增报件',
      icon: 'nested'
    },
    // hidden: true,
    children: [
      {
        path: 'addpaper',
        name: '新增报件',
        component: () => import('@/views/commo-page/add-news-paper'),
        meta: { title: '新增报件', icon: 'dashboard' }
      },
      {
        path: 'add-form-paper',
        name: '新增报件表单',
        component: () => import('@/views/commo-page/add-form-paper'),
        meta: { title: '新增报件表单', icon: 'dashboard' }
      }

    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    redirect: '/system-manage/user-manage',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'role-manage',
        name: '角色管理',
        component: () => import('@/views/system-manage/role-manage'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'company-manage',
        name: '机构与用户',
        component: () => import('@/views/system-manage/company-manage/index'),
        meta: { title: '机构与用户', icon: 'form' }
      },
      {
        path: 'system-options',
        name: '系统参数',
        component: () => import('@/views/system-manage/system-options/index'),
        meta: { title: '系统参数', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
