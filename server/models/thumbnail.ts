import mongoose, { Schema } from 'mongoose'

interface IThumb {
    serial: number
    userId: string
    title: string
    aspectRatio: '16:9' | '1:1' | '9:16'
    style: 'Bold & Graphic' | 'Cinematic' | 'Minimal' | 'Gaming'
    colorScheme: 'Vibrant' | 'Dark' | 'Neon' | 'Pastel'
    imageUrl: string
    prompt: string
    publish: boolean
    createdAt?: Date
    updatedAt?: Date
}

const thumbnailSchema = new Schema<IThumb>({
    serial: { type: Number, required: true, unique: true },
    userId: { type: String, required: true, index:true},
    title: { type: String, required: true, trim: true },
    aspectRatio: { type: String, required: true, enum: ['16:9', '1:1', '9:16'], default: '16:9' },
    style: { type: String, required: true, enum: ['Bold & Graphic', 'Cinematic', 'Minimal', 'Gaming'] },
    colorScheme: { type: String, required: true, enum: ['Vibrant', 'Dark', 'Neon', 'Pastel']},
    imageUrl: { type: String, default: null },
    prompt: { type: String },
    publish: { type: Boolean, default: false },
},
    {
        timestamps: true
    })

export const Thumbnail = mongoose.model<IThumb>('Thumbnail', thumbnailSchema)