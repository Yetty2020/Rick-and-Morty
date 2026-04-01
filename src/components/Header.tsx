import header from "../assets/Header.svg"


function Header() {
  return (
    <div className="flex items-center justify-center w-full p-4 my-3 md:px-2 lg:py-10 ">
        <img src={header} alt="Rick and Morty" />
      
    </div>
  )
}

export default Header
