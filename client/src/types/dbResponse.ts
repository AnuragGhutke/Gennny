export type ImageType = {
  _id: string
  serial: number
  userId: string
  prompt: string
  imageUrl: string
  publish: boolean
  likes: number
  createdAt: string
  updatedAt: string
}

export type ThumbnailType ={
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