import React from 'react'

const NavMenu = ({ children }) => {
  const handleBlur = (e) => {
    // e.preventDefault()
    e.stopPropagation()
    console.log("blurring")
    const child = document.getElementById("open-menu-icon")
    const nearChild = document.getElementById("closed-menu-icon")
    // const nearChild = findNear(child)

    child.parentElement.toggleAttribute("close")//classList.toggle("open")
    child.classList.toggle("active", false)
    child.classList.toggle("flex", false)
    child.classList.toggle("hidden", true)
    child.classList.toggle("absolute", false)

    nearChild.classList.toggle("active", true)
    nearChild.classList.toggle("hidden", false)
    nearChild.classList.toggle("absolute", true)
    // child.classList.toggle( "flex")
  }

  const handleClick = (e) => {
    e.preventDefault()

    const child = document.getElementById("open-menu-icon")
    const nearChild = document.getElementById("closed-menu-icon")
    // const nearChild = findNear(child)
    child.parentElement.toggleAttribute("open")//classList.toggle("open")
    child.classList.toggle("active")
    child.classList.toggle("flex")
    child.classList.toggle("hidden")
    child.classList.toggle("absolute")

    nearChild.classList.toggle("active")
    nearChild.classList.toggle("hidden")
    nearChild.classList.toggle("absolute")
    child.classList.toggle("flex")

  }
  return (
    <div id="navbar_menu__wrapper" className="menu max-h-[40px] flex flex-col items-end z-10  top-9 overflow-visible  right-2 " onBlur={handleBlur}>
      <menu className='burger-menu -top relative peer max-w-[50px] less-than-md:flex  hidden cursor-pointer'>
        <svg onClick={handleClick} id="closed-menu-icon" className="top-1/2 left-1/2  w-[1.6rem] aspect-square active flex  transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7ZM4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12ZM4 17C4 16.4477 4.44772 16 5 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17Z" />
        </svg>
        <svg onClick={handleClick} id="open-menu-icon" className=" top-[-12px] right-[-4px]  w-[0.8rem] aspect-square hidden  transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
        </svg>
      </menu>
      <div className=" hidden peer-open:flex flex-row greater-than-md:flex greater-than-md:flex-row max-w-[8rem]  h-max md:items-end md:justify-end greater-than-lg:items-center greater-than-lg:justify-center greater-than-lg:m-0 greater-than-lg:p-0 less-than-sm:gap-1 gap-4" >
        {children}
      </div>
    </div>
  )
}

export default NavMenu;