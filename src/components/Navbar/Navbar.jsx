
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import  na from '../../assets/khal3.svg'
import naa from '../../assets/3.svg'
import './Navbar.css'
import bla from '../../assets/black.svg'
import wh from '../../assets/white.svg'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { OtherContext } from '../CartContext/OtherContext'
const navigation = [
  { name: 'Home', to: '' },
  { name: 'Products', to: '/products' },
  { name: 'Categories', to: '/categories' },
  { name: 'Brands', to: '/Brands' },
  { name: 'Cart', to: '/cart' },
]

export default function Navbar() {
  function handlLogout(){
    localStorage.removeItem("token1")
    localStorage.removeItem("name1")
    setToken1(null)
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {dar,setDark,token1,setToken1}=useContext(OtherContext) 
  return (
    <div data-theme={dar}>
    
    <div className="bg-white dark:bg-black " data-theme={dar}>
      <header className=" inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">THE WALK</span>
              <img
                alt=""
                src= {dar?naa:na}
                className="h-15  w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.to} className="text-sm/6 font-semibold text-gray-900 hover:text-lg dark:text-gray-50 " >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {token1 ? (<><NavLink to="/register" className="-mx-3 mr-4 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:text-blue-400 dark:text-gray-50" >
              {localStorage.getItem("name1")}
                  </NavLink>
            <NavLink to="/login" onClick={handlLogout} className="-mx-3 mr-4 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:text-blue-300 dark:text-gray-50">
              Log Out
            </NavLink> </>)
            :(<><NavLink
                    to="/register"
                    className="-mx-3 mr-4 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:text-blue-400 dark:text-gray-50"
                  >
                    Register
                  </NavLink>
            <NavLink to="/login" className="-mx-3 mr-4 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:text-blue-300 dark:text-gray-50">
              Log in 
            </NavLink> </>)}
            
            <button onClick={()=>{setDark(!dar)}}>{dar?<img src={wh} className='h-8 ml-5'/>:<img src={bla} className='h-8 ml-5'/>}</button>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="" className="-m-1.5 p-1.5">
                <span className="sr-only">THE WALK</span>
                <img
                  alt=""
                  src={na}
                  className="h-15 w-auto"
                />
              </NavLink>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-50"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6">
                  {token1 ? (<><NavLink
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-50"
                  >
                    {localStorage.getItem("name1")}
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={handlLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-50"
                  >
                    Log Out
                  </NavLink> </>)
            :(<><NavLink
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-50"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-50"
                  >
                    Log in
                  </NavLink> </>)}
                  
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
    </div>
  )
}
