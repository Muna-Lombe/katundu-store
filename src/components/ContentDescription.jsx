const ContentDescription = ({ id, first, children }) => {
  return (
    <div id={'content_desc_' + id} className={"content-description " + (first ? "flex" : "hidden") + " flex-col gap-3 text-sm"}>
      {children}
    </div>
  )
}
export default ContentDescription;