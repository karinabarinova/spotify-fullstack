import { Box, Table, Thead, Td, Tbody, Tr, IconButton, Th } from '@chakra-ui/react'
import { BsFillPlayFill, BsHeart } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { formatDate, formatTime } from '../lib/formatters'

export const SongsTable = ({ songs }) => {
    return (
        <Box bg='transparent' color='white'>
            <Box padding='10px' marginBottom='20px'>
                <IconButton
                    icon={<BsFillPlayFill fontSize='30px' />}
                    colorScheme='green'
                    aria-label='play'
                    isRound={true}
                    size='lg'
                    marginRight={5}
                />
                <IconButton
                    icon={<BsHeart fontSize='25px' color='green' />}
                    colorScheme='transparent'
                    aria-label='play'
                    isRound={true}
                    size='lg'
                    marginRight={5}
                />
                <IconButton
                    icon={< MdOutlineMoreHoriz fontSize='30px' />}
                    colorScheme='transparent'
                    aria-label='more'
                    isRound={true}
                    size='lg'
                />
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
                    {songs.map(({ id, name, createdAt, url, duration }, i) => (
                        <Tr sx={{
                            transition: 'all .3s',
                            '&:hover': {
                                bg: 'rgba(255, 255, 255, 0.1)'
                            }
                        }} key={id} cursor='pointer'>
                            <Td>{i + 1}</Td>
                            <Td>
                                {name}
                            </Td>
                            <Td>{formatDate(createdAt)}</Td>
                            <Td>{formatTime(duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
