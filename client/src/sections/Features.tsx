import { AiOutlineThunderbolt } from "react-icons/ai"
import { LuGalleryThumbnails } from "react-icons/lu"
import { MdAnimation } from "react-icons/md"
import { motion } from 'framer-motion'

export const Features = () => {
    return (
        <motion.div className="w-full flex flex-col items-center justify-center px-20 mt-16"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >

            <motion.button className="btn-style border-2 border-violet-500 cursor-default!"
            >Features</motion.button>

            <motion.h1 className="w-84 lg:w-100 mt-5 text-4xl lg:text-5xl text-center font-semibold text-shadow-style">Why use Gennny?</motion.h1>
            <motion.p className="w-120 mt-4 text-lg text-center text-violet-200 text-shadow-style px-15"
            >Create stunning images, thumbnails & videos — instantly, without design skills.</motion.p>

            <div className="grid lg:grid-cols-2 items-center gap-6 ">
                {/* 1st div */}
                <motion.div className="w-full max-w-80 border border-gray-500 rounded-2xl py-6 px-4 mt-12 card-hover transition-all duration-300 ease"


                >
                    <AiOutlineThunderbolt size={30}
                        className=" text-violet-500 fill='currentColor' viewBox='0 0 24 24'" />
                    <h4 className="text-xl font-semibold text-violet-400 text-shadow-style mt-2">Smart AI Analysis</h4>
                    <p className="mt-2 text-violet-100">Our AI understands your idea or content and suggests the most engaging visuals automatically.</p>
                </motion.div>


                {/* 2nd motion.div */}
                <motion.div className="w-full max-w-80 border border-gray-500 rounded-2xl py-6 px-4 lg:mt-12 card-hover transition-all duration-300 ease"
                >
                    <LuGalleryThumbnails size={30}
                        className=" text-violet-500 fill='currentColor' viewBox='0 0 24 24'" />
                    <h4 className="text-xl font-semibold text-violet-400 mt-2">High-CTR Thumbnails</h4>
                    <p className="mt-2 text-violet-100">Generate eye-catching, high-converting thumbnails designed to stand out and get clicks.</p>
                </motion.div>


                {/* 3rd motion.div */}
                <motion.div className="w-full max-w-80 border border-gray-500 rounded-2xl py-6 px-4 lg:col-span-2 justify-self-center card-hover transition-all duration-300 ease"
                >
                    <MdAnimation size={30}
                        className=" text-violet-500 fill='currentColor' viewBox='0 0 24 24'" />
                    <h4 className="text-xl font-semibold text-violet-400 mt-2">AI Image & Video Generation</h4>
                    <p className="mt-2 text-violet-100">Create stunning visuals and short videos in seconds — all powered by AI.</p>
                </motion.div>
            </div>
        </motion.div>
    )
}