import { type Character } from "../types";
import { Link } from "react-router-dom";
import { layoutConfig } from "../layoutConfig";

interface Props {
  character: Character;
  className?: string;
}

function CharacterCard({ character, className, index }: Props & { index: number }) {
  //destructure to get the props we need
  const { id, name, image, status, species, location } = character;

  // to set a variable for the chreacter card
  let spanClass: string;
  let textSize: string;

  switch (true) {
    case index % 7 === 0:
      spanClass = "col-span-1 row-span-2 md:col-span-2 md:row-span-2";
      textSize = "text-lg md:text-5xl text-black";

      break;
    case index % 7 === 3:
      spanClass = " col-span-1 row-span-2 md:col-span-1 md:row-span-2";
      textSize = "text-lg md:text-4xl text-black";

      break;
    case index % 7 === 6:
      spanClass = "col-span-1 row-span-1 md:col-span-2 md:row-span-1";
      textSize = "text-lg md:text-4xl text-black";

      break;
    default:
      spanClass = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
      textSize = "text-lg md:text-2xl";
  }

  
  // This regex ensures we get "col-span-X" only if it's NOT prefixed by lg: or md:
const colMatch = spanClass.match(/(?<!\S)col-span-\d/); 
const rowMatch = spanClass.match(/(?<!\S)row-span-\d/);

const layoutKey = `${colMatch?.[0] ?? "col-span-1"} ${rowMatch?.[0] ?? "row-span-1"}`;

  // look up config and provide safe defaults to avoid runtime errors when a key is missing
  const defaultConfig = {
    container: "",
    innerContainer: "",
    outerContainer: "",
    image: "",
    innerDetails: "",
    showDetails: false,
    // legacy optional flags used in component
    statusState: true,
    showLocation: true,
    background: "",
  } as const;

  // avoid 'any' by using an index signature typed as unknown and then falling back
  const cfgLookup = layoutConfig as unknown as Record<
    string,
    typeof defaultConfig
  >;
  const config = cfgLookup[layoutKey] ?? defaultConfig;

  
  

  //to compare the status to the locations
  let locationStatus: string;

  switch (status.toLowerCase()) {
    case "alive":
      locationStatus = `You can find me in ${location.name}`;
      break;
    case "dead":
      locationStatus = `I was last seen in ${location.name}`;
      break;
    default:
      locationStatus = `I am alive but in an undisclosed location`;
  }
  return (
    <Link
      to={`/character/${id}`}
      className={`comic-card-split citadel-card border-4 flex flex-col items-center  px-2 py-4  rounded-sm shadow-md hover:scale-105 
  hover:shadow-[0_0_25px_rgba(151,206,76,0.4)]
  cursor-pointer  ${spanClass} relative  ${config.background} ${className}`}
    >
      {/* container div */}
      <div className={`flex flex-col`}>
        
        {/* outer container */}

        <div className={config.outerContainer}>
          {/* name */}
          <h2
            className={`text-[#EBFF6E]  uppercase font-bangers tracking-tighter font-bold ${textSize}`}
          >
            {name}
          </h2>
          {/* inner-container */}
          

          <div className={config.innerContainer}>
            {/* hide or show details */}
            {config.showDetails && (

              
              <div className={config.innerDetails}>


                

                <div className="flex flex-col items-center gap-2  border-black uppercase font-grotesk font-bold tracking-tighter relative bg-white border-[3px]  p-3 rounded-4xl max-w-fit">
                  <p>Species:</p>
                  <p className="font-space-grotesk">{species}</p>
                  <div className="absolute -bottom-3 right-6 w-6 h-6 bg-white border-b-[3px] border-r-[3px] border-black rotate-45 skew-x-15"></div>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white p-3 border-2 border-black uppercase font-grotesk font-bold tracking-tighter">
                  <p>Status:</p>
                  <p className="">{status}</p>
                </div>
              </div>
            )}

            {/* image Wrapper */}
            <div
              className={`sm:h-48 md:h-56 ${config.image} overflow-hidden rounded-xl`}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-125 group-hover:contrast-110"
              />
            </div>

            {/* <p>{location.name}</p> */}
            {config.showLocation && (
              <div className="flex flex-col items-center gap-2  border-black font-grotesk tracking-tighter  self-end w-[clamp(80px,15vw,150px)] relative bg-white border-[3px]  p-4 rounded-4xl max-w-fit">
                <p>{locationStatus}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
