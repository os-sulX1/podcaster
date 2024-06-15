'use client'
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

type PodcastDetailsProps = {
  params:{
    podcastId:Id<'podcasts'>
  }
}

const PodcastDetails = ({params}: PodcastDetailsProps ) => {
  const {user} = useUser()

  const podcast= useQuery(api.podcast.getPodcastById , {
    podcastId:params.podcastId
  })
  const similarPodcasts = useQuery(api.podcast.getPodcastByVoiceType, {
    podcastId:params.podcastId
  })
  const isOwner = user?.id === podcast?.authorId
  if(!similarPodcasts || !podcast) return <LoaderSpinner />
  return (
  <section className='flex w-full flex-col'>
    <header className='mt-9 flex items-center justify-between'>
      <h1 className='text-20 font-bold text-white-1'>
        Currently Playing
      </h1>
      <figure className='flex gap-3'>
        <Image
        src={'/icons/headphone.svg'}
        width={24}
        height={24}
        alt='headphone' />
        <h2 className='text-16 font-bold text-white-1'>
          {podcast?.views}
        </h2>
       
      </figure>
    </header>

    <PodcastDetailPlayer
    isOwner={isOwner}
    podcastId={podcast._id}
    {...podcast} />

    <p className='text-white-2 text-16 pt-[45px] pb-8 font-medium max-md:text-center'>
      {podcast?.podcastDescription}
    </p>

    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-18 font-bold text-white-1">Transcriptions</h1>
        <p className="text-16 font-medium text-white-2">
          {podcast?.voicePrompt}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
        <p className="text-16 font-medium text-white-2">
          {podcast?.imagePrompt}
        </p>
      </div>
    </div>

    <section className='mt-8 flex flex-col gap-5'>
      <h1 className='text-20 font-bold text-white-1'>
        Similar Podcasts
      </h1>

      {similarPodcasts && similarPodcasts.length> 0 ? (
        <div className="podcast_grid">
        {similarPodcasts?.map(({_id ,imageUrl , podcastTitle ,podcastDescription}) => (
          <PodcastCard
            title={podcastTitle}
            podcastId={_id}
            description={podcastDescription}
            imgUrl={imageUrl}
            key={_id}
          />
        ))}
      </div>
      ) : (<>
      <EmptyState
      title='No similar podcasts found'
      buttonLink='/discover'
      buttonText='Discover more podcasts' />
      </>)}


    </section>

  </section>
  )
}

export default PodcastDetails