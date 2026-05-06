import { PricingTable } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

export const Pricing = () => {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center lg:mt-16'>
        <motion.div className='flex flex-col items-center justify-center'
            initial={{y:150, opacity:0}}
            whileInView={{y:0,opacity:1}}
            transition={{type:'spring',stiffness:320, damping:70, mass:1}}
        >
            <button className="btn-style border-2 border-violet-500 ">Pricing</button>

            <h4 className="text-3xl font-semibold mt-4">Simple Pricing</h4>
            <p className="text-violet-200 text-center mt-2 px-5">Choose the plan that fits your creation schedule.</p>
        </motion.div>

        <div className='lg:w-2xl mt-10 mb-20 pricing-wrapper'>
            <PricingTable />
        </div>
        </div>
    )
}