// pages/vote/[shortname].tsx
import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import PresidentCard from '../../components/PresidentCard'
import VoteButtons from '../../components/VoteButtons'
import { fetchPresidents, fetchPresidentShortname, fetchRandomPresident } from '../../lib/presidents'
import { President } from '../../models/presidents'
import { useRouter } from 'next/router'
import { usePrefetch } from '../../hooks/usePrefetch'

interface VotePageProps {
  president: President
}

const VotePage: React.FC<VotePageProps> = ({ president }) => {
  const router = useRouter()
  const { setPrefetchedData } = usePrefetch()
  const [nextPresident, setNextPresident] = useState<President | null>(null)

  useEffect(() => {
    if (!nextPresident) {
      const next = fetchRandomPresident(president.id)
      setNextPresident(next)
    }
  }, [president.id])

  useEffect(() => {
    // Prefetch both the next image and stats
    const prefetchData = async () => {
      const img = new Image()
      img.src = nextPresident?.imageURL || ''
      
      const statsResponse = await fetch(`/api/stats?id=${president.id}`)
      const statsData = await statsResponse.json()
      setPrefetchedData(prev => ({
        ...prev,
        [president.id]: statsData
      }))
    }

    prefetchData()
    router.prefetch(`/stats/${president.shortname}`)
  }, [president, nextPresident, router, setPrefetchedData])

  const handleVoteSuccess = () => {
    router.push(`/stats/${president.shortname}`)
  }

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

export const getStaticProps: GetStaticProps<VotePageProps> = async ({ params }) => {
  const shortname = params?.shortname as string
  const president = fetchPresidentShortname(shortname)

  if (!president) {
    return { notFound: true }
  }

  return {
    props: {
      president,
    },
  }
}

export default VotePage