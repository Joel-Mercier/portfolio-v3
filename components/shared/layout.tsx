import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import router from "next/router";
import { useAnimationFrame } from "../../lib/useAnimationFrame";

type Props = {
  children: ReactNode;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }: Props): JSX.Element => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const asscrollRef = useRef<any>();

  useEffect(() => {
    if (!scrollEnabled) {
      const ASScroll = require("@ashthornton/asscroll");
      asscrollRef.current = new ASScroll({
        disableRaf: true,
      });
      asscrollRef.current.enable();
      const handleRouteChange = () => {
        setTimeout(() => {
          asscrollRef.current.onResize(window.innerWidth, window.innerHeight);
        }, 500);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      setScrollEnabled(false);
    }

    return () => {
      asscrollRef.current.disable();
    };
  }, [scrollEnabled]);

  useAnimationFrame(() => {
    asscrollRef.current.update();
  });

  return (
    <div asscroll-container="true" className="bg-gray-200 dark:bg-zinc-900">
      <div>
        <motion.main
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="h-full"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
