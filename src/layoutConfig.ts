
export const layoutConfig = {
      "col-span-2 row-span-2": {
        container: " flex flex-col gap-6",
        innerContainer: "flex w-full gap-16  ",
        outerContainer: "flex flex-col gap-20",
        image: "lg:h-full",
        innerDetails: "flex flex-col justify-between",
        showDetails: true,
        showLocation: true,
        statusState: false,
        background:"shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-b-[5px] border-r-[5px] border-t-[2px] border-l-[2px] bg-[#0D7C85] border-[#EBFF6E] rotate-[1deg] [filter:url(#ink-bleed)] ",
      },

      "col-span-1 row-span-2":{
        container: "flex-col gap-6  ",
        innerContainer: "flex flex-col gap-8",
        outerContainer: "flex flex-col gap-12",
        image: "lg:h-56",
        innerDetails: "flex justify-between",
        showDetails: true,
        showLocation: false,
        statusState:false,
         background:"bg-[#E5E7EB]  border-b-[5px] border-r-[5px] border-t-[2px] border-l-[2px] border-[#EBFF6E] rotate-[-0.5deg] [filter:url(#ink-bleed)]",
      },
      "col-span-2 row-span-1":{
        container: "flex items-center justify-between ",
        innerContainer: "flex gap-14  ",
        outerContainer: "flex flex-row-reverse justify-between gap-6",
        image: "lg:h-40",
        innerDetails: "flex flex-col gap-6",
        showDetails: false,
        showLocation: true,
        statusState: false,
         background:"bg-[#E5E7EB] border-[#EBFF6E] rotate-[-0.5deg] [filter:url(#ink-bleed)]",

      },
        "col-span-1 row-span-1":{   
        container: "flex-col gap-4",
        innerContainer: "",
        outerContainer: "flex flex-col gap-6",
        innerDetails:"",
        image: " md:h-28 lg:h-32 ",
    showDetails: false,
    showLocation: false,
    statusState: true,
     background:"bg-[#407772] border-[#EBFF6E] border-b-[5px] border-r-[5px] border-t-[2px] border-l-[2px] rotate-[0.5deg] ",
}
        
      }

    