import {
    ButtonGroup,
    Box,
    IconButtonProps,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
    IconButton
} from '@chakra-ui/react'
import ReactHowler from 'react-howler' //audio interface library
import { JSXElementConstructor, ReactElement, useEffect, useRef, useState } from 'react'
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { IconType } from 'react-icons'

export const Player = () => {

    const getIcon = (
        icon: ReactElement<any, string | JSXElementConstructor<any>>,
        ariaLabel: string,
        fontSize: string = '25px',
        color?: string
    ) => {
        return (
            <IconButton
                icon={icon}
                fontSize={fontSize}
                outline='none'
                variant='link'
                aria-label={ariaLabel}
                color={color}
            />
        )
    }

    return (
        <Box>
            <Box>
                {/* <ReactHowler /> */}
            </Box>
            <Center color='gray.600'>
                <ButtonGroup>
                    {getIcon(<MdShuffle />, 'shuffle')}
                    {getIcon(<MdSkipPrevious />, 'previous')}
                    {getIcon(<MdOutlinePlayCircleFilled />, 'play', '40px', 'white')}
                    {getIcon(<MdOutlinePauseCircleFilled />, 'pause', '40px', 'white')}
                    {getIcon(<MdSkipNext />, 'next')}
                    {getIcon(<MdOutlineRepeat />, 'repeat')}

                </ButtonGroup>
            </Center>
        </Box>
    )
}
