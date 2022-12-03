import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { COOKIE_NAME } from '../../lib/consts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const salt = bcrypt.genSaltSync();
    const { email, password, name } = req.body

    let user

    try {
        user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt),
                name
            }
        })
    } catch (e) {
        res.status(401).json({
            error: 'User already exists'
        })
        return
    }

    const token = jwt.sign(
        {
            email: user.email,
            id: user.id,
            time: Date.now()
        },
        process.env.APP_SECRET,
        { expiresIn: '8h' }
    )

    res.setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
    )

    res.json(user)
}
