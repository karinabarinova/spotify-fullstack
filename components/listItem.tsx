import NextLink from "next/link"
import { ListItem, ListIcon, LinkBox, LinkOverlay } from "@chakra-ui/layout"

export const LListItem = ({ item: { name, route, icon } }) => {
    return (
        <ListItem paddingX="20px" fontSize="16px" key={name}>
            <LinkBox>
                <NextLink href={route} passHref>
                    <LinkOverlay>
                        <ListIcon as={icon} color="white" marginRight="20px" />
                        {name}
                    </LinkOverlay>
                </NextLink>
            </LinkBox>
        </ListItem>
    )
}
