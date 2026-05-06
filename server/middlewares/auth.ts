import { clerkClient } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //1. clerk se userId nikalo req.auth() se
        const {userId} = (req as any).auth();
        if (!userId) {//if user not login
            return res.status(401).json({//401 Unauthorized
                success: false,
                message: "Unauthorized"
            });
        }

        //fetch user from clerk db to get full user details like metadata, plan , usageinfo 
        const user = await clerkClient.users.getUser(userId);

        //check user's plan in his metadata
        const hasPremium =
            user.publicMetadata?.plan === "premium" ||
            user.privateMetadata?.plan === "premium";

        if (!hasPremium && user.privateMetadata?.free_usage) {//agar user free plan me he and uska free usage bacha hua he
            (req as any).free_usage = user.privateMetadata.free_usage;
        } else {//ager user premium he and freeusage nahi he
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });
            (req as any).free_usage = 0;
        }

        (req as any).plan = hasPremium ? "premium" : "free";

        next();

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/* FLOW
1. req.auth() → userId
    !user->return unauthorised
        ↓
2. user fetch from Clerk
        ↓
3. check plan (premium/free)
        ↓
4. check free_usage
        ↓
5. set req.free_usage
        ↓
6. reset usage if needed
        ↓
7. set req.plan
        ↓
next()
*/