import { lazy } from 'react'

const Task = lazy(()=>import('../pages/Task'))
const Users = lazy(()=>import('../pages/TaskAssign')) 

const routes = [
  
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
