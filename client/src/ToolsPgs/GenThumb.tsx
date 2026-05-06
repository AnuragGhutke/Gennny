import { useState } from "react"
import { MdOutlineImage } from "react-icons/md"
import { useAuth } from "@clerk/clerk-react"
import axios from 'axios'
import toast from "react-hot-toast"

export const GenThumb = () => {

    const [title, setTitle] = useState("")
    const [aspectRatio, setAspectRatio] = useState("16:9")
    const [style, setStyle] = useState("Bold & Graphic")
    const [colorScheme, setColorscheme] = useState("Vibrant")
    const [model, setModel] = useState("premium")
    const [prompt, setPrompt] = useState("")
    const [publish, setPublish] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [generatedThumbnail, setGeneratedThumbnail] = useState<string>('')

    const styles = [
        {
            name: "Bold & Graphic",
            desc: "High contrast, bold typography, striking visuals"
        },
        {
            name: "Cinematic",
            desc: "Movie-like lighting and depth"
        },
        {
            name: "Minimal",
            desc: "Clean and simple design"
        },
        {
            name: "Gaming",
            desc: "Dynamic, neon, action-packed look"
        }
    ]

    const colors = ["Vibrant", "Dark", "Neon", "Pastel"]

    const models = [
        { name: "free", credits: 2 },
        { name: "premium", credits: 10 }
    ]

    const { getToken } = useAuth()

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = await getToken()

            const selectedStyle = styles.find((s) => s.name === style)?.name || "Bold & Graphic"
            const selectedColor = colors.includes(colorScheme)
                ? colorScheme
                : "Vibrant"

            const finalPrompt = `
            Create a high-quality YouTube thumbnail.
            Title: ${title}
            Style: ${selectedStyle}
            Color Scheme: ${selectedColor}
            Aspect Ratio: ${aspectRatio}
            Extra Prompt: ${prompt}
        `

            const { data } = await axios.post(
                '/api/ai/generate-thumbnail',
                {
                    title,
                    aspectRatio,
                    style: selectedStyle,
                    colorScheme: selectedColor,
                    prompt: finalPrompt,
                    publish
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (data.success) {
                setGeneratedThumbnail(data.data.imageUrl)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
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
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:p-6 ">

            {/* LEFT PANEL */}
            <form
                onSubmit={handleSubmit}
                className="w-full lg:w-[45vw] bg-[#170037] p-6 rounded-3xl flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center gap-2 text-violet-200">
                    <MdOutlineImage />
                    <p className="text-lg font-semibold">
                        AI Thumbnail Generator
                    </p>
                </div>

                <p className="text-violet-300 text-sm">
                    Describe your vision and let AI bring it to life
                </p>

                {/* TITLE */}
                <div className="flex flex-col gap-2">
                    <label className="text-violet-200 text-sm">
                        Title or Topic
                    </label>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                        required
                        placeholder="e.g. 10 Tips for Better Sleep"
                        className="w-full p-3 rounded-xl bg-[#26005c] border border-violet-800 outline-none focus:border-violet-500 text-white"
                    />

                    <p className="text-xs text-violet-400">
                        {title.length}/100
                    </p>
                </div>

                {/* ASPECT RATIO */}
                <div className="flex flex-col gap-2">
                    <p className="text-violet-200 text-sm">Aspect Ratio</p>

                    <div className="flex gap-3">
                        {["16:9", "1:1", "9:16"].map((a) => (
                            <button
                                key={a}
                                onClick={() => setAspectRatio(a)}
                                className={`px-4 py-2 rounded-lg border text-sm transition
                                ${aspectRatio === a
                                        ? "bg-[#42009f] border-violet-500 "
                                        : "border-violet-700 text-violet-200"}`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                {/* STYLE */}
                <div className="flex flex-col gap-3">
                    <p className="text-violet-200 text-sm">Thumbnail Style</p>

                    <div className="flex flex-wrap gap-3">
                        {styles.map((s, i) => (
                            <div
                                key={i}
                                onClick={() => setStyle(s.name)}
                                className={`p-3 rounded-xl border cursor-pointer transition
                                ${style === s.name
                                        ? "bg-[#42009f] border-violet-500"
                                        : "border-violet-700 hover:border-violet-400"}`}
                            >
                                <p className="text-white font-medium">{s.name}</p>
                                <p className="text-xs text-violet-300">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLOR SCHEME */}
                <div className="flex flex-col gap-2">
                    <p className="text-violet-200 text-sm">Color Scheme</p>

                    <div className="flex gap-3 flex-wrap">
                        {colors.map((c) => (
                            <span
                                key={c}
                                onClick={() => setColorscheme(c)}
                                className={`px-4 py-2 rounded-full text-sm cursor-pointer border
                                ${colorScheme === c
                                        ? "bg-[#42009f] border-violet-500 text-white"
                                        : "border-violet-700 text-violet-200"}`}
                            >
                                {c}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs text-violet-400">
                        Selected: {colorScheme}
                    </p>
                </div>

                {/* MODEL */}
                <div className="flex flex-col gap-2">
                    <p className="text-violet-200 text-sm">Model</p>

                    <div className="flex gap-3">
                        {models.map((m) => (
                            <button
                                key={m.name}
                                onClick={() => setModel(m.name)}
                                className={`px-4 py-2 rounded-lg border text-sm transition flex flex-col items-center
                                ${model === m.name
                                        ? "bg-[#42009f] border-violet-500"
                                        : "border-violet-700"}`}
                            >
                                <span className="capitalize">{m.name}</span>
                                <span className="text-xs opacity-70">
                                    ({m.credits} credits)
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* USER PHOTO */}
                <div className="flex flex-col gap-2">
                    <p className="text-violet-200 text-sm">User Photo (optional)</p>

                    <input
                        type="file"
                        className="w-54 text-violet-300 bg-[rgb(59,0,154)] rounded-2xl px-2 py-4"
                    />
                </div>

                {/* ADDITIONAL PROMPT */}
                <div className="flex flex-col gap-2">
                    <p className="text-violet-200 text-sm">
                        Additional Prompts (optional)
                    </p>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                        placeholder="Add any specific elements, mood, or style preferences..."
                        className="w-full h-24 p-3 rounded-xl bg-[#26005c] border border-violet-800 outline-none focus:border-violet-500 text-white"
                    />
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-violet-200">Make this thumbnail public</p>

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

                {/* BUTTON */}
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
                        "Generate Thumbnail"
                    )}
                </button>

            </form>

            {/* RIGHT PANEL */}
            <div className="w-full bg-[#170037] p-6 rounded-3xl flex flex-col gap-4 items-center justify-start move-gradient">

                <p className="text-violet-400 font-semibold">
                    Generated Thumbnail
                </p>

                <div className="w-full h-72 border border-dashed border-violet-600 rounded-xl flex items-center justify-center relative overflow-hidden group">

                    {/* EMPTY STATE */}
                    {!generatedThumbnail && !loading && (
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-violet-300">
                                Your thumbnail will appear here
                            </p>

                            <span className="text-xs text-violet-500 mt-5 text-center">
                                Preview generated using a lightweight model — results may vary in quality

                            </span>
                        </div>

                    )}

                    {/* LOADING SHIMMER INSIDE SAME BOX */}
                    {loading && (
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="shimmer-sweep" />
                        </div>
                    )}

                    {/* IMAGE */}
                    {generatedThumbnail && (
                        <>
                            <img
                                src={generatedThumbnail}
                                alt=""
                                className="w-full h-full object-contain rounded-xl"
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                                <button
                                    onClick={() => downloadImage(generatedThumbnail)}
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