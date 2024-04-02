import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { auth } from 'utils/firebase.utils';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {

  const navigate = useNavigate();

  auth.onAuthStateChanged((user)=>{
    if(!user){
      navigate('/login')
    }
  });
  return useRoutes([MainRoutes, LoginRoutes]);
}
