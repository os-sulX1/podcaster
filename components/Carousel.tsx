import type React from 'react'
import { useCallback } from 'react'
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type { CarouselProps } from '@/types'
import { useRouter } from 'next/navigation'
import LoaderSpinner from './LoaderSpinner'
import Image from 'next/image'



const EmblaCarousel=  ({fansLikeDetail}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [Autoplay()])
  const router =useRouter()

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )
  const slides= fansLikeDetail? fansLikeDetail?.filter(item => item.totalPodcasts > 0):null

  if(!slides)return <LoaderSpinner />

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden " ref={emblaRef}>
      <div className="flex">
        {slides.slice(0,5).map(item =>(
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<figure key={item._id}
          className='carousel_box'
          onClick={()=> router.push(`podcasts/${item.podcast[0].podcastId}`)}>
<Image src={item.imageUrl} alt='card' fill className='absolute size-full rounded-xl border-none' />
          <div className="glassmorphism-black  relative z-10 flex-col rounded-b-xl p-4 ">
            <h2 className='text-14 font-semibold text-white-1'>{item.podcast[0].podcastTitle}</h2>
            <p className='text-12 font-normal text-white-2'>{item.name}</p>
          </div>
          </figure>
        ))}
      </div>
      

        <div className="flex justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
             selected={index === selectedIndex}
            />
          ))}
        </div>
    </section>
  )
}

export default EmblaCarousel
