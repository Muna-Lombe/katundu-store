const ContentViewer = ({ children }) => {
  return (
    // grid - rows - [auto_minmax(0, _1fr)]
    // lg: grid xl: grid xl: grid-cols - 1 xl: grid - rows - 2  lg: grid - rows - 2
     // w - full child:flex less - than - md: child: flex - col child: gap - [8rem] greather - than - md: child: gap - [20rem] flex less - than - md: flex - row  flex - col gap - 6
    <div className="content-viewer py-6 px-4 less-than-xs:child:my-4  sm:flex md:flex lg:grid xl:grid 2xl:grid grid-flow-row  grid-row-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 flex-row flex-shrink flex-wrap md:justify-between xl:justify-between place-items-center items-start gap-x-2 xs:gap-x-2 sm:gap-x-8 greater-than-sm:gap-x-6 gap-y-4 ">
      {children}
    </div>

  )
}
export default ContentViewer;