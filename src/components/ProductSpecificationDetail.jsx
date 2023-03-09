const ProductSpecificationDetail = ({ label = "Text", value = "Value" }) => (
  <p className='flex flex-col text-slate-700 text-sm font-[arial] font-medium'>
    <span>{label}</span>
    <span>{value}</span>
  </p>
)
export default ProductSpecificationDetail;