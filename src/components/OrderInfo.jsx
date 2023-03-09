import { titleTagTypes as tags} from "../assets";


const OrderInfo = ({  children }) => {
  return (
    <div className="order-info w-full flex flex-col">
      <p className="order-title text-lg font-[arial]">
        {tags.orderInfo.text}
      </p>
      <p className="order-details  flex flex-row">

        {children}
      </p>
    </div>
  )
}
export default OrderInfo;