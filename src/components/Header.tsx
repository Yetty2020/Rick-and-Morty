import header from "../assets/Header.svg"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
import { useRef } from 'react';


function Header() {
  return (
    <div className="flex items-center justify-center w-full p-4 md:px-2 lg:py-10 ">
        <img src={header} alt="Rick and Morty" />
      
    </div>
  )
}

export default Header
