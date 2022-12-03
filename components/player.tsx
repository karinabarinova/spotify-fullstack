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

export const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(0)
    const [seek, setSeek] = useState(0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0)


    const getIcon = (
        icon: ReactElement<any, string | JSXElementConstructor<any>>,
        ariaLabel: string,
        fontSize: string,
        active: boolean = false,
        onClick: () => void
    ) => {
        return (
            <IconButton
                icon={icon}
                fontSize={fontSize}
                outline='none'
                variant='link'
                aria-label={ariaLabel}
                color={active ? 'white' : 'gray.600'}
                onClick={onClick}
            />
        )
    }

    const setPlayState = (value: boolean) => {
        setPlaying(value)
    }

    const onShuffle = () => {
        //setting state is async, there is no guarantee that this will work
        //setShuffle(!shuffle)
        //that's why we are using a callback to make sure we're working with the current state
        setShuffle((state) => !state)
    }

    const onRepeat = () => {
        setRepeat((state) => !state)
    }

    return (
        <Box>
            <Box>
                {/* <ReactHowler
                    playing={playing}
                    src={activeSong.url}
                /> */}
            </Box>
            <Center color='gray.600'>
                <ButtonGroup>
                    {getIcon(<MdShuffle />, 'shuffle', '25px', shuffle, onShuffle)}
                    {getIcon(<MdSkipPrevious />, 'previous', '25px')}
                    {playing ? (
                        getIcon(<MdOutlinePauseCircleFilled />, 'pause', '40px', playing, () => setPlayState(false),)
                    ) : (
                        getIcon(<MdOutlinePlayCircleFilled />, 'play', '40px', !playing, () => setPlayState(true),)
                    )}
                    {getIcon(<MdSkipNext />, 'next', '25px')}
                    {getIcon(<MdOutlineRepeat />, 'repeat', '25px', repeat, onRepeat)}
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
