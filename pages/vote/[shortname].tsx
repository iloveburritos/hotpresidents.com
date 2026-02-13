// pages/vote/[shortname].tsx
import React, { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import PresidentCard from '../../components/PresidentCard'
import VoteButtons from '../../components/VoteButtons'
import { fetchPresidents, fetchPresidentShortname } from '../../lib/presidents'
import { President } from '../../models/presidents'
import { useRouter } from 'next/router'
import { usePresidentStats } from '../../hooks/usePresidentStats'

interface VotePageProps {
  president: President
}

const VotePage: React.FC<VotePageProps> = ({ president }) => {
  const router = useRouter()
  const { optimisticVote, revertVote } = usePresidentStats(president)

  useEffect(() => {
    router.prefetch(`/stats/${president.shortname}`)
  }, [president, router])

  const handleVoteSuccess = () => {
    router.push(`/stats/${president.shortname}`)
  }

  // Show loading state if president data is not available
  if (!president) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading president data...</p>
        </div>
      </Layout>
    );
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