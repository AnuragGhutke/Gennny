import { useNavigate } from "react-router-dom"

export const LogoName = () => {
    
    const navigate=useNavigate()
    
    return (
        <div className="flex items-center">
            <img
                onClick={() => navigate('/')}
                src="/GennnLogo.png"
                className="w-24 mt-2 brightness-0 invert cursor-pointer "
                alt="" />
            <span
                onClick={() => navigate('/')}
                className="text-2xl font-semibold  text-shadow-[0_0_100px_rgba(59,130,246,0.8)] cursor-pointer card-hover">Gennny.
            </span>
        </div>
    )
}