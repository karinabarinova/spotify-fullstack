import { Box, Flex, Input, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { useSWRConfig } from "swr"
import NextImage from 'next/image'
import { auth } from "../lib/mutations"

export const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await auth(mode, {
            email, password, name
        })
        setLoading(false)
        router.push('/')
    }

    return (
        <Box height='100vh' width='100vw' bg='black' color='white'>
            <Flex justify='center' align='center' height='100px' borderBottom='white 1px solid'>
                <NextImage height='60px' width='120px' src='/logo.svg'></NextImage>
            </Flex>
            <Flex justify='center' align='center' height='calc(100vh - 100px)'>
                <Box padding='50px' bg='gray.900' borderRadius='6px'>
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} />
                        <Input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                        {Boolean(mode === 'signup') && <Input placeholder="Name" type="text" onChange={e => setName(e.target.value)} />
                        }
                        <Flex justify='center' align='center' sx={{
                            'paddingTop': '20px'
                        }}>
                            <Button type="submit" bg='green.500' isLoading={loading} sx={{
                                '&:hover': {
                                    bg: 'green.300'
                                }
                            }}>{mode.toUpperCase()}</Button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}
