import Head from 'next/head'
import Image from 'next/image'
import { GradientLayout } from '../components/gradientLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <GradientLayout
      color='red'
      roundImage={true}
      subtitle='Profile'
      title='Karyna Barinova'
      description='50 public playlists'
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    > Home Page</GradientLayout>
  )
}
