import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { CiMenuFries } from "react-icons/ci"
import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { LogoName } from "./LogoName"
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"

export const Navbar = () => {

    const navigate = useNavigate()

    const { user } = useUser()
    const { openSignIn, signOut } = useClerk()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <motion.div className="font-inter w-full h-16 flex items-center justify-between px-10 backdrop-blur-lg  fixed z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 250, damping: 70, mass: 1 }}
        >

            <div className="flex items-center">
                <LogoName />
            </div>

            <div
                className={`
                            fixed top-0 left-0 w-full h-screen 
                            flex flex-col items-center justify-center gap-10
                        bg-[rgba(24,0,53,0.96)] z-40
                            transform transition-all duration-500 ease-in-out
                            ${isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                    }
                        lg:relative lg:translate-x-0 lg:opacity-100 
                        lg:flex lg:flex-row lg:h-auto lg:bg-transparent lg:gap-8 text-sm c
  `}
            >
                <button
                    onClick={() => navigate('/')}
                    className="cursor-pointer font-semibold hover:text-violet-400">Home</button>

                <div className="relative group ">
                    <button onClick={() => navigate('/tools/dashboard')}
                        className="cursor-pointer font-semibold hover:text-violet-400">Generate ▾</button>

                    <div className="absolute left-0 top-full hidden group-hover:flex flex-col items-center justify-center border border-violet-400 rounded-lg px-4 py-2 text-nowrap gap-2 
                        bg-[rgba(29,0,66,0.82)] backdrop-blur-lg">

                        <span onClick={() => {
                            if (!user) return openSignIn()
                            navigate('/tools/gen-image')
                        }} className="hover:text-violet-400 cursor-pointer">Generate Image</span>

                        <span onClick={() => {
                            if (!user) return openSignIn()
                            navigate('/tools/gen-thumbnail')
                        }} className="hover:text-violet-400 cursor-pointer">Generate Thumbnail</span>

                        <span onClick={() => {
                            if (!user) return openSignIn()
                            navigate('/tools/gen-video')
                        }} className="hover:text-violet-400 cursor-pointer">Generate Video</span>

                    </div>
                </div>

                <button
                    onClick={() => navigate('/tools/dashboard')}
                    className="cursor-pointer font-semibold hover:text-violet-400">My Creations</button>
                <button
                    onClick={() => navigate('/tools/community')}
                    className="cursor-pointer font-semibold hover:text-violet-400">Community</button>

                <button
                    onClick={() => {
                        if (user) {
                            signOut()
                        } else {
                            openSignIn()
                        }
                    }}
                    className=" lg:hidden text-sm cursor-pointer font-semibold hover:scale-105 bg-[rgba(92,0,184,0.82)] hover:bg-[rgba(128,0,255,0.82)] px-5 transition-all ease duration-300 py-2 rounded-full ">{user ? 'Logout' : 'Login'}
                </button>


            </div>

            {user ?
                <div className="hidden lg:flex"> <UserButton />
                </div>
                :
                <button
                    onClick={() => openSignIn()}
                    className="hidden lg:block text-sm font-semibold bg-[rgba(92,0,184,0.82)] hover:bg-[rgba(128,0,255,0.82)] hover:scale-105 transition-all duration-300 px-5 py-2 rounded-full cursor-pointer ">Login
                </button>}


            {isOpen ?
                <RxCross2
                    onClick={() => setIsOpen(!isOpen)}
                    size={25}
                    className="lg:hidden cursor-pointer z-50 " />
                :
                <div className="">
                    <CiMenuFries
                        onClick={() => setIsOpen(!isOpen)}
                        size={25}
                        className="lg:hidden cursor-pointer z-50" />
                </div>
            }
        </motion.div>
    )
}