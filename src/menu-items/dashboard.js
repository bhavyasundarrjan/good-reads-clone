// assets
import { ReadOutlined, HomeOutlined } from '@ant-design/icons';
// icons
const icons = {
  ReadOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Explore',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },
    {
      id: 'myBooks',
      title: 'My Books',
      type: 'item',
      url: '/dashboard/myBooks',
      icon: icons.ReadOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
