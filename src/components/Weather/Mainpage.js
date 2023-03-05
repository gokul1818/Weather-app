import classes from "../../styles/MainPage.module.css";
import Link from "next/link";
import lottie from "lottie-web";

import { useEffect, useRef } from "react";
function MainPage() {
  const container = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../styles/weather.json"),
    });
    return () => instance.destroy();
  });
  return (
    <>
      <div className={classes.s} ref={container}></div>
      <div className={classes.setup}>
        
          <p className={classes.wel}>Welcome </p>
        </div>

        <div>
          {" "}
          <Link href="/start" className={classes.start}>
            letStart&#8594;
          </Link>
       
      </div>
    </>
  );
}
export default MainPage;
