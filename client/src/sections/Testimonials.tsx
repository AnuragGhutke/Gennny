import { testimonials } from '../data/testimonials'
import { testimonials2 } from '../data/testimonials2'
import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { y: 150, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 320,
            damping: 70
        }
    }
}

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren:0.4
        }
    }
}

export const Testimonials = () => {
    return (
        <motion.div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden lg:px-10 lg:mt-24"
            variants={container}
            initial="hidden"
            whileInView="visible"
        >

            <motion.div className='flex flex-col items-center justify-center'
                variants={fadeUp}
            >
                <button className="btn-style border-2 border-violet-500 ">Testimonials</button>

                <h4 className="text-3xl font-semibold mt-4">Loved by creators</h4>
                <p className="text-violet-200 text-center mt-2 px-5">See how our AI tools are helping creators explode their views.</p>
            </motion.div>

            {/* testimonials 1 */}
            <motion.div className="w-full overflow-hidden mt-10 relative px-50"
                variants={fadeUp}
            >

                {/* LEFT FADE */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-40 lg:w-100 z-10 bg-linear-to-r from-black to-transparent" />

                {/* right fade */}
                <div className='pointer-events-none absolute right-0 top-0 h-full w-40 lg:w-100 z-10 bg-linear-to-l from-black to-transparent' />


                <motion.div
                    className='flex gap-8 w-max'
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 60,
                        ease: 'linear',
                        repeat: Infinity
                    }}
                >

                    {[...testimonials, ...testimonials].map((box, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col border border-violet-400 rounded-2xl p-5 shrink-0 
                            w-[60vw] lg:w-[25vw] card-hover transition-all duration-300 ease
                        ">
                            <div className='flex items-center'>
                                <img src={box.image} className='w-12 h-12 object-cover rounded-full' />
                                <div className='flex flex-col pl-2'>
                                    <h4 className='text-lg font-semibold text-nowrap'>{box.name}</h4>
                                    <p className='text-sm text-violet-400 font-semibold'>{box.handle}</p>
                                </div>
                            </div>
                            <p className='pt-4 text-sm text-violet-200'>{box.quote}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>


            {/* testimonials 2 */}
            <motion.div className="w-full overflow-hidden mt-10 relative px-50"
                variants={fadeUp}
            >

                {/* LEFT FADE */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-44 lg:w-150 z-10 bg-linear-to-r from-black to-transparent" />

                {/* right fade */}
                <div className='pointer-events-none absolute right-0 top-0 h-full w-44 lg:w-150 z-10 bg-linear-to-l from-black to-transparent' />


                <motion.div
                    className='flex gap-8 w-max'
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{
                        duration: 60,
                        ease: 'linear',
                        repeat: Infinity
                    }}
                >

                    {[...testimonials2, ...testimonials2].map((box, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col border border-violet-400 rounded-2xl p-5 shrink-0 
                            w-[60vw] lg:w-[25vw] card-hover transition-all duration-300 ease
                        ">
                            <div className='flex items-center'>
                                <img src={box.image} className='w-12 h-12 object-cover rounded-full' />
                                <div className='flex flex-col pl-2'>
                                    <h4 className='text-lg font-semibold text-nowrap'>{box.name}</h4>
                                    <p className='text-sm text-violet-400 font-semibold'>{box.handle}</p>
                                </div>
                            </div>
                            <p className='pt-4 text-sm text-violet-200'>{box.quote}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}