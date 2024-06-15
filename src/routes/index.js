import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Task = lazy(()=>import('../pages/Task'))
const Users = lazy(()=>import('../pages/TaskAssign')) 

const routes = [
  {
    path: 'dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: 'task', 
    component: Task, 
  },
  {
    path: 'taskassign', 
    component: Users, 
  },

]

export default routes
