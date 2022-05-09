import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  return {
    props: {
      tweets,
    },
  }
}

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter clone</title>
      </Head>

      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets} />
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  )
}

export default Home
