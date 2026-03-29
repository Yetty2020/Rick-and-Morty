export const layoutConfig = {
      "col-span-2 row-span-2": {
        container: " flex flex-col gap-4 items-center",
        innerContainer: "flex gap-4 ",
        outerContainer: "flex flex-col gap-4 w-full",
        image: "lg:h-full",
        innerDetails: "flex flex-col justify-between",
        showDetails: true,
        showLocation: true
      },

      "col-span-1 row-span-2":{
        container: "flex-col gap-6  ",
        innerContainer: "flex flex-col gap-4",
        outerContainer: "flex flex-col gap-6",
        image: "lg:h-56",
        innerDetails: "flex justify-between",
        showDetails: true,
        showLocation: false,
      },
      "col-span-2 row-span-1":{
        container: "flex items-center justify-between ",
        innerContainer: "flex   ",
        outerContainer: "flex flex-row-reverse justify-between",
        image: "lg:h-40",
        innerDetails: "flex flex-col",
        showDetails: false,
        showLocation: false,

      },
        "col-span-1 row-span-1":{   
        container: "flex-col gap-4",
        innerContainer: "",
        outerContainer: "",
        innerDetails:"",
        image: " md:h-28 lg:h-40 ",
    showDetails: false,
    showLocation: false,
}
        
      }

    