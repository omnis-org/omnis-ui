import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'browser-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Map',
    icon: 'map-outline',
    link: '/pages/map',
  },
  {
    title: 'Pending Machines',
    icon: 'checkmark-square-outline',
    link: '/pages/pending-machines',
  },
  {
    title: 'Administration',
    icon: 'options-2-outline',
    children: [
      {
        title: 'Users',
        link: '/pages/administration/users',
      },
      {
        title: 'Roles',
        link: '/pages/administration/roles',
      }
    ],
  },
];
