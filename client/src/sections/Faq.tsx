import { useState } from "react"
import { faqs } from '../data/faqs'
import { IoIosArrowUp } from "react-icons/io"
import { motion } from 'framer-motion'

export const Faqs = () => {

    const [isOpen, setIsOpen] = useState<number | null>(null)

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">

            <motion.div className="flex flex-col items-center justify-center"
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}

            >
                <button className="btn-style border-2 border-violet-500 ">FAQs</button>


                <h4 className="text-3xl font-semibold mt-8 ">Frequently Asked Questions</h4>
                <p className="lg:w-160 text-violet-200 text-center px-5 mt-2">Everything you need to know about Genny — your AI-powered tool for generating images, videos, and thumbnails.</p>
            </motion.div>

            <div className="w-[80vw] lg:w-[50vw] m-auto flex flex-col gap-4 mt-12">
                {faqs.map((elm, idx) => (
                    <motion.div
                        key={idx}
                        onClick={() => setIsOpen(isOpen === idx ? null : idx)}

                        className={`w-full border border-violet-300 rounded-2xl flex flex-col justify-center px-4 py-2 transition-all duration-300 ease cursor-pointer hover:border-violet-500
                            ${isOpen === idx &&
                            "bg-[rgba(46,19,100,0.55)] border-violet-500"
                            } 
                            `}
                    >
                        <div className="flex justify-between items-center">
                            <h4 className={` font-semibold transition-all duration-300 ease ${isOpen === idx && 'text-violet-300'}`}>{elm.q}</h4>                        <IoIosArrowUp size={20} color="rgb(111, 0, 255)"
                                className={`transition-transform duration-300 ease-in-out ${isOpen === idx ? "rotate-0" : "rotate-180"
                                    }`}
                            />
                        </div>

                        <p className={`pt-2     text-violet-100 transition-all duration-500 ease overflow-hidden
                        ${isOpen === idx ? "max-h-35" : "max-h-0"}`}
                        >{elm.a}</p>

                    </motion.div>
                ))}
            </div>

        </div>
    )
}