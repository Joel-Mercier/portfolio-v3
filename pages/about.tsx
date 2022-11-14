import Head from 'next/head'
import Layout from '../components/layout'

const About = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Développeur Web Front End Strasbourg | Portfolio de Joel Mercier</title>
        <meta name="description" content="Développeur orienté front-end dynamique et soucieux de fournir un travail performant, je suis actuellement développeur Ruby on Rails chez Idéematic à Strasbourg. Sur mon site vous pouvez découvrir mon profil ainsi que les réalisations que j'ai pu accomplir lors de mon parcours." />
      </Head>
      <h1>About</h1>
    </Layout>
  )
}

export default About
