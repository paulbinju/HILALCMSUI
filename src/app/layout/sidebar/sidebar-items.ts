import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: 'dashboard/dashboard3',
    title: 'DASHBOARD',
    moduleName: 'dashboard',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '',
    title: 'LATEST ARTICLES',
    moduleName: 'forms',
    icon: 'layout',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'pages/articleview',
        title: 'View All',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }       
    ]
  },
  {
    path: '',
    title: 'ISSUE ARTICLES',
    moduleName: 'articles',
    icon: 'trello',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'pages/issue',
        title: 'Select',
        moduleName: 'articles',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/articleviewmag',
        title: 'Articles',
        moduleName: 'articles',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'NEWSLETTER',
    moduleName: 'calendar',
    icon: 'calendar',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'pages/newsletter',
        title: 'Select',
        moduleName: 'calendar',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: 'task',
    title: 'SETTINGS',
    moduleName: 'task',
    icon: 'settings',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: './pages/user',
        title: 'Users',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/category',
        title: 'Category',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/subcategory',
        title: 'SubCategory',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/lookup/ArticleTypes',
        title: 'Article Types',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/lookup/Roles',
        title: 'Roles',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/lookup/Publications',
        title: 'Publications',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: './pages/lookup/ArticleExtensionTypes',
        title: 'Article Extension Types',
        moduleName: 'task',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      }
      
    ]
  },
  {
    path: 'contacts',
    title: 'HELP',
    moduleName: 'contacts',
    icon: 'briefcase',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'pages/faq',
        title: 'Faq',
        moduleName: 'faq',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      },
      {
        path: 'pages/faq',
        title: '1.1.3',
        moduleName: 'version',
        icon: 'check-circle',
        class: '',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];
