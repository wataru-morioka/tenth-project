import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Project from './views/Project.vue';
import Member from './views/Member.vue';
import Contact from './views/Contact.vue';
import Jagermeister from './views/Jagermeister.vue';
import Sauza from './views/Sauza.vue';
import Management from './views/Management.vue';
import ManagementAccount from './components/ManagementAccount.vue';
import ManagementUpload from './components/ManagementUpload.vue';
import ManagementContact from './components/ManagementContact.vue';
import Service from './views/Service.vue';
import Webrtc from './views/Webrtc.vue';
import store from './store';
declare let gtag: Function;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
    },
    {
      path: '/home',
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
      component: Management,
      children: [
        {
          path: 'account',
          name: 'management-account',
          component: ManagementAccount,
        },
        {
          path: 'upload',
          name: 'management-upload',
          component: ManagementUpload,
        },
        {
          path: 'contact',
          name: 'management-contact',
          component: ManagementContact,
        },
      ],
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

router.beforeEach((to, from, next) => {
  if (!(from.path.match(/home/) || from.path.match(/jagermeister/) || from.path.match(/sauza/)
   || from.path.match(/about/) || from.path.match(/project/) || from.path.match(/member/) || from.path.match(/contact/)
   || from.path.match(/management/) || from.path.match(/service/) || from.path.match(/webrtc/))
   && (to.path.match(/home/) || to.path.match(/jagermeister/) || to.path.match(/sauza/))) {
    next({
      path: '/',
    });
  }

  if (to.path.match(/management/) || to.path.match(/service/) || to.path.match(/webrtc/)) {
    if (!store.state.isLogin) {
      next({
        path: '/',
      });
    }
  }
  next();
});

export default router;
