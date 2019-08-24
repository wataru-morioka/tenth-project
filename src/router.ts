import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Project from './views/Project.vue';
import Member from './views/Member.vue';
import Contact from './views/Contact.vue';
import Jagermeister from './views/Jagermeister.vue';
import Sauza from './views/Sauza.vue';
import Management from './views/Management.vue';
import Service from './views/Service.vue';
import Webrtc from './views/Webrtc.vue';
declare let gtag: Function;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/jagermeister',
      name: 'jagermeister',
      component: Jagermeister,
    },
    {
      path: '/sauza',
      name: 'sauza',
      component: Sauza,
    },
    {
      path: '/management',
      name: 'management',
      component: Management,
    },
    {
      path: '/service',
      name: 'service',
      component: Service,
    },
    {
      path: '/webrtc',
      name: 'webrtc',
      component: Webrtc,
    },
  ],
});

router.afterEach((to, from) => {
  if ('gtag' in window) {
    gtag('config', 'UA-145135127-1', {'page_path': to.path});
  }
});

export default router;

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },
//   ],
//   // router.afterEach((to, from) => {
//   //   // to and from are both route objects.
//   // })
// });
