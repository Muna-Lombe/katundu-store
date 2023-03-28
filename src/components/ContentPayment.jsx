const ContentPayment = ({ children }) => {
  return (
    <div className="content-payment-wrapper xs:w-max sm:w-max md:w-max mid-md-lg:w-min order-4 greater-than-lg:order-3 text-lg ">
      <div className="content-payment py-1 less-than-sm:px-2 px-6  w-auto xs:max-w-1/4 max-w-[400px]  flex flex-col  row-span-2 border shadow-lg rounded-xl ">
        {children}
      </div>

    </div>
  )
}
export default ContentPayment;