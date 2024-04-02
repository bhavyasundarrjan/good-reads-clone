import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Book Shelves',
  type: 'group',
  children: [
    {
      id: 'util-want-to-read',
      title: 'Want to Read',
      type: 'item',
      url: '/wantToRead',
      icon: LocalLibraryIcon
    },
    {
      id: 'util--currently-reading',
      title: 'Currently Reading',
      type: 'item',
      url: '/currentlyReading',
      icon: MenuBookIcon
    },
    {
      id: 'util-read',
      title: 'Read',
      type: 'item',
      url: '/read',
      icon: AutoStoriesIcon
    }
  ]
};

export default utilities;
