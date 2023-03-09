import { titleTagTypes as tags } from "../assets";

const PaymentType = ({  plan = { amount: 109, period: { count: 6, type: "months" } }, children }) => {
  return (
    
    <div className="payment-type-wrapper p-2 max-w-[400px] xl:w-[-webkit-fill-available]  flex flex-col  order-3 lg:order-4">
      <div className="payment-type w-full p-3 flex flex-col justify-between gap-3 border-2 rounded-2xl">
        <div className="type-description flex flex-row justify-between gap-3">
          <p className='text-lg font-[arial]'>
            {tags.paymentType.mainText}
          </p>
          <p className='px-[4px] text-blue-500 cursor-pointer'>{tags.paymentType.subText}</p>
        </div>
        <p className="installment flex gap-2 items-baseline">
          <span className="amount py-1 px-2 bg-yellow-400 rounded-md text-base font-[arial]">
            {plan.amount + " ₽"}
          </span>
          <span className="time-span text-sm font-[arial]">
            {"× " + plan.period.count + " " + plan.period.type}
          </span>
        </p>
      </div>
      <div className="children-wrapper px-2">
        {children}

      </div>
    </div>
  )
}
export default PaymentType;