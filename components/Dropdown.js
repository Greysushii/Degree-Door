import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { auth } from '../firebase'
// const MyLink = forwardRef((props, ref) => {
//   let { href, children, ...rest } = props
//   return (
//     <Link href={href}>
//       <a ref={ref} {...rest}>
//         {children}
//       </a>
//     </Link>
//   )
// })

export default function Example() {
  const router = useRouter()
  async function handleClick() {
    await auth.signOut()
    router.push("/login")
  }

  return (
    <div className="top-16 text-right font-Inter">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button 
            className="text-white bg-green-800 hover:bg-green-700 rounded-lg text-sm px-5 py-2.5"
          >
            OPTIONS
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-800 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleClick}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}