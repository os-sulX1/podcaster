import PodcastCard from '@/components/PodcastCard'
import { Button } from '@/components/ui/button'
import { podcastData } from '@/constants'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1 '>Trending Podcast</h1>
        <div className="podcast_grid">
        {podcastData.map(({id, description,imgURL ,title})=>(
          <PodcastCard
          title={title}
          id={id}
          description={description}
          imgURL={imgURL}
          key={id} />
        ))}
        </div>
      </section>
    </div>
  )
}

export default Home