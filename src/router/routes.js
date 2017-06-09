import Home from '@/pages/Home'
import Projekty from '@/pages/Projekty'
import Preklad from '@/pages/Preklad'
// import Stream from '@/pages/Stream'
import Podcast from '@/pages/Podcast'
import Tym from '@/pages/Tym'
import About from '@/pages/About'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Bio-senpai',
      navHidden: true
    }
  },
  {
    path: '/projekty',
    name: 'Projekty',
    component: Projekty,
    meta: {
      title: 'Projekty | Bio-senpai',
      icon: 'flask'
    }
  },
  {
    path: '/projekty/:anime',
    name: 'Překlad',
    component: Preklad,
    meta: {
      title: 'Překlad | Bio-senpai',
      navHidden: true
    }
  },
  {
    path: '/stream/:anime/:episode?',
    name: 'Stream',
    component: Preklad,
    meta: {
      title: 'Stream | Bio-senpai',
      navHidden: true
    }
  },
  {
    path: '/navrhy',
    name: 'Návrhy',
    component: Home,
    meta: {
      title: 'Návrhy | Bio-senpai',
      icon: 'star',
      navHidden: true
    }
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: Podcast,
    meta: {
      title: 'Yoimiru | Bio-senpai',
      icon: 'radio',
      navHidden: true
    }
  },
  {
    path: '/tym',
    name: 'Tým',
    component: Tym,
    meta: {
      title: 'Tým | Bio-senpai',
      icon: 'account-multiple'
    }
  },
  {
    path: '/prihlaska',
    name: 'Přidat se',
    component: Home,
    alias: '/join',
    meta: {
      title: 'Přidat se | Bio-senpai',
      icon: 'account-plus'
    }
  },
  {
    path: '/kontakt',
    name: 'Kontakt',
    component: Home,
    meta: {
      title: 'Kontakt | Bio-senpai',
      icon: 'message'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: Home,
    meta: {
      title: 'FAQ | Bio-senpai',
      icon: 'library'
    }
  },
  {
    path: '/about',
    name: 'O webu',
    component: About,
    meta: {
      title: 'O webu Bio-senpai',
      icon: 'hexagon'
    }
  }
]

const navItems = routes
  .filter(rt => !rt.meta.navHidden)
  .map(rt => ({
    to: rt.path,
    label: rt.name,
    icon: rt.meta.icon
  }))

const allItems = routes
  .map(rt => ({
    to: rt.path,
    label: rt.name,
    icon: rt.meta.icon
  }))

export default routes
export {navItems, allItems}
