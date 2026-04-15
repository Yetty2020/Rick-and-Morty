import header from "../assets/Header.svg"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
import { useRef } from 'react';


function Header() {


  const container = useRef(null)

  useGSAP(() => {
    gsap.from(".header-logo", {
      scale: 2, 
    opacity: 0, 
    filter: "blur(20px)",
    duration: 1.5,
    ease: "power2.out"
    })
  }, {scope:container})//tells Gsap to only look in the scope of the container
  return (
    <div className="flex items-center justify-center w-full p-4 md:px-6 lg:py-10 " ref={container}>
        <img src={header} alt="Rick and Morty" className="header-logo"/>
      
    </div>
  )
}

export default Header
