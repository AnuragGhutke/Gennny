import { Request, Response } from "express"
import { Image } from "../models/image"
import { Thumbnail } from "../models/thumbnail"

export const communityPosts = async (req: Request, res: Response) => {
    try {
        const communityImgs = await Image.find({ publish: true }).sort({ serial: -1 })

        const communityThumbnails = await Thumbnail.find({ publish: true }).sort({ serial: -1 })

        return res.status(200).json({
            success: true,
            images: communityImgs,
            thumbnails: communityThumbnails
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false, message: err.message
        })
    }
}