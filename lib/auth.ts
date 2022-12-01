import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_NAME } from './consts'
import prisma from './prisma'

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies[COOKIE_NAME]

        if (token) {
            let user

            try {
                const { id } = jwt.verify(token, 'secret')
                user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })

                if (!user) {
                    throw new Error('User does not exist')
                }

            } catch (e) {
                res.status(401).json({ error: 'Not Authorized' })
                return
            }
            return handler(req, res, user)

        }
        res.status(401).json({ error: 'Not Authorized' })

    }
}
