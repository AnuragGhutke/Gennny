import { motion } from 'framer-motion'

export const StartCard = () => {
    return (
        <motion.div className="w-[90vw] h-50 lg:w-[76vw] flex flex-col lg:flex-row justify-center items-center bg-linear-to-br from-[rgb(87,0,202)] to-[rgb(46,0,107)] m-auto rounded-2xl mb-20"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 70 }}
        >

            <div className="flex flex-col px-8">
                <h1 className="text-4xl font-semibold mb-4 bg-linear-to-r from-[rgb(255,255,255)]  to-[rgb(48,0,112)] text-transparent bg-clip-text">Ready to go viral?</h1>
                <p className="text-2xl">Join thousands of creators using AI to boost their CTR.</p>
            </div>

            <button className="px-8 py-2 bg-[rgb(111,0,255)] rounded-full font-semibold mt-4 cursor-pointer">Get Started</button>

        </motion.div>
    )
}