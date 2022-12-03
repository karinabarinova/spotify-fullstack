import { Box, Table, Thead, Td, Tbody, Tr, IconButton, Th } from '@chakra-ui/react'
import { BsFillPlayFill, BsHeart } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatDate, formatTime } from '../lib/formatters'

export const SongsTable = ({ songs }) => {
    const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
    const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

    const handlePlay = (activeSong?) => {
        /**
         * If you didn't click on a songs, but the play button,
         * we should play the first song in a playlist
         */
        setActiveSong(activeSong || songs[0])
        /**
         * Entire playlist is being activated
         */
        playSongs(songs)
    }

    const buttons = [
        {
            icon: <BsFillPlayFill fontSize='30px' />,
            color: 'green',
            ariaLabel: 'play',
            isRound: true,
            marginRight: 5,
            onClick: () => handlePlay()
        },
        {
            icon: <BsHeart fontSize='25px' color='green' />,
            color: 'transparent',
            ariaLabel: 'favourite',
            marginRight: 5,
            onClick: () => { }

        },
        {
            icon: <MdOutlineMoreHoriz fontSize='30px' />,
            color: 'transparent',
            ariaLabel: 'more',
            marginRight: 0,
            onClick: () => { }
        }
    ]
    return (
        <Box bg='transparent' color='white'>
            <Box padding='10px' marginBottom='20px'>
                {buttons.map(({ icon, color, ariaLabel, marginRight, onClick }) => (
                    <IconButton
                        icon={icon}
                        colorScheme={color}
                        aria-label={ariaLabel}
                        isRound={true}
                        size='lg'
                        marginRight={marginRight}
                        onClick={onClick}
                    />
                ))}
            </Box>
            <Table variant='unstyled'>
                <Thead borderBottom='1px solid' borderColor='rgba(255, 255, 255, 0.2)'>
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Date Added</Th>
                        <Th><AiOutlineClockCircle /></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song, i) => (
                        <Tr sx={{
                            transition: 'all .3s',
                            '&:hover': {
                                bg: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                            key={song.id}
                            cursor='pointer'
                            onClick={() => handlePlay(song)}
                        >
                            <Td>{i + 1}</Td>
                            <Td>
                                {song.name}
                            </Td>
                            <Td>{formatDate(song.createdAt)}</Td>
                            <Td>{formatTime(song.duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
