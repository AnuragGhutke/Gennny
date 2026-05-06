import { Features } from "../sections/Features"
import { Footer } from "../components/Footer"
import { StartCard } from "../components/StartCard"
import { Contact } from "../sections/Contact"
import { Faqs } from "../sections/Faq"
import { Pricing } from "../sections/Pricing"
import { Testimonials } from "../sections/Testimonials"
import { Preview } from "../sections/Preview"
import { Hero } from "../sections/Hero"
import { Navbar } from "../components/Navbar"


export const Home = () => {
    return (
            <div className="move-gradient overflow-hidden">
                <Navbar/>
                <Hero />
                <Preview />
                <Features />
                <Testimonials />
                <Pricing />
                <Faqs />
                <Contact />
                <StartCard />
                <Footer />
            </div>
    )
}