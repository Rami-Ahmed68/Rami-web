import Vue from "vue";
import Router from "vue-router";
// import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UpdateAccountViewvue from "../views/UpdateAccountView.vue";
import LoginViewvue from "../views/LoginView.vue";
import DashBordViewvue from "../views/DashBordView.vue";
import ShowWorkView from "../views/ShowWorkView.vue";
import WorksViewvue from "../views/WorksView.vue";
import SkillsViewvue from "../views/SkillsView.vue";
import NotFound from "../views/NotFound.vue";

Vue.useAttrs(Router);

const router = new Router({
  mode : "history",
    routes : [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upaccount',
      name: 'upaccount',
      component : UpdateAccountViewvue
    },
    {
      path : "/login",
      name : "login",
      component : LoginViewvue,
    },
    {
      path : "/dash",
      name : "dash",
      component : DashBordViewvue
    },
    {
      path : "/work/:id",
      name : "work",
      component : ShowWorkView
    },
    {
      path : "/works",
      name : "works",
      component : WorksViewvue
    },
    {
      path : "/skills",
      name : "skills",
      component : SkillsViewvue
    },
    {
      path : "/:pathMatch(.*)*",
      name : "NotFound",
      component : NotFound
    }
  ],
})


// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   mode : "history",
//   routes : [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/upaccount',
//       name: 'upaccount',
//       component : UpdateAccountViewvue
//     },
//     {
//       path : "/login",
//       name : "login",
//       component : LoginViewvue,
//     },
//     {
//       path : "/dash",
//       name : "dash",
//       component : DashBordViewvue
//     },
//     {
//       path : "/work/:id",
//       name : "work",
//       component : ShowWorkView
//     },
//     {
//       path : "/works",
//       name : "works",
//       component : WorksViewvue
//     },
//     {
//       path : "/skills",
//       name : "skills",
//       component : SkillsViewvue
//     },
//     {
//       path : "/:pathMatch(.*)*",
//       name : "NotFound",
//       component : NotFound
//     }
//   ],
// })

export default router
