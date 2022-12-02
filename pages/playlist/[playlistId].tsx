import { GradientLayout } from "../../components/gradientLayout"
import { SongsTable } from "../../components/songsTable"
import { validateToken } from "../../lib/auth"
import { COOKIE_NAME } from "../../lib/consts"
import prisma from "../../lib/prisma"

const getBGColor = id => {
    const colors = [
        'red',
        'green',
        'blue',
        'orange',
        'purple',
        'gray',
        'teal',
        'yellow'
    ]

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
    const color = getBGColor(playlist.id)
    return (
        <GradientLayout
            color={color}
            roundImage={false}
            title={playlist.name}
            subtitle='Playlist' description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/400?random=${playlist.id}`}
        >
            <SongsTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export const getServerSideProps = async ({ query, req }) => {
    let user

    try {
        user = validateToken(req.cookies[COOKIE_NAME])
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin'
            }
        }
    }
    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.playlistId,
            userId: user.id,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    })

    return {
        props: { playlist },
    }
}

export default Playlist
