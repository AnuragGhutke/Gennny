import { clerkClient } from "@clerk/express"
import axios from "axios"
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"
import { Image } from "../models/image"
import FormData from "form-data"

export const generateImage = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).auth()
        const { prompt, publish } = req.body
        const plan = (req as any).plan

        const user = await clerkClient.users.getUser(userId)

        const free_usage = (user.privateMetadata.free_usage as number) || 0

        //limit check
        if (plan !== 'premium' && free_usage >= 20) {
            return res.status(403).json({
                success: false,
                message: 'Limit reached! Upgrade to Generate'
            })
        }

        //clipdrop api
        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData, {// Clipdrop,  genrate image frm this prompt
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY },
            responseType: 'arraybuffer'//clipdrop sending back raw binary data of img not json
        })

        //binary to base64 conversion
        const base64Image = `data:image/png;base64,${Buffer.from(data).toString('base64')}`
        //data:image/png;base64,iVBORw0KGgoAAA...

        //upload to cloudinary
        const result = await cloudinary.uploader.upload(base64Image, { folder: 'gennny-generations' })

        const imageUrl = result.secure_url
        let lastSerial = await Image.findOne().sort({ serial: -1 }) // -1 = highest value first se sort kroo db me

        const latestSerial = lastSerial ? lastSerial.serial + 1 : 1

        await Image.create({
            serial: latestSerial,
            userId,
            prompt,
            imageUrl,
            publish: publish || false,
            createdAt: new Date()
        })



        await clerkClient.users.updateUser(userId, {
            privateMetadata: {
                ...user.privateMetadata,
                free_usage: free_usage + 1
            }
        })

        return res.status(200).json({
            success: true,
            image: imageUrl,
            usage: free_usage + 1
        })
    }
    catch (err: any) {

        //this err to show dev full err
        console.error("STATUS:", err?.response?.status)
        console.error("HEADERS:", err?.response?.headers)
        console.error("DATA:", err?.response?.data?.toString())

        if (err instanceof Error) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

        return res.status(500).json({
            success: false,
            message: 'something went wrong!'
        })
    }
}

/*
Prompt
 ↓
Clipdrop (image generate)
 ↓
Cloudinary (store image)
 ↓
MongoDB (save prompt + imageUrl)
 ↓
Clerk (usage update)
 ↓
Return imageUrl
*/

export const getAllImgs = async (req: Request, res: Response) => {

    try {
        const { userId } = (req as any).auth()

        const user = await clerkClient.users.getUser(userId)
        const plan = user.privateMetadata?.plan || 'free'
        const free_usage = user.privateMetadata?.free_usage || 0

        //get all imgs of this user
        const genImgs = await Image.find({ userId }).sort({ serial: -1 })

        return res.status(200).json({
            success: true,
            plan,
            free_usage,
            count: genImgs.length,
            images: genImgs
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