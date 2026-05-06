import { useAuth } from "@clerk/clerk-react"
import { useState } from "react"
import { LuSparkles } from "react-icons/lu"
import axios from 'axios'
import toast from "react-hot-toast"

const imgStyles = [
    'Realistic',
    'Ghibli Style',
    'Anime Style',
    'Cartoon Style',
    'Fantasy Style',
    '3D Style',
    'Portrait Style'
]

export const GenImg = () => {
    const [inputPrompt, setInputPrompt] = useState<string>('')
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
    const [publish, setPublish] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [genImg, setGenImg] = useState<string>('')

    const { getToken } = useAuth()

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const token = await getToken()

            const style = selectedStyle !== null ? imgStyles[selectedStyle] : ""
            const prompt = `Generate an image of ${inputPrompt} in the style ${style}`

            //call clipdrop api that created in backend
            const { data } = await axios.post(
                '/api/ai/generate-image',
                { prompt, publish },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (data.success) {
                setGenImg(data.image)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }
        finally {
            setLoading(false)
        }
    }

    //download img
    const downloadImage = (url: string) => {
        const link = document.createElement("a")

        link.href = url.replace("/upload", "/upload/fl_attachment")
        link.setAttribute("download", "gennny-image.png")

        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:p-6">

            {/* LEFT */}
            <form
                onSubmit={handleSumbit}
                className="w-full lg:w-[45vw] bg-[#170037] p-6 rounded-3xl flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center gap-2 text-violet-200">
                    <LuSparkles />
                    <p className="text-lg font-semibold">AI Image Generator</p>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-2">
                    <p className=" text-violet-100">Describe Your Image</p>
                    <textarea
                        value={inputPrompt}
                        onChange={e => setInputPrompt(e.target.value)}
                        className="w-full h-28 p-3 mt-1 rounded-xl bg-[#26005c] border outline-none  border-violet-800 focus:border-violet-500"
                        placeholder="Describe what you want to see in the image..."
                    />
                </div>

                {/* Styles */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-violet-200">Style</p>

                    <div className="flex flex-wrap gap-3">
                        {imgStyles.map((item, idx) => (
                            <span
                                key={idx}
                                onClick={() => setSelectedStyle(idx)}
                                className={`px-4 py-2 rounded-full text-sm cursor-pointer border transition
                                ${selectedStyle === idx
                                        ? 'bg-[#42009f] text-white border-violet-500'
                                        : 'border-violet-600 text-violet-200 hover:border-violet-400'}
                                `}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-violet-200">Make this image public</p>

                    <div
                        onClick={() => setPublish(!publish)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
                        ${publish ? 'bg-[#6a00ff] ' : 'bg-[#320078]'}`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full transition-transform
                            ${publish ? 'translate-x-6' : ''}`}
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#42009f] to-[#5b00db] hover:bg-[#4b00b4] transition-all duration-300 ease-in-out py-3 rounded-xl font-semibold flex items-center justify-center cursor-pointer"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="flex gap-1">
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </span>
                            <span>Generating...</span>
                        </span>
                    ) : (
                        "Generate Image"
                    )}
                </button>

            </form>

            {/* RIGHT */}
            <div className="w-full bg-[#170037] p-6 rounded-3xl flex flex-col gap-4 items-center justify-center move-gradient">

                <p className="text-violet-400 font-semibold">
                    Generated Image
                </p>

                <div className="w-full lg:w-[82%] h-64 lg:h-90 border border-dashed border-violet-600 rounded-2xl flex items-center justify-center relative overflow-hidden group">

                    {/* EMPTY STATE */}
                    {!genImg && !loading && (
                        <p className="text-violet-300">
                            Your image will appear here
                        </p>
                    )}

                    {/* LOADING SHIMMER */}
                    {loading && (
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="shimmer-sweep" />
                        </div>
                    )}

                    {/* IMAGE */}
                    {genImg && (
                        <>
                            <img
                                src={genImg}
                                className="w-full h-full object-cover rounded-2xl"
                                alt="gennny_img"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                                <button
                                    onClick={() => downloadImage(genImg)}
                                    className="px-4 py-2 bg-[rgb(106,0,255)] hover:bg-violet-800 text-white hover:scale-105 rounded-xl text-sm cursor-pointer transition-all duration-300 ease"
                                >
                                    Download
                                </button>

                            </div>

                        </>
                    )}

                </div>
            </div>

        </div>
    )
}