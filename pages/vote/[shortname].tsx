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
import { usePresidentStats } from '../../hooks/usePresidentStats'

interface VotePageProps {
  president: President
}

const VotePage: React.FC<VotePageProps> = ({ president }) => {
  const router = useRouter()
  const { setPrefetchedData } = usePrefetch()
  const [nextPresident, setNextPresident] = useState<President | null>(null)
  const { optimisticVote, revertVote } = usePresidentStats(president)

  useEffect(() => {
    if (!nextPresident) {
      const next = fetchRandomPresident(president.id)
      setNextPresident(next)
    }
  }, [president.id])

  useEffect(() => {
    // Prefetch both the next image and stats
    const prefetchData = async () => {
      // Preload current president's stats for instant stats page load
      const currentStatsResponse = await fetch(`/api/stats?id=${president.id}`)
      const currentStatsData = await currentStatsResponse.json()
      setPrefetchedData(prev => ({
        ...prev,
        [president.id]: currentStatsData
      }))

      // Preload next president's data
      const img = new Image()
      img.src = nextPresident?.imageURL || ''
      
      if (nextPresident) {
        const nextStatsResponse = await fetch(`/api/stats?id=${nextPresident.id}`)
        const nextStatsData = await nextStatsResponse.json()
        setPrefetchedData(prev => ({
          ...prev,
          [nextPresident.id]: nextStatsData
        }))
      }
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
          <VoteButtons 
            president={president} 
            onVoteSuccess={handleVoteSuccess}
            onOptimisticVote={optimisticVote}
            onRevertVote={revertVote}
          />
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