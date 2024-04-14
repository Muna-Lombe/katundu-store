const ContentDescription = ({ id, first, children }) => {
  return (
    <div id={'content_desc_' + id} className={"content-description " + (first ? "flex" : "hidden") + " flex-col gap-1"}>
      {children}
    </div>
  )
}
export default ContentDescription;