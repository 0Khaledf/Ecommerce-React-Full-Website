
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Error from './components/Error/Error'
import N404 from './components/N404/N404'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import Loader from './components/Loader/Loader'
import Gard from './components/gard/Gard'
import Details from './components/Details/Details'
import OtherContextProvider from './components/CartContext/OtherContext'
import CartContextProvider from './components/CartContext/CartContext'
import {ToastContainer} from 'react-toastify'
import Checkout from './components/Checkout/Checkout'
import 'react-toastify/dist/ReactToastify.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
function App() {
  const queryClinet=new QueryClient();
  const router=createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      errorElement : <Error />,
      children: [
        {index:true,
         element : <Home />
        },
        {
          path:'/details/:productId/:categoryName',
          element: <Details />
        },
        {
          path:'/products'
          ,element:
          <Gard> <Products /> </Gard>
        }
        ,{
          path: '/register',
          element: <Register />
        }
        ,{
          path : '/login',
          element : <Login />
        }
        ,{
          path : '/cart'
          ,element: <Gard> <Cart /> </Gard>
        }
        ,{
          path :'/loader'
          ,element:<Loader />
        }
        ,{
          path : '/categories',
          element: <Categories />
        },
        {
          path : '/brands',
          element: <Brands />
        },
        {path:'/checkout',
          element:<Checkout />
        },
        {
          path:'*',
          element: <N404 />
        }
      ]
    }
  ])
  return (
    <>
    <OtherContextProvider>
    <CartContextProvider>
      <QueryClientProvider client={queryClinet}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools/>
      <ToastContainer />
      </QueryClientProvider> 
      </CartContextProvider>
    </OtherContextProvider>
     
      
    </>
  )
}

export default App
