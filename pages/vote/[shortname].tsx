// pages/vote/[shortname].tsx
import React, { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import PresidentCard from '../../components/PresidentCard'
import VoteButtons from '../../components/VoteButtons'
import { fetchPresidents, fetchPresidentShortname, fetchRandomPresident } from '../../lib/presidents'
import { President } from '../../models/presidents'
import { useRouter } from 'next/router'
import { usePrefetch } from '../../contexts/PrefetchStats'
import dynamic from 'next/dynamic'

interface VotePageProps {
  president: President
  nextPresident: President
}

const StatsDisplay = dynamic(() => import('../../components/StatsDisplay'))

const VotePage: React.FC<VotePageProps> = ({ president, nextPresident }) => {
  const router = useRouter()

  const handleVoteSuccess = () => {
    router.push(`/stats/${president.shortname}`)
  }

  useEffect(() => {
    const img = new Image()
    img.src = nextPresident.imageURL
  }, [nextPresident.imageURL])

  return (
    <Layout>
      {president && (
        <>
          <PresidentCard president={president} />
          <VoteButtons president={president} onVoteSuccess={handleVoteSuccess} />
        </>
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const presidents = fetchPresidents()
  const paths = presidents.map((president) => ({
    params: { shortname: president.shortname },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const shortname = context.params?.shortname as string
  const presidentFromFile = fetchPresidentShortname(shortname)
  const nextPresident = fetchRandomPresident(presidentFromFile?.id)

  if (!presidentFromFile) {
    return { notFound: true }
  }

  return {
    props: {
      president: presidentFromFile,
      nextPresident,
    },
  }
}

export default VotePage