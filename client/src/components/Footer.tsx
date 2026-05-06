import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'

export const Footer = () => {

    const navigate = useNavigate()

    return (
        <div className="w-full bg-[rgba(42,0,96,0.48)] p-10 flex flex-col gap-8">

            <motion.div className="flex gap-4 lg:gap-20 items-center justify-center"
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 70 }}
            >

                <img
                    onClick={() => navigate('/')}
                    src="/GennnLogo.png"
                    className="w-20 brightness-0 invert cursor-pointer" />

                <div className="text-center flex flex-col gap-2  text-violet-300">
                    <h4 className="font-semibold text-violet-500">Pages</h4>
                    <p className="footer-hover  text-sm">Home</p>
                    <p className="footer-hover text-sm">Generate</p>
                    <p className="footer-hover text-sm">Community</p>
                </div>

                <div className="text-center flex flex-col gap-2 text-violet-300">
                    <h4 className="font-semibold text-violet-500">Company</h4>
                    <p className="footer-hover text-sm">About us</p>
                    <p className="footer-hover text-sm">Contact us</p>
                    <p className="footer-hover text-sm">Pricing</p>
                </div>

                <div className="text-center flex flex-col gap-2 text-violet-300">
                    <h4 className="font-semibold text-violet-500">Legal</h4>
                    <p className="footer-hover text-sm">Privacy Policy</p>
                    <p className="footer-hover text-sm text-nowrap">Terms of service</p>
                    <p className="footer-hover text-sm">Refund policy</p>
                </div>
            </motion.div>

            <motion.div className="flex flex-col items-center justify-center text-violet-300"
                initial={{ x: 150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 70 }}
            >
                <p className="w-84 text-center mb-4">Making every customer feel valued—no matter the size of your audience.</p>
                <p>© 2026 Gennny.</p>
            </motion.div>

        </div>
    )
}