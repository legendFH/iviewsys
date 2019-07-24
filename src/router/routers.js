import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
 /* {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },*/
  {
    path: '/zhuyuanview',
    name: 'zhuyuanview',
    meta: {
      icon: 'md-home',
      title: '住院管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1a',
        name: 'level_2_1a',
        meta: {
          icon: 'md-funnel',
          title: '入院管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-1.vue')
      },
      {
        path: 'level_2_2a',
        name: 'level_2_2a',
        meta: {
          icon: 'md-funnel',
          title: '病房管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-2.vue')
      },
      {
        path: 'level_2_3a',
        name: 'level_2_3a',
        meta: {
          icon: 'md-funnel',
          title: '计费管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-3.vue')
      },
      {
        path: 'level_2_4a',
        name: 'level_2_4a',
        meta: {
          icon: 'md-funnel',
          title: '统计制表'
        },
        component: () => import('@/view/zhuyuanview/level-2-4.vue')
      },
      {
        path: 'level_2_5a',
        name: 'level_2_5a',
        meta: {
          icon: 'md-funnel',
          title: '收费标准管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-5.vue')
      },
      {
        path: 'level_2_6a',
        name: 'level_2_6a',
        meta: {
          icon: 'md-funnel',
          title: '出院管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-6.vue')
      },
      {
        path: 'level_2_7a',
        name: 'level_2_7a',
        meta: {
          icon: 'md-funnel',
          title: '已出院病人资料管理'
        },
        component: () => import('@/view/zhuyuanview/level-2-7.vue')
      },
      {
        path: 'hospitalization-list',
        name: 'hospitalization-list',
        component: () => import('@/view/zhuyuanview/hospitalization-list'),
        meta: {title: '入院检索', icon: 'md-funnel',noCache: true},
        hidden: true
      },
    ]

  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-thermometer',
      title: '门诊管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1b',
        name: 'level_2_1b',
        meta: {
          icon: 'md-funnel',
          title: '挂号'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_1b',
        name: 'level_1b',
        meta: {
          icon: 'md-funnel',
          title: '计价收费'
        },
        component: () => import('@/view/multilevel/level-1.vue')
      },
      {
        path: 'level_2_3b',
        name: 'level_2_3b',
        meta: {
          icon: 'md-funnel',
          title: '医疗卡管理'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      },
      {
        path: 'level_2_2b',
        name: 'level_2_2b',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '其他管理系统'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1b',
            name: 'level_2_2_1b',
            meta: {
              icon: 'md-funnel',
              title: '门诊项目'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          },
          {
            path: 'level_2_2_2b',
            name: 'level_2_2_2b',
            meta: {
              icon: 'md-funnel',
              title: '医生科室'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-2.vue')
          },
          {
            path: 'level_2_2_3b',
            name: 'level_2_2_3b',
            meta: {
              icon: 'md-funnel',
              title: '检查项目'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-3.vue')
          }
        ]
      },

    ]
  },
  {
    path: '/zhongxiyaofangview',
    name: 'zhongxiyaofangview',
    meta: {
      icon: 'md-search',
      title: '中西药房管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1c',
        name: 'level_2_1c',
        meta: {
          icon: 'md-funnel',
          title: '入库管理'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-1.vue')
      },
      {
        path: 'level_2_2c',
        name: 'level_2_2c',
        meta: {
          icon: 'md-funnel',
          title: '出库管理'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-2.vue')
      },
      {
        path: 'level_2_3c',
        name: 'level_2_3c',
        meta: {
          icon: 'md-funnel',
          title: '医疗卡管理'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-3.vue')
      },
      {
        path: 'level_2_4c',
        name: 'level_2_4c',
        meta: {
          icon: 'md-funnel',
          title: '调价处理'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-4.vue')
      },
      {
        path: 'level_2_5c',
        name: 'level_2_5c',
        meta: {
          icon: 'md-funnel',
          title: '进入库情况查询'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-5.vue')
      },
      {
        path: 'level_2_6c',
        name: 'level_2_6c',
        meta: {
          icon: 'md-funnel',
          title: '统计制表'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-6.vue')
      },
      {
        path: 'level_2_7c',
        name: 'level_2_7c',
        meta: {
          icon: 'md-funnel',
          title: '供应商编码处理'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-7.vue')
      },
      {
        path: 'level_2_8c',
        name: 'level_2_8c',
        meta: {
          icon: 'md-funnel',
          title: '部门编码'
        },
        component: () => import('@/view/zhongxiyaofangview/level-2-8.vue')
      },
    ]

  },
  {
    path: '/binganview',
    name: 'binganview',
    meta: {
      icon: 'md-book',
      title: '病案管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1d',
        name: 'level_2_1d',
        meta: {
          icon: 'md-funnel',
          title: '国际疾病编码'
        },
        component: () => import('@/view/binganview/level-2-1.vue')
      },
      {
        path: 'level_2_2d',
        name: 'level_2_2d',
        meta: {
          icon: 'md-funnel',
          title: '病案'
        },
        component: () => import('@/view/binganview/level-2-2.vue')
      },
      {
        path: 'level_2_3d',
        name: 'level_2_3d',
        meta: {
          icon: 'md-funnel',
          title: '手术情况'
        },
        component: () => import('@/view/binganview/level-2-3.vue')
      },
      {
        path: 'level_2_4d',
        name: 'level_2_4d',
        meta: {
          icon: 'md-funnel',
          title: '病历'
        },
        component: () => import('@/view/binganview/level-2-4.vue')
      },

    ]

  },
  {
    path: '/renshiview',
    name: 'renshiview',
    meta: {
      icon: 'md-person',
      title: '人事管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1e',
        name: 'level_2_1e',
        meta: {
          icon: 'md-funnel',
          title: '人事基本资料表'
        },
        component: () => import('@/view/renshiview/level-2-1.vue')
      },
      {
        path: 'level_2_2e',
        name: 'level_2_2e',
        meta: {
          icon: 'md-funnel',
          title: '家庭主要成员与社会关系'
        },
        component: () => import('@/view/renshiview/level-2-2.vue')
      },

    ]

  },
  {
    path: '/sysmanview',
    name: 'sysmanview',
    meta: {
      icon: 'md-menu',
      title: '系统管理子系统'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1f',
        name: 'level_2_1f',
        meta: {
          icon: 'md-funnel',
          title: '用户权限管理'
        },
        component: () => import('@/view/sysmanview/level-2-1.vue')
      },
      {
        path: 'level_2_2f',
        name: 'level_2_2f',
        meta: {
          icon: 'md-funnel',
          title: '系统参数'
        },
        component: () => import('@/view/sysmanview/level-2-2.vue')
      },
      {
        path: 'level_2_3f',
        name: 'level_2_3f',
        meta: {
          icon: 'md-funnel',
          title: '就医人员'
        },
        component: () => import('@/view/sysmanview/level-2-3.vue')
      },
      {
        path: 'level_2_4f',
        name: 'level_2_4f',
        meta: {
          icon: 'md-funnel',
          title: '收费类型代码表'
        },
        component: () => import('@/view/sysmanview/level-2-4.vue')
      },
    ]

  },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
