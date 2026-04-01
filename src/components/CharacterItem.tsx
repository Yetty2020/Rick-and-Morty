import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import astro from "../assets/astro.svg";
import gun from "../assets/gun.svg";
import neptune from "../assets/neptune.svg";
import space from "../assets/space.svg";
//import planet from "../assets/planet.svg";

interface CharacterItemProps {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  episode: []
}

interface EpisodeData {
    id: number;
    name: string;
    episode: string;
}

function CharacterItem() {
  const [character, setCharacter] = useState<CharacterItemProps | null>(null);
  const [episodes, setEpisodes] = useState<EpisodeData[]>([])
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

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
        const episodePromises = response.data.episode.slice(0,5).map((url) => 
        axios.get<EpisodeData>(url).then((res) => res.data ))

        const episodeResults = await Promise.all(episodePromises)
        setEpisodes(episodeResults)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCharacterData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!character) {
    return <div>Character not found</div>;
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-b-[5px] border-r-[5px] border-t-2 border-l-2 bg-[#0D7C85] border-[#EBFF6E] rotate-[0.5deg] filter-[url(#ink-bleed)] ">
      <div className="flex   gap-4 bg-white p-10 rounded-lg w-full max-w-3xl justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-b-[5px] border-r-[5px] border-t-2 border-l-2  border-[#EBFF6E] -rotate-1 ">
        {/* EPISODE TERMINAL */}
        <div className="bg-black p-4 rounded-lg border-2 border-[#EBFF6E] font-mono text-xs">
          <p className="text-[#EBFF6E] mb-2 uppercase tracking-widest border-b border-[#EBFF6E]/30 pb-1">Recent Logs:</p>
          {episodes.map((ep) => (
            <div key={ep.id} className="text-[#87F54E] flex justify-between mb-1">
              <span>{ep.episode}</span>
              <span className="text-white opacity-80">{ep.name}</span>
            </div>
          ))}
        </div>
       <div className="w-2/3">
         <img
          src={character?.image}
          alt={character?.name}
          className="border border-black rounded-xl w-full"
        />
       </div>
        <div className="flex flex-col gap-4 w-1/3 justify-between">
          <div className="bg-[#87F54E] p-5 rounded-xl ">
            <h4 className="font-medium text-5xl mb-10">{character?.name}</h4>
            <div className="flex flex-col gap-4">
              <p>Status: {character?.status}</p>
              <p>Species: {character?.species}</p>
              <p>Gender: {character?.gender}</p>
              <p>Origin: {character?.origin.name}</p>
            </div>
            
          </div>
          
          <div className="bg-[#87F54E] flex justify-between rounded-xl gap-3.5 p-5 w-full ">
                
              <img
                src={astro}
                alt="astro"
                className="w-10  animate-pulse"
              />
              <img
                src={gun}
                alt="gun"
                className="w-10  "
              />
              <img
                src={neptune}
                alt="neptune"
                className="w-10  "
              />
              <img
                src={space}
                alt="space"
                className="w-10  "
              />
            </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default CharacterItem;
