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
}

function CharacterItem() {
  const [character, setCharacter] = useState<CharacterItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getCharacterData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<CharacterItemProps> = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        console.log(response.data);
        setCharacter(response.data);
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
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="flex   gap-4 bg-white p-10 rounded-2xl w-full max-w-3xl justify-between">
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
