import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LuSparkles } from "react-icons/lu"
import { MdOutlineDiamond } from "react-icons/md"
import type { ImageType, ThumbnailType } from "../types/dbResponse"

export const Dashboard = () => {
    const { getToken, isLoaded } = useAuth()

    const [imgs, setImgs] = useState<ImageType[]>([])
    const [thumbnails, setThumbnails] = useState<ThumbnailType[]>([])
    const [plan, setPlan] = useState<string>('free')
    const [freeUsage, setFreeUsage] = useState<number>(0)
    const [totalCreations, setTotalCreations] = useState<number>(0)

    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        if (!isLoaded) return

        const fetchData = async () => {
            try {
                const token = await getToken()
                if (!token) return

                const [imgsRes, thumbsRes] = await Promise.all([
                    axios.get('/api/ai/images', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('/api/ai/thumbnails', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])

                setImgs(imgsRes.data.images)
                setThumbnails(thumbsRes.data.thumbnails)

                setPlan(imgsRes.data.plan ?? 'free')
                setFreeUsage(imgsRes.data.free_usage ?? 0)

                setTotalCreations(
                    (imgsRes.data.images?.length || 0) +
                    (thumbsRes.data.thumbnails?.length || 0)
                )

            } catch (err: any) {
                console.log(err)

                toast.error(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong!"
                )
            }
        }

        fetchData()
    }, [isLoaded])

    return (<>
        <div className="w-full flex flex-col gap-8 lg:flex-row lg:mt-10">

            {/* 1st */}
            <div className="w-full lg:w-1/3 rounded-3xl h-24 border border-violet-400 flex items-center justify-between p-5">

                <div className="flex flex-col gap-2">
                    <p className="text-lg text-violet-300 font-semibold">Total Creations</p>
                    <span className="text-violet-300 font-bold text-xl">{totalCreations}</span>
                </div>

                <div className="p-4 rounded-2xl bg-linear-to-br from-[rgb(98,0,255)] to-[rgb(50,0,94)]">
                    <LuSparkles size={20} />
                </div>
            </div>

            {/* 2nd */}
            <div className="w-full lg:w-1/3 rounded-3xl h-24 border border-violet-400 flex items-center justify-between p-5">

                <div className="flex flex-col gap-2">
                    <p className="text-lg text-violet-300 font-semibold">Active Plan</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-violet-500 font-semibold text-xl">{plan}</span>

                        <span
                            className="text-violet-400 font-semibold "
                        >{`free usage:${freeUsage}/20`}</span>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-linear-to-tl from-[rgb(98,0,255)] to-[rgb(50,0,94)]">
                    <MdOutlineDiamond size={20} />
                </div>
            </div>


        </div>
        <h4 className="mt-10 font-semibold text-violet-300 text-lg">Recent Creations</h4>

        <div className="w-full mt-5">

            <span className="text-violet-300 font-semibold">Images</span>
            <div className="w-full h-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 mb-10 border border-violet-600 rounded-2xl p-3 overflow-y-auto">
                {imgs.map((img, idx) => (
                    <img
                        key={idx}
                        src={img.imageUrl}
                        className="w-40 h-40 lg:w-72 lg:h-72 object-cover rounded-xl border border-violet-600"
                    />
                ))}
            </div>



            <span className="text-violet-300 font-semibold">Thumbnails</span>
            <div className="w-full h-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 border border-violet-600 rounded-2xl p-3 overflow-y-auto">
                {thumbnails.map((thumbnail, idx) => (
                    <img
                        key={idx}
                        src={thumbnail.imageUrl}
                        className="w-full h-40 md:h-64 object-cover rounded-xl border border-violet-600"
                    />
                ))}
            </div>
        </div>
    </>
    )
}