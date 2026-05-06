import { useState } from "react"
import { LuVideo } from "react-icons/lu"

export const GenVdo = () => {

    const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
    const [isPublic, setIsPublic] = useState(false)
    const [duration, setDuration] = useState("5s")
    const [aspect, setAspect] = useState("9:16")

    const videoStyles = [
        'Cinematic',
        'Realistic',
        'Anime Style',
        'Cartoon Style',
        '3D Animation',
        'Documentary',
        'Fantasy Style'
    ]

    const durations = ["3s", "5s", "10s", "15s"]
    const ratios = ["9:16", "16:9", "1:1"]

    return (
        <>
            <p className="w-full p-4 rounded-lg border border-violet-900 bg-[rgb(0,0,0)] text-[rgb(145,48,254)] text-sm flex items-center justify-between mb-5 lg:mb-0">
                🎬 Video Generation is coming soon. We're working hard to bring this feature to you.
            </p>

            <div className="w-full flex flex-col lg:flex-row gap-4 lg:p-6">

                {/* LEFT */}
                <div className="w-full lg:w-[45vw] bg-[#170037] p-6 rounded-3xl flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex items-center gap-2 text-violet-200">
                        <LuVideo />
                        <p className="text-lg font-semibold">AI Video Generator</p>
                    </div>

                    {/* Prompt */}
                    <div className="flex flex-col gap-2">
                        <p className="text-violet-100">Describe Your Video</p>
                        <textarea
                            className="w-full h-28 p-3 mt-1 rounded-xl bg-[#26005c] border outline-none border-violet-800 focus:border-violet-500"
                            placeholder="Describe what you want to see in the video..."
                        />
                    </div>

                    {/* Style */}
                    <div className="flex flex-col gap-3">
                        <p className="text-violet-200">Style</p>

                        <div className="flex flex-wrap gap-3">
                            {videoStyles.map((item, idx) => (
                                <span
                                    key={idx}
                                    onClick={() => setSelectedStyle(idx)}
                                    className={`px-4 py-2 rounded-full text-sm cursor-pointer border transition
                                ${selectedStyle === idx
                                            ? 'bg-[#42009f] text-white border-violet-500'
                                            : 'border-violet-600 text-violet-200 hover:border-violet-400'}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col gap-2">
                        <p className="text-violet-200">Duration</p>
                        <div className="flex gap-3">
                            {durations.map((d) => (
                                <span
                                    key={d}
                                    onClick={() => setDuration(d)}
                                    className={`px-3 py-2 rounded-lg cursor-pointer border text-sm
                                ${duration === d
                                            ? 'bg-[#42009f]  text-white border-violet-500'
                                            : 'border-violet-700 text-violet-200'}`}
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="flex flex-col gap-2">
                        <p className="text-violet-200">Aspect Ratio</p>
                        <div className="flex gap-3">
                            {ratios.map((r) => (
                                <span
                                    key={r}
                                    onClick={() => setAspect(r)}
                                    className={`px-3 py-2 rounded-lg cursor-pointer border text-sm
                                ${aspect === r
                                            ? 'bg-[#42009f]  border-violet-500'
                                            : 'border-violet-700 text-violet-200'}`}
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Toggle */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-violet-200">Make this video public</p>

                        <div
                            onClick={() => setIsPublic(!isPublic)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
                       ${isPublic ? 'bg-[#6a00ff] ' : 'bg-[#320078]'}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full transition-transform
                            ${isPublic ? 'translate-x-6' : ''}`}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-linear-to-r from-[#42009f] to-[#5b00db] hover:opacity-90 transition py-3 rounded-xl font-semibold">
                        Generate Video
                    </button>

                </div>

                {/* RIGHT */}
                <div className="w-full bg-[#170037] p-6 rounded-3xl flex flex-col gap-4 items-center justify-center move-gradient">

                    <p className="text-violet-400 font-semibold">Generated Video</p>

                    <div className="w-full h-64 border border-dashed border-violet-600 rounded-xl flex items-center justify-center text-violet-300">
                        Your video will appear here
                    </div>

                </div>

            </div>
        </>)
}