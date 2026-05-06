import  {motion} from 'framer-motion'

export const Preview = () => {
  return (
    <motion.div className="w-full lg:min-h-screen flex items-center justify-center p-4 lg:px-40"
    initial={{y:150,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{type:'spring', stiffness:320, damping:70, mass:1}}
    >
      <div className="w-full  rounded-3xl overflow-hidden shadow-2xl border border-violet-500 card-hover hover:scale-101 transition-all duration-500 ease">
        <img
          src="/prev_img.png"
          className="w-[90vw] h-auto object-contain"
          alt="Tools Preview"
        />
      </div>
    </motion.div>
  );
};