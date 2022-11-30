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
