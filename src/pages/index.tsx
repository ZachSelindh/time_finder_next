import Head from 'next/head'

import Appbar from '../components/AppBar';
import TimeFinder from '../components/TimeFinder';

export default function Home() {
  return (
    <>
      <Head>
        <title>Time Finder</title>
      </Head>
      <Appbar />
      <TimeFinder />
    </>
  )
}
