import fsPromises from 'fs/promises'
import path from 'path'
import Head from 'next/head'
import Layout from '../components/layout'
import { Work } from '../types/work'
import Slide from '../components/home/slide'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import ClassNames from 'embla-carousel-class-names'

type Props = {
  works: Work[]
}

const PARALLAX_FACTOR = 1.2;
const options = { selected: 'my-selected-class' }

const Home = ({ works }: Props): JSX.Element => {
  const wheelGestures = WheelGesturesPlugin({
    forceWheelAxis: 'y'
  })

  const [viewportRef, embla] = useEmblaCarousel({
    align: "center",
    skipSnaps: false
  }, [wheelGestures, ClassNames(options)])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [parallaxValues, setParallaxValues] = useState([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla])
  const onSlideClick = useCallback(
    (index: number) => {
      if (embla && embla.clickAllowed()) console.log(index)
    },
    [embla],
  )
  const onScroll = useCallback(() => {
    if (!embla) return

    const engine = embla.internalEngine()
    const scrollProgress = embla.scrollProgress()

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100
    })
    setParallaxValues(styles)
  }, [embla, setParallaxValues])

  useEffect(() => {
    if (!embla) return
    onSelect()
    onScroll()
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
    embla.on("resize", onScroll)
  }, [embla, onSelect])
  
  return (
    <Layout>
      <Head>
        <title>Développeur Web Front End Strasbourg | Portfolio de Joel Mercier</title>
        <meta name="description" content="Développeur orienté front-end dynamique et soucieux de fournir un travail performant, je suis actuellement développeur Ruby on Rails chez Idéematic à Strasbourg. Sur mon site vous pouvez découvrir mon profil ainsi que les réalisations que j'ai pu accomplir lors de mon parcours." />
      </Head>
      <div className="flex items-center justify-center h-full">
        <div className="relative ml-auto mr-auto">
          <div className="overflow-hidden w-full" ref={viewportRef}>
            <div className="flex select-none -ml-2">
              {works.map((work, index) => (
                <Slide item={work} key={index} onClick={() => onSlideClick(index)} parallaxValues={parallaxValues[index]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data.json')
  const jsonData = await fsPromises.readFile(filePath)
  const json = JSON.parse(jsonData)
  return {
    props: {
      works: json.data.works,
    }
  }
}

export default Home

