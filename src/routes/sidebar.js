import config from "../utils/config";
import Cookies from "js-cookie"; 


const logoutUser = () => {
  Cookies.remove("Task-Management-Cookies");
  window.location.href = `${config.baseUrl}`; 
};

const loginData = Cookies.get('Task-Management-Cookies') ? JSON.parse(Cookies.get('Task-Management-Cookies')) : {};
const routes = [
  
  ...(loginData.userType === 'Admin' ? [{
    path: `${config.baseUrl}taskassign`,
    icon: 'HomeIcon',
    name: 'Assign Task',
  }] : []),
    
  ...(loginData.userType === 'User' ? [{
    path: `${config.baseUrl}task`,
    icon: 'HomeIcon',
    name: 'Task',
  }] : []),

  {
    path: `${config.baseUrl}login`, 
    icon: 'HomeIcon',
    name: 'Logout',
    onClick: logoutUser,
  },
];

export default routes;
