import express from 'express'
import { auth } from '../middlewares/auth'
import { generateImage, getAllImgs } from '../controllers/genImg'
import { deleteThumbnail, generateThumb, getAllThumbnails } from '../controllers/genThumb'
import { communityPosts } from '../controllers/community'

export const aiRouter=express.Router()

aiRouter.post('/generate-image',auth,generateImage)
aiRouter.post('/generate-thumbnail',auth,generateThumb)

aiRouter.get('/images',auth,getAllImgs)
aiRouter.get('/thumbnails',auth,getAllThumbnails)
aiRouter.get('/community-posts',communityPosts)

aiRouter.delete('/images/:id',auth,deleteThumbnail)
