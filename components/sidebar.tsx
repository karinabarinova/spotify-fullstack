import NextImage from "next/image"
import NextLink from "next/link"
import { Box, List, ListItem, Divider, Center, LinkBox, LinkOverlay } from "@chakra-ui/layout"
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md'
import { LListItem } from "./listItem"
import { usePlaylist } from "../lib/hooks"

const navMenu = [
    {
        name: "Home",
        icon: MdHome,
        route: "/"
    },
    {
        name: "Search",
        icon: MdSearch,
        route: "/search"
    },
    {
        name: "Your Library",
        icon: MdLibraryMusic,
        route: "/library"
    },
]

const musicMenu = [
    {
        name: "Create Playlist",
        icon: MdPlaylistAdd,
        route: "/"
    },
    {
        name: "Favourites",
        icon: MdFavorite,
        route: "/favourites"
    },
]

export const Sidebar = () => {
    const { playlists } = usePlaylist()

    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <NextImage src="/logo.svg" height={60} width={120} />
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {navMenu.map(item => (
                            <LListItem item={item} key={item.name} />
                        ))}
                    </List>
                </Box>
                <Box marginTop="20px">
                    <List spacing={2}>
                        {musicMenu.map(item => (
                            <LListItem item={item} key={item.name} />
                        ))}
                    </List>
                </Box>
                <Divider color="gray.800" />
                <Box height="66%" overflowY="auto" paddingY="20px">
                    <List spacing={2}>
                        {playlists.map(item => (
                            <ListItem paddingX="20px" key={item.id}>
                                <LinkBox>
                                    <NextLink href="/" passHref>
                                        <LinkOverlay>
                                            {item.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box >
    )
}
