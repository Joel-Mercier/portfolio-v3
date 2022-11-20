import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import router from "next/router";

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

  useEffect(() => {
    console.log("useEffect");
    if (!scrollEnabled) {
      const ASScroll = require("@ashthornton/asscroll");
      const asscroll = new ASScroll();
      asscroll.enable();
      const handleRouteChange = () => {
        setTimeout(() => {
          asscroll.onResize(window.innerWidth, window.innerHeight);
        }, 500);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      setScrollEnabled(false);
    }
  }, [scrollEnabled, setScrollEnabled]);

  return (
    <div asscroll-container="true">
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
