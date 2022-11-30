import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import { artistsData } from './songsData'

const prisma = new PrismaClient()

const run = async () => {
    await Promise.all(artistsData.map(async ({ name, songs }) => {
        return prisma.artist.upsert({
            where: { name },
            update: {},
            create: {
                name,
                songs: {
                    create: songs.map(({ duration, name, url }) => ({
                        name,
                        duration,
                        url
                    }))
                }
            }
        })
    }))

    const salt = bcrypt.genSaltSync()
    const user = await prisma.user.upsert({
        where: {
            email: 'user@test.com',
        },
        update: {},
        create: {
            email: 'user@test.com',
            password: bcrypt.hashSync('123456', salt),
            name: 'John Doe'
        }
    })
}

run()
    .catch(e => {
        console.error('Error: ', e)
        process.exit(1)
    })
    .then()
    .finally(async () => {
        await prisma.$disconnect()
    })
