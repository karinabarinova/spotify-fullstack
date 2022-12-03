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
import { formatTime } from '../lib/formatters'

export const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(songs.findIndex(s => s.id === activeSong.id))
    const [seek, setSeek] = useState(0.0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)
    const soundRef = useRef(null)
    const repeatRef = useRef(repeat)
    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

    useEffect(() => {
        let timerId
        if (playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)
    }, [playing, isSeeking])

    useEffect(() => {
        setActiveSong(songs[index])
    }, [index, setActiveSong, songs])

    useEffect(() => {
        repeatRef.current = repeat
    }, [repeat])

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

    const prevSong = () => {
        setIndex((state) => {
            return state ? state - 1 : songs.length - 1
        })
    }

    const nextSong = () => {
        setIndex((state) => {
            if (shuffle) {
                //shuffle logic
                const next = Math.floor(Math.random() * songs.length)

                if (next === state) {
                    return nextSong()
                }
                return next
            } else {
                return state === songs.lengt - 1 ? 0 : state + 1
            }
        })
    }

    const onSongEnd = () => {
        if (repeatRef.current) {
            setSeek(0)
            soundRef.current.seek(0)
        } else {
            nextSong()
        }
    }

    const onSeek = (e) => {
        //get min from an event array
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }

    const onLoad = () => {
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    return (
        <Box>
            <Box>
                <ReactHowler
                    ref={soundRef}
                    playing={playing}
                    src={activeSong.url}
                    onLoad={onLoad}
                    onEnd={onSongEnd}
                />
            </Box>
            <Center color='gray.600'>
                <ButtonGroup>
                    {getIcon(<MdShuffle />, 'shuffle', '25px', shuffle, onShuffle)}
                    {getIcon(<MdSkipPrevious />, 'previous', '25px', false, prevSong)}
                    {playing ? (
                        getIcon(<MdOutlinePauseCircleFilled />, 'pause', '40px', playing, () => setPlayState(false),)
                    ) : (
                        getIcon(<MdOutlinePlayCircleFilled />, 'play', '40px', !playing, () => setPlayState(true),)
                    )}
                    {getIcon(<MdSkipNext />, 'next', '25px', false, nextSong)}
                    {getIcon(<MdOutlineRepeat />, 'repeat', '25px', repeat, onRepeat)}
                </ButtonGroup>
            </Center>
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>{formatTime(seek)}</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            stop={0.1}
                            min={0}
                            id='player-range'
                            max={duration ? duration.toFixed(2) : 0}
                            onChange={onSeek}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}
