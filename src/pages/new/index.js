import { useEffect,useRef } from "react"
import lottie from 'lottie-web'
 function ani(){
    const container= useRef(null)
useEffect(()=>{
    lottie.loadAnimation({
        container:container.current,
        renderer:'html',
        loop:true,
        autoplay:true,
        animationData:require('../../styles/ani.json')
    })
})
return<div ref={container} ></div>
}
export default ani