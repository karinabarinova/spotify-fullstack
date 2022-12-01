import useSWR from "swr";
import fetcher from "./fetcher";
import { Playlist, User } from "./types";

export const useMe = () => {
    const { data, error } = useSWR('/me', fetcher)

    return {
        user: data as unknown as User,
        isLoading: !data && !error,
        isError: error
    }
}

export const usePlaylist = () => {
    const { data, error } = useSWR('/playlist', fetcher)

    return {
        playlists: data as unknown as Playlist[] || [],
        isLoading: !data && !error,
        isError: error
    }
}
