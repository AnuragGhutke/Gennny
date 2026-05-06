import { IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { motion } from 'framer-motion'

export const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center mt-16 px-4">

      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}

      >
        <button className="btn-style border-2 border-violet-500">
          Contact
        </button>

        <h4 className="text-2xl md:text-3xl font-semibold mt-6 text-center">
          Boost your content
        </h4>

        <p className="text-violet-200 text-center mt-2 max-w-xl px-4">
          Create AI-powered thumbnails, images & videos that grow your content.
          Have questions or ready to scale? Let’s talk.
        </p>
      </motion.div>


      <motion.form className="w-full max-w-2xl flex flex-col items-center justify-center p-6 md:p-10"
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{delay:0.2, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}

      >

        <div className="w-full flex flex-col md:flex-row gap-4">

          <div className="w-full md:w-1/2 border border-violet-400 rounded-2xl flex items-center gap-2 px-3 py-2">
            <IoPersonOutline color="rgb(153, 74, 255)" />
            <input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div className="w-full md:w-1/2 border border-violet-400 rounded-2xl flex items-center gap-2 px-3 py-2">
            <IoMailOutline color="rgb(153, 74, 255)" />
            <input
              type="email"
              className="w-full outline-none bg-transparent"
              placeholder="Enter your email"
            />
          </div>

        </div>

        <textarea
          placeholder="Enter your message..."
          className="w-full h-40 border border-violet-400 rounded-2xl px-4 py-2 mt-5 outline-none bg-transparent"
        ></textarea>

        <button className="mt-8 bg-violet-800 rounded-full px-10 py-2 cursor-pointer">
          Submit
        </button>

      </motion.form>

    </div>
  )
}