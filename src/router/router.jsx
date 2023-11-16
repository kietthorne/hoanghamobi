import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import PageHome from '@Pages/PageHome';
import PageProducts from '@Pages/PageProducts';
import MainLayout from '@Layout/MainLayout';
import ProductDetails from '../components/ProductDetails';
import PageSignUp from '@Pages/PageSignUp';
import PageSignIn from '@Pages/PageSignIn';
import PageDemo from 'pages/PageDemo';
import Page404 from '../components/Page404';
import PageChat from '../pages/PageChat';
import CartProduct from '../components/CartProduct';


export const routes = [
  { title: 'Home', path: '/', component: PageHome, isShowMenu: true },
  { title: 'Products', path: '/products', component: PageProducts, isShowMenu: true },
  { title: 'Details Product', path: '/product/:id', component: ProductDetails, isShowMenu: true },
  { title: 'Sign Up', path: '/sign-up', component: PageSignUp, isShowMenu: true },
  { title: 'Sign In', path: '/sign-in', component: PageSignIn, isShowMenu: true },
  { title: 'Cart', path: '/cart', component: CartProduct, isShowMenu: true },
  { title: 'Chat With HoangHa', path: '/chat', component: PageChat, isShowMenu: true },
  { title: 'Page demo', path: '/demo', component: PageDemo, isShowMenu: true },
  { title: 'Page Not Found', path: '*', component: Page404, isShowMenu: false },
]

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    {routes.map(i =>
      <Route key={i.path} path={i.path} element={<i.component />} />)
    }
  </Route>
), { basename: "/Project_HH" });


export { router }