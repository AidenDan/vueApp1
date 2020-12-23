import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import Users from "../components/users/Users";
import Rights from "../components/right/Rights";
import Roles from "../components/right/Roles";
import Goods from "../components/goods/Goods";
import Params from "../components/goods/Params";
import Categories from "../components/goods/Categories";
import Orders from "../components/orders/Orders";
import Reports from "../components/reports/Reports";

Vue.use(Router)

const router = new Router({
  routes: [
    // 指定路由规则，当用户访问/login时，用Login组件来显示
    {
      path: "/login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    // 重定向
    {
      path: "/",
      redirect: "/login"
    },
    // 路由到Home组件
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "/welcome",
          component: Welcome,
          meta: {
            title: "欢迎"
          }
        },
        {
          path: "/users",
          component: Users,
          meta: {
            title: "用户"
          }
        },
        {
          path: "/rights",
          component: Rights,
          meta: {
            title: "权限"
          }
        },
        {
          path: "/roles",
          component: Roles,
          meta: {
            title: "角色"
          }
        },
        {
          path: "/goods",
          component: Goods,
          meta: {
            title: "商品列表"
          }
        },
        {
          path: "/params",
          component: Params,
          meta: {
            title: "分类参数"
          }
        },
        {
          path: "/categories",
          component: Categories,
          meta: {
            title: "商品分类"
          }
        },
        {
          path: "/orders",
          component: Orders,
          meta: {
            title: "订单管理"
          }
        },
        {
          path: "/reports",
          component: Reports,
          meta: {
            title: "订单管理"
          }
        }
      ],
      redirect: "/welcome",
      meta: {
        title: "主页"
      }
    }
  ]
});
export default router

// 路由导航守卫控制登录权限
router.beforeEach((to, from, next) => {
  // 导航卫士设置title
  // window.document.title = to.matched[0].meta.title;
  // 如果访问的登录页面，那么就直接放行
  if (to.path === "/login") {
    // next()表示直接放行
    return next();
  }
  // 如果访问的页面不是登录页面，就要判断是否已经登陆过，否则强制转到登录页面
  // 如果登陆过，那么token不为null
  let token = window.sessionStorage.getItem("token");
  if (token) {
    return next();
  } else {
    // next("/login")表示强制跳转
    return next("/login");
  }
});
router.mode = 'history';

