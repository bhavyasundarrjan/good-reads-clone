// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'detail-page',
      title: 'Detail Page',
      type: 'item',
      url: '/detail-page',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
