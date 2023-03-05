
import classes from "../../styles/MainPage.module.css";
import Link from "next/link";
import lottie from 'lottie-web'

import {
  useEffect, useRef
} from "react";
function MainPage() {
  const container = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'html',
      loop: false,
      autoplay: true,
      animationData: require('../../styles/weather.json')
    })
  })
  return (
    <>
      <div className={classes.s} ref={container} >
        <div className={classes.setup}>
          <div>
            <p className={classes.wel}>Welcome </p>
          </div>
          <div> <Link href="/start" className={classes.start}>
            letstart&#8594;
          </Link>
          </div>

        </div>   </div>


    </>
  );
}
export default MainPage;
