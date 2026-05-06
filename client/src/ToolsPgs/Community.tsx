import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type CommunityPost = {
    _id: string
    imageUrl: string
    prompt: string
    title?: string
    createdAt: string
}

export const Community = () => {

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const [communityImgs, setCommunityImgs] = useState<CommunityPost[]>([])
    const [communityThumbs, setCommunityThumbs] = useState<CommunityPost[]>([])

    const allPosts=[...communityImgs, ...communityThumbs]

    useEffect(() => {
        const getCommunityPosts = async () => {
            try {
                const { data } = await axios.get(
                    `${VITE_BACKEND_URL}/api/ai/community-posts`)

                if (data.success) {
                    setCommunityImgs(data.images)
                    setCommunityThumbs(data.thumbnails)
                }
            } catch (err: any) {
                console.log(err)

                toast.error(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong!"
                )
            }

        }

        getCommunityPosts()
    }, [])

    return (
<div className="w-full h-screen ">
            <span className="text-violet-300 font-semibold">Creations</span>

         <div className="w-full h-[80vh] border border-violet-800 rounded-2xl mt-4 p-4 overflow-y-auto">
    
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {allPosts.map((item, idx) => (
            <img
                key={idx}
                src={item.imageUrl}
                alt="gen_img"
                className="w-full h-40 sm:h-48 lg:h-60 object-cover rounded-xl border border-violet-700"
            />
        ))}

    </div>

</div>
        </div>
    )
}