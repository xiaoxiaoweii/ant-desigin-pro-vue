import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NotFound from "../views/404";
import Forbidden from "../views/403";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "../utils/auth";
Vue.use(VueRouter);

const routes = [
  // 用户登录和注册页
  {
    path: "/user",
    hideInMenu: true, //是否在显示在侧边菜单
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"), // 异步加载
    children: [
      {
        path: "/user",
        redirect: "/user/login" //访问login重定向到登录页
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue") // 异步加载
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: {
      // user和admin都可以访问
      authority: ["user", "admin"]
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"), // 异步加载
    children: [
      // 仪表盘 dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘"
        },
        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {
              title: "分析页"
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */
                "../views/Dashboard/Analysis"
              ) // 异步加载
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        meta: {
          icon: "form",
          title: "表单",
          // 只允许admin访问
          authority: ["admin"]
        },
        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: {
              title: "基础表单"
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm") // 异步加载
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: {
              title: "分步表单"
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"), // 异步加载
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "../views/Forms/StepForm/Step1"
                  ) // 异步加载
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "../views/Forms/StepForm/Step2"
                  ) // 异步加载
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */
                    "../views/Forms/StepForm/Step3"
                  ) // 异步加载
              }
            ]
          }
        ]
      }
    ]
  },
  // 404
  {
    path: "*",
    name: "404",
    hideInMenu: true, //是否显示在侧边菜单
    component: NotFound
  },
  // 403
  {
    path: "*",
    name: "403",
    hideInMenu: true, //是否显示在侧边菜单
    component: Forbidden
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 路由守卫 使用nprogress
router.beforeEach((to, from, next) => {
  // 只有路由变化才会显示progress
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  // 判断是否有用户 用户是否有权限
  if (record && !check(record.meta.authority)) {
    // 判断是否登录 当前不在登录页
    if (!isLogin() && to.path !== "/user/login") {
      // 没登录 直接跳到登录页
      next({
        path: "/user/login"
      });
      // 已经登录 用户没有权限  并且当前不在403页面
    } else if (to.path !== "/403") {
      // 已经登录 跳到403页面 弹出错误提示
      notification.error({
        message: "403",
        description: "你没有权限访问,请联系管理员咨询"
      });
      next({
        path: "/403"
      });
    }
    // 不会进入afterEach 所以需要将nprogress重置
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
