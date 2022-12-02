import { Box, Flex, Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

export const GradientLayout = ({
    image,
    title,
    subtitle,
    description,
    color,
    children,
    roundImage
}) => {
    return (
        <Box
            height='100%'
            overflowY='auto' bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}
        >
            <Flex bg={`${color}.600`} paddingY='40px' paddingX='10px' align='end'>
                <Box padding='10px'>
                    <Image boxSize='160px' boxShadow='2xl' src={image} borderRadius={roundImage ? '100%' : '3px'}></Image>
                </Box>
                <Box padding='10px' lineHeight='40px' color='white'>
                    <Text fontSize="x-small" fontWeight='bold' casing='uppercase'>
                        {subtitle}
                    </Text>
                    <Text fontSize="6xl">
                        {title}
                    </Text>
                    <Text fontSize='x-small'>
                        {description}
                    </Text>
                </Box>
            </Flex>
            <Box paddingY='50px'>{children}</Box>
        </Box>
    )
}
