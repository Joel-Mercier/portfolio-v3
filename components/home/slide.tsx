import { Work } from "../../types/work";
import Image from "next/image";

type Props = {
  item: Work;
  onClick: () => void;
  parallaxValues: any;
};

const Slide = ({ item, onClick, parallaxValues }: Props): JSX.Element => {
  return (
    <div className="pl-2" onClick={onClick}>
      <div className="h-48 flex items-center justify-center overflow-hidden">
        <h2>{item.title}</h2>
        <div
          className="absolute top-0 right-0 bottom-0 left-0"
          style={{ transform: `translateX(${parallaxValues}%)` }}
        >
          <Image
            src={item.mainImg}
            alt={item.title}
            width="1600"
            height="679"
            className="absolute block w-auto min-h-full min-w-full max-w-none top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
