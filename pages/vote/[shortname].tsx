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
import { usePresidentManager } from '../../components/PresidentManager'

interface VotePageProps {
  president: President
  presidentsData: President[]
}

const VotePage: React.FC<VotePageProps> = ({ president, presidentsData }) => {
  const router = useRouter()
  const { setPrefetchedData } = usePrefetch()
  const { getNextPresident } = usePresidentManager(president.id)
  const [nextPresident, setNextPresident] = useState<President | null>(null)

  useEffect(() => {
    if (!nextPresident) {
      setNextPresident(getNextPresident(presidentsData, president.id))
    }
  }, [president.id, presidentsData])

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

export const getStaticProps: GetStaticProps = async (context) => {
  const shortname = context.params?.shortname as string
  const presidentFromFile = fetchPresidentShortname(shortname)
  const presidentsData = fetchPresidents()

  if (!presidentFromFile) {
    return { notFound: true }
  }

  return {
    props: {
      president: presidentFromFile,
      presidentsData,
    },
  }
}

export default VotePage