import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios, { type AxiosResponse, type AxiosError } from "axios";
import astro from "../assets/astro.svg";
import gun from "../assets/gun.svg";
import neptune from "../assets/neptune.svg";
import space from "../assets/space.svg";
import { FaHeartbeat } from "react-icons/fa";
import { FaSkullCrossbones } from "react-icons/fa6";
import { BsFillSlashCircleFill } from "react-icons/bs";
import { TbArrowWaveRightUp } from "react-icons/tb";
import planet from "../assets/planet.svg";
import { GiTreasureMap } from "react-icons/gi";
import { TiArrowBackOutline } from "react-icons/ti";
import Loading from "./Loading";
import CharacterError from "./CharacterError";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

interface CharacterItemProps {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  episode: [];
}

interface EpisodeData {
  id: number;
  name: string;
  episode: string;
}

function CharacterItem() {
  const [character, setCharacter] = useState<CharacterItemProps | null>(null);
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() =>{
    const tl = gsap.timeline()
    const nameElement = container.current?.querySelector(".character-name") as HTMLElement;

    if (!loading && character){
gsap.from(".character-portrait", {
  clipPath: "inset(50% 0 50% 0)", // Starts as a horizontal line in the middle
  duration: 1,
  ease: "power4.inOut",
  delay: 0.5
});


      

    tl.from(".bento-box", {
    duration: 0.8,
    y: 30,             
    opacity: 0,      
    rotationX: -15,     
    stagger: {
      each: 0.25,      
      from: "start"    
    },
    ease: "power3.out", 
  }, "1.5");

  if (nameElement) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%&$#@";
      const originalName = character.name;
      nameElement.innerText = "";

      tl.to(nameElement, {
        duration: 0.7,
        onUpdate: function() {
          // Generate random "alien code" characters
          const randomText = Array.from({ length: originalName.length }, () => 
            chars[Math.floor(Math.random() * chars.length)]
          ).join("");
          
          nameElement.innerText = randomText; 
        },
        onComplete: () => {
          nameElement.innerText = originalName; 
        }
      }, "-=1");
    }


    }
}, { 
    dependencies: [loading, character], 
    scope: container 
  });

  const statusMap = {
    Alive: {
      icon: (
        <FaHeartbeat className="text-[#EBFF6E] animate-bounce text-3xl lg:text-6xl" />
      ),
      textColor: "text-[#EBFF6E]",
      bgColor: "bg-green-900/30",
      label: "Biological Signal: Active",
    },
    Dead: {
      icon: <FaSkullCrossbones className="text-red-500 text-3xl lg:text-6xl animate-pulse" />,
      textColor: "text-red-500",
      bgColor: "bg-red-900/30",
      label: "Biological Signal: Terminated",
    },
    unknown: {
      icon: (
        <BsFillSlashCircleFill className="text-gray-400 animate-spin-slow text-3xl lg:text-6xl" />
      ),
      textColor: "text-gray-400",
      bgColor: "bg-gray-800",
      label: "Biological Signal: Out of Range",
    },
  };
  // derive current status safely (character may be null before data loads)
  const statusKey = (character?.status ?? "unknown") as keyof typeof statusMap;
  const currentStatus = statusMap[statusKey] ?? statusMap.unknown;
  useEffect(() => {
    const getCharacterData = async () => {
      try {
        setLoading(true);
        //to get the character
        const response: AxiosResponse<CharacterItemProps> = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        console.log(response.data);
        setCharacter(response.data);

        //to get episode, fetch first five episodes
        const episodePromises = response.data.episode
          .slice(0, 5)
          .map((url) => axios.get<EpisodeData>(url).then((res) => res.data));

        const episodeResults = await Promise.all(episodePromises);
        setEpisodes(episodeResults);
      } catch (error) {
        const e = error as AxiosError | unknown;
        if ((e as AxiosError).response?.status === 404) {
          // Trigger the top-level route you defined in App.tsx
          navigate("/character-not-found", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCharacterData();
    }
  }, [id, navigate]);

  if (loading) {
    return <Loading />;
  }
  if (!character) {
    return <CharacterError />;
  }
  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center p-6  border-l-2 bg-[#0D7C85] border-[#EBFF6E]  filter-[url(#ink-bleed)]  ">
      <div className="flex flex-col lg:flex-row   gap-4 lg:gap-10 bg-white p-10 rounded-lg w-full justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-b-[5px] border-r-[5px] border-t-2 border-l-2 lg:h-[85vh]  border-[#EBFF6E] rotate-[0.5deg] lg:-rotate-1 md:max-w-xl lg:max-w-7xl lg:py-12 " ref={container}>
        {/* Right hand side */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <button
            onClick={() => window.history.back()}
            className=" bg-[#EBFF6E] border-2 border-black p-3 lg:px-6 lg:py-2 font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase italic flex gap-1 w-2/3 lg:w-1/3"
          >
            <span>
              <TiArrowBackOutline className="font-bold" />
            </span>
            <span>Back to Earth</span>
          </button>

          <div className="character-portrait">
            <img
              src={character?.image}
              alt={character?.name}
              className="border-4 border-black rounded-xl w-full lg:w-[80%] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
            />
          </div>
          <div className="p-4 rounded-lg  font-mono text-xs lg:flex items-center  justify-between w-full bg-[#EBFF6E] border-2 border-black  lg:px-6 lg:py-2 font-bold shadow-[4px_4px_0px_0px_#000] hidden bento-box">
            <img src={astro} alt="astro" className="w-10  animate-pulse" />
            <img src={gun} alt="gun" className="w-10 animate-pulse " />
            <img src={neptune} alt="neptune" className="w-10 animate-pulse " />
            <img src={space} alt="space" className="w-10 animate-pulse " />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-3/5 ref={container}">
          <div className="bg-[#407772] p-3 lg:p-4 rounded-lg border-2 border-[#EBFF6E] font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#EBFF6E] flex flex-col gap-1 bento-box">
            <p className="font-black text-xl lg:text-2xl uppercase  leading-none text-black ">
              Name
            </p>
            <h4 className="font-black text-2xl lg:text-5xl  uppercase italic leading-none character-name">
              {character?.name}
            </h4>
          </div>

          <div className=" flex flex-col gap-6">
            <div className="flex flex-col gap-5 lg:flex-row justify-between">
              <div
                className={`flex flex-row-reverse md:items-start lg:flex-col lg:gap-6 lg:items-center gap-3 p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${currentStatus.bgColor} bento-box`}
              >
                {/* The Dynamic Text */}
                <div className="flex flex-col lg:gap-3">
                  <span className="text-[15px] font-mono uppercase opacity-70 leading-none mb-1">
                    Vital Status
                  </span>
                  <span
                    className={`font-black uppercase tracking-tighter ${currentStatus.textColor}`}
                  >
                    {currentStatus.label}
                  </span>
                </div>
                {/* The Dynamic Icon */}
                <div className="shrink-0 ">{currentStatus.icon}</div>
              </div>
              <div className=" p-4 rounded-lg border-2 border-[#EBFF6E] font-mono text-xs   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bento-box ">
                {/* origin vs current location */}
                <h4 className="uppercase text-lg lg:text-2xl font-bold">
                  origin vs current location
                </h4>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center  ">
                    <h4>Home Dimension</h4>
                    <img src={planet} alt="planet" className="w-15" />
                    <p>{character?.location.name}</p>
                  </div>
                  <div>
                    <TbArrowWaveRightUp className="text-5xl" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h4>Last Seen</h4>
                    <GiTreasureMap className="  text-[5rem] lg:text-[6rem] text-[#0D7C85]" />
                    <p>{character?.origin.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
              <div className="p-4 rounded-lg border-2   flex flex-col gap-3 bg-[#407772]  border-[#EBFF6E] font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#EBFF6E]  w-full bento-box">
                <h4 className="font-bold text-lg lg:text-2xl border-b border-[#EBFF6E]/30 ">
                  Character Dossier
                </h4>
                <p>
                  <span className="uppercase text-sm opacity-60">Species:</span>{" "}
                  {character.species}
                </p>
                <p>
                  <span className="uppercase text-sm opacity-60">Gender:</span>{" "}
                  {character.gender}
                </p>
                <p>
                  <span className="uppercase text-sm opacity-60">Origin:</span>{" "}
                  {character.origin.name}
                </p>
              </div>
              {/* EPISODE TERMINAL */}
              <div className="bg-black p-4 rounded-lg border-2 border-[#EBFF6E] font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full bento-box">
                <p className="text-[#EBFF6E] mb-2 uppercase tracking-widest border-b border-[#EBFF6E]/30 pb-1 ">
                  Recent Logs:
                </p>
                <div className="flex flex-col gap-3">
                  {episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className="text-[#87F54E] flex space-between mb-2 gap-4"
                    >
                      <span>{ep.episode}</span>
                      <span className="text-white opacity-80">{ep.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg  font-mono text-xs flex items-center  justify-between w-full bg-[#EBFF6E] border-2 border-black  lg:px-6 lg:py-2 font-bold shadow-[4px_4px_0px_0px_#000] lg:hidden bento-box ">
            <img src={astro} alt="astro" className="w-10  animate-pulse" />
            <img src={gun} alt="gun" className="w-10 animate-pulse " />
            <img src={neptune} alt="neptune" className="w-10 animate-pulse  " />
            <img src={space} alt="space" className="w-10  animate-pulse " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterItem;
