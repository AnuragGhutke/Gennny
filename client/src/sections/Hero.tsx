import { FaCheck, FaRegEye } from "react-icons/fa6";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

export const Hero = () => {

    const navigate = useNavigate()

    const {user}=useUser()
    const {openSignIn}=useClerk()

    return (
        <section className="w-full h-screen mb-16 flex flex-col justify-center items-center ">

            <motion.div className="w-90 lg:w-100 text-xs lg:text-sm flex items-center justify-center px-2 py-1.5  bg-[rgba(68,0,120,0.42)] rounded-full shadow-[0_0_80px_rgba(59,130,246,0.8)] mt-30"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
            >
                <span className="text-sm px-3 mr-1 rounded-full bg-[rgba(77,0,136,0.8)]">Free</span>
                <p className="text-nowrap"> #1 AI Generator for Images, Thumbnails & Videos </p>
            </motion.div>

            <motion.h1 className="text-5xl lg:text-6xl font-semibold text-center w-[80vw] lg:w-200 text-shadow-style "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
            >Create Images, Thumbnails & Videos with AI</motion.h1>
            <motion.p className="w-[90%] lg:w-150 text-lg text-center mt-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}>No design skills needed. Generate stunning content instantly for YouTube, social media, and more.</motion.p>

            <motion.div className="flex items-center justify-center mt-5 gap-5"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
            >
                <button
                    onClick={() => {
                        if (!user) return openSignIn()
                        navigate('/tools/gen-image')
                    }}
                    className="btn-style cursor-pointer">Generate Now</button>

                <button
                    onClick={() => navigate('/tools/community')}
                    className="w-40 flex gap-2 items-center border  rounded-full px-3 py-2 border-purple-300 text-sm cursor-pointer hover:shadow-[0_0_80px_rgba(59,130,246,0.8)] transition-all duration-400 "> <FaRegEye /> View Creations</button>
            </motion.div>

            <motion.div className="mt-15 flex  flex-col lg:flex-row items-center gap-8 p-5"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1, ease: 'easeIn' }}
            >

                <div className="flex  gap-5 text-nowrap">
                    <p className="flex gap-2 items-center justify-center ">
                        <FaCheck size={20} color="rgb(112, 26, 192)" />
                        No design skills needed
                    </p>

                    <p className="flex gap-2 items-center ">
                        <FaCheck size={20} color="rgb(112, 26, 192)" />
                        Generate in seconds
                    </p>
                </div>

                <p className="flex gap-2 items-center col-span-2 lg:col-span-1 justify-self-center ">
                    <FaCheck size={20} color="rgb(112, 26, 192)" />
                    High CTR templates
                </p>
            </motion.div>

        </section>
    )
}