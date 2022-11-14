import fsPromises from 'fs/promises'
import path from 'path'
import Head from 'next/head'
import Layout from '../components/layout'
import { Work } from '../types/work'
import { useSpringCarousel } from 'react-spring-carousel'
import Slide from '../components/home/slide'

type Props = {
  works: Work[]
}

const Home = ({ works }: Props): JSX.Element => {
  const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
    withLoop: true,
    slideType: 'fluid',
    items: works.map((work, index) => (
      {
        id: `work-${index}`,
        renderItem: <Slide item={work} />
      }
    ))
  })
  
  return (
    <Layout>
      <Head>
        <title>Développeur Web Front End Strasbourg | Portfolio de Joel Mercier</title>
        <meta name="description" content="Développeur orienté front-end dynamique et soucieux de fournir un travail performant, je suis actuellement développeur Ruby on Rails chez Idéematic à Strasbourg. Sur mon site vous pouvez découvrir mon profil ainsi que les réalisations que j'ai pu accomplir lors de mon parcours." />
      </Head>
      <div className=''>
        {carouselFragment}
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

