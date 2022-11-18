import { Work } from "../../types/work"
import Image from 'next/image'

type Props = {
  item: Work
}

const Slide = ({ item }: Props): JSX.Element => {
  return (
    <div className="">
      <h2>{item.title}</h2>
      <Image src={item.mainImg} alt={item.title} width="1600" height="679" />
    </div>
  )
}

export default Slide