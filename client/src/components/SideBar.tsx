import { Protect, useClerk, useUser } from "@clerk/clerk-react"
import { useState } from "react"
import { BiLogOut } from "react-icons/bi"
import { CiImageOn, CiMenuFries } from "react-icons/ci"
import { GoHome, GoVideo } from "react-icons/go"
import { IoMdPeople } from "react-icons/io"
import { LuGalleryThumbnails } from "react-icons/lu"
import { useNavigate, useParams } from "react-router-dom"

export const SideBar = () => {
    const navigate = useNavigate()
    const { tool } = useParams()

    const { user } = useUser()
    const { signOut, openSignIn, openUserProfile } = useClerk()

    const menu = [
        { name: 'Dashboard', path: 'dashboard', icon: <GoHome /> },
        { name: 'Generate Image', path: 'gen-image', icon: <CiImageOn /> },
        { name: 'Generate Thumbnail', path: 'gen-thumbnail', icon: <LuGalleryThumbnails /> },
        { name: 'Generate Video', path: 'gen-video', icon: <GoVideo /> },
        { name: 'Community', path: 'community', icon: <IoMdPeople /> },
    ]
    const publicRoutes = ["dashboard", "community"] 

    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Icon */}
            <CiMenuFries
                onClick={() => setOpen(!open)}
                className="fixed top-3 left-5 z-50 cursor-pointer text-2xl m-2"
            />

            {/* Sidebar */}
            <div className={`
                bg-linear-to-tl from-[rgb(50,0,107)] to-black border-r border-violet-800
                h-screen w-60 p-4 flex flex-col
                fixed top-0 left-0 z-40
                transform transition-transform duration-300
                ${open ? 'translate-x-0' : '-translate-x-full'}
            `}>

                {/* user profile */}
                {user &&
                    <div className="flex  flex-col items-center justify-center gap-2 mt-10 -mb-10">
                        <img src={user?.imageUrl} className="w-14 h-14 rounded-full object-cover" />
                        <span className="font-semibold text-center bg-linear-to-r from-white to-violet-400 bg-clip-text text-transparent">
                            {user?.fullName}
                        </span>
                    </div>
                }


                <div className="w-full mt-20 flex flex-col gap-3 font-semibold">

                    {menu.map((elm) => (
                        
                        <div
                            key={elm.path}
                            onClick={() => {
                                const isPublic=publicRoutes.includes(elm.path)

                                if(!user && !isPublic) return openSignIn()
                                    
                                navigate(`/tools/${elm.path}`)
                                setOpen(false)
                            }}
                            className={`
                                    w-full flex gap-2 items-center px-4 py-2 rounded-lg
                                    cursor-pointer
                                    ${tool === elm.path
                                    ? 'bg-linear-to-r from-[rgb(54,0,130)] to-[rgba(85,0,160,0.73)]'
                                    : 'hover:bg-[rgba(149,63,255,0.33)]'}
                                    transition-all duration-300
                                    relative
                                `}
                            >
                            <span className="text-xl">{elm.icon}</span>

                            <div className="flex items-center gap-2">
                                <span className="text-nowrap">{elm.name}</span>

                                {elm.path === "gen-video" && (
                                    <span className="text-[8px]  rounded-full bg-[rgba(136,0,255,0.61)] text-white p-0.5  relative -top-4 right-8 text-nowrap">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                </div>

                {/* signout */}
                {user &&
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className="flex items-center justify-between backdrop-blur-md border border-white/10 px-3 py-2">

                            {/* Left: user info */}
                            <div
                                onClick={() => openUserProfile()}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img
                                    src={user?.imageUrl}
                                    className="w-8 h-8 rounded-full object-cover"
                                />

                                <div className="flex flex-col ">
                                    <h1 className="text-xs font-medium text-white">
                                        {user?.fullName}
                                    </h1>

                                    <p className="text-[10px] text-violet-300">
                                        <Protect plan="Premium" fallback="Free">
                                            Premium
                                        </Protect>
                                    </p>
                                </div>
                            </div>

                            {/* Right: logout */}
                            <BiLogOut
                                onClick={() => signOut()}
                                size={18}
                                className="text-violet-300 hover:text-white transition duration-300 cursor-pointer"
                            />

                        </div>
                    </div>
                }

            </div>
        </>
    )
}