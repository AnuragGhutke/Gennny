import mongoose, { Schema } from "mongoose";

interface IImg {
    serial: number
    userId: string
    prompt: string
    imageUrl: string
    publish: boolean
    likes: number
    createdAt: Date
    updatedAt: Date
}

const imgSchema = new Schema<IImg>({
    serial: { type: Number, required: true, unique: true },
    userId: { type: String, required: true, index: true },
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publish: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
}, {
    timestamps: true
})

export const Image = mongoose.model<IImg>('Image', imgSchema)