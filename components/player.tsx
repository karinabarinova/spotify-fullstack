import {
    ButtonGroup,
    Box,
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
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>1:21</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            stop={0.1}
                            min={0}
                            max={321}
                            id='player-range'
                        >
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>321</Text>
                    </Box>
                </Flex>

            </Box>
        </Box>
    )
}
