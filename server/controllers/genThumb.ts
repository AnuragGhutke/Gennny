import { Request, Response } from 'express'
import { clerkClient } from '@clerk/express'
import axios from 'axios'
import FormData from 'form-data'
import { v2 as cloudinary } from "cloudinary"
import { Thumbnail } from '../models/thumbnail'
import { colorSchemeDescriptions, stylePrompts } from '../utils/prompts'

export const generateThumb = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).auth()

        const {
            title,
            aspectRatio,
            style,
            colorScheme,
            prompt,
            publish
        } = req.body

        const plan = (req as any).plan

        const user = await clerkClient.users.getUser(userId)
        const free_usage = Number(user.privateMetadata.free_usage ?? 0)

        // limit check
        if (plan !== 'premium' && free_usage >= 20) {
            return res.status(403).json({
                success: false,
                message: 'Limit reached! Upgrade to Generate'
            })
        }

        // thumbnail prompt
        const styleDesc = stylePrompts[style as keyof typeof stylePrompts]
        const colorDesc = colorSchemeDescriptions[colorScheme as keyof typeof colorSchemeDescriptions]

        const finalPrompt = `
        YouTube thumbnail for: "${title}"

        Style: ${styleDesc}
        Color theme: ${colorDesc}

        - One main subject clearly visible
        - Close-up, high detail, sharp focus
        - Strong emotion or dramatic moment
        - High contrast lighting
        - Cinematic look, realistic
        - Clean background, no clutter
        - Bright, eye-catching colors

        - Big bold readable text: "${title}"
        - Text should be large, clear, high contrast

        ${prompt ? `Extra details: ${prompt}` : ""}

        `.trim()

        // api
        const formData = new FormData()
        formData.append('prompt', finalPrompt)

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {//Headers = key-value pairs that tells server the context of req.
                    'x-api-key': process.env.CLIPDROP_API_KEY!
                },
                responseType: 'arraybuffer'//telling axios to don't parse this response
            }
        )

        //image = actual bytes (0s and 1s)
        /* Buffer = Node.js ka “box” jisme wo bytes safely store hote hain

        API directly “Buffer” nahi bhejta.
        API bhejta hai: raw HTTP response body (binary stream)
        browser/axios/node usko Buffer/ArrayBuffer format me represent karta hai
        */

        // ---------- BUFFER TO BASE64 ----------
        const base64Image = Buffer.from(data).toString('base64')
        const imageData = `data:image/png;base64,${base64Image}`

        // ---------- CLOUDINARY UPLOAD ----------
        const uploadResult = await cloudinary.uploader.upload(imageData, {
            folder: 'thumbnail-generations'
        })
        const imageUrl = uploadResult.secure_url

        // ---------- SAVE DB ----------
        let lastSerial = await Thumbnail.findOne().sort({ serial: -1 })
        const latestSerial = lastSerial ? lastSerial.serial + 1 : 1

        const thumbnail = await Thumbnail.create({
            serial: latestSerial,
            userId,
            title,
            imageUrl,
            aspectRatio: aspectRatio,
            style,
            colorScheme,
            prompt: prompt || "",
            publish: publish || false
        })

        // ---------- UPDATE USAGE ----------
        await clerkClient.users.updateUser(userId, {
            privateMetadata: {
                ...user.privateMetadata,
                free_usage: free_usage + 1
            }
        })

        return res.status(200).json({
            success: true,
            message: "Thumbnail generated successfully",
            data: thumbnail
        })

    } catch (err: any) {
        console.error("Thumbnail Error:", err?.response?.data || err)

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

//get all thumbnails
export const getAllThumbnails = async (req: Request, res: Response) => {

    try {
        const { userId } = (req as any).auth()

        const user = await clerkClient.users.getUser(userId)
        const plan = user.privateMetadata.plan
        const free_usage = user.privateMetadata.free_usage

        //get all imgs of this user
        const thumbnails = await Thumbnail.find({ userId }).sort({ serial: -1 })

        return res.status(200).json({
            success: true,
            plan,
            free_usage,
            count: thumbnails.length,
            thumbnails
        })

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: error.message })
        }

        return res.status(500).json({
            success: false, message: 'Something went wrong!'
        })
    }



}

//del thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).auth()
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail id is required"
            })
        }

        const deleted = await Thumbnail.findOneAndDelete({
            _id: id,
            userId
        })

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Thumbnail not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Thumbnail deleted successfully"
        })

    } catch (error: any) {
        console.log(error.message)

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}


/**
Server (Image File)
        ↓
   Raw Bytes (01010101...)
        ↓
Axios Request
        ↓
responseType: "arraybuffer"
        ↓
ArrayBuffer (JS format of binary)
        ↓
Buffer.from(res.data)
        ↓
Node.js Buffer (usable binary object)
        ↓
.toString("base64")
        ↓
Base64 String (data:image/png;base64,...)
        ↓
Frontend / HTML / API use
 */