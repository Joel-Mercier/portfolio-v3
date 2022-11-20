import Head from "next/head";
import Layout from "../components/shared/layout";

const About = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>À propos | Portfolio de Joel Mercier</title>
        <meta
          name="description"
          content="Développeur orienté front-end dynamique et soucieux de fournir un travail performant, je suis actuellement développeur Ruby on Rails chez Idéematic à Strasbourg. Sur mon site vous pouvez découvrir mon profil ainsi que les réalisations que j'ai pu accomplir lors de mon parcours."
        />
      </Head>
      <h1>À propos</h1>
    </Layout>
  );
};

export default About;
