const ContentPayment = ({ children }) => {
  return (
    <div className="content-payment-wrapper my-2 w-full   order-4 greater-than-lg:order-3 text-lg ">
      <div className="content-payment py-1 less-than-sm:px-2 px-6  w-full min-w-[230px] xs:max-w-1/4   flex flex-col  row-span-2 border shadow-lg rounded-xl ">
        {children}
      </div>

    </div>
  )
}
export default ContentPayment;