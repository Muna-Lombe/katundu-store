import React from 'react'
import ImageMagnifier from './ImageMagnifier'

const ProductImageViewer = ({images}) => {
  // const [modalOpen, setModalOpen] = useState(true)

  return (
    <div className="image-viewer p-2 w-auto less-than-lg:max-w-[400px] xs:max-w-1/4   order-1 ">
      <ImageMagnifier images={images} />
      {/* <ViewImageModal openModal={modalOpen} modalAction={setModalOpen}/> */}
    </div>
  )
}

export default ProductImageViewer