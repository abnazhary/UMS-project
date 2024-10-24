
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import UserData from './Components/UserData/UserData'
import Update from './Components/Update/Update'
import Profile from './Components/Profile/Profile'
import UserList from './Components/UserList/UserList'
import NotFound from './Components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'

function App() {
  
    const routes = createBrowserRouter([
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true , element:<Login/>},
          {path:"login" , element:<Login/>}
        ]
      },
      { path:"dashboard", 
        element:<MasterLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true , element:<Home/>},
          {path:"home" , element:<Home/>},
          {path:"user-data" , element:<UserData/>},
          {path:"update/:id" , element:<Update/>},
          {path:"profile" , element:<Profile/>},
          {path:"user-list" , element:<UserList/>},
        ]
      }

    ])

  return (
    <>
    <ToastContainer/>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
