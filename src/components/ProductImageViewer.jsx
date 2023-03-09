import React from 'react'
import ImageMagnifier from './ImageMagnifier'

const ProductImageViewer = ({images}) => {
  // const [modalOpen, setModalOpen] = useState(true)

  return (
    <div className="image-viewer p-2 w-auto xs:max-w-1/4  max-w-[500px] order-1 ">
      <ImageMagnifier images={images} />
      {/* <ViewImageModal openModal={modalOpen} modalAction={setModalOpen}/> */}
    </div>
  )
}

export default ProductImageViewer