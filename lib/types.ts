export type User = {
    id: any
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    firstName: string
    lastName: string
    playlists: Playlist[]
}

export type Playlist = {
    id: any
    createdAt: Date
    updatedAt: Date
    name: string
    songs: any[]
    user: User
    userId: string
}

export type Song = {
    id: any
    createdAt: Date
    updatedAt: Date
    name: string
    artist: Artist
    artistId: string
    playlists: Playlist[]
    duration: string
    url: string
}

export type Artist = {
    id: any
    createdAt: Date
    updatedAt: Date
    name: string
    songs: Song[]
}
