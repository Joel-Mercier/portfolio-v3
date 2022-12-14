import fsPromises from "fs/promises";
import path from "path";
import Head from "next/head";
import Layout from "../components/shared/layout";
import { Work } from "../types/work";
import Carousel from "../components/home/carousel";

type Props = {
  works: Work[];
};

const Home = ({ works }: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>
          Développeur Web Front End Strasbourg | Portfolio de Joel Mercier
        </title>
        <meta
          name="description"
          content="Développeur orienté front-end dynamique et soucieux de fournir un travail performant, je suis actuellement développeur Ruby on Rails chez Idéematic à Strasbourg. Sur mon site vous pouvez découvrir mon profil ainsi que les réalisations que j'ai pu accomplir lors de mon parcours."
        />
      </Head>
      <div className="flex items-center justify-center w-screen h-screen">
        <Carousel slides={works} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const json = JSON.parse(jsonData.toString());
  return {
    props: {
      works: json.data.works,
    },
  };
}

export default Home;
