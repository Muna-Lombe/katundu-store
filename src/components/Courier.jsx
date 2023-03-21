
import { titleTagTypes as tags } from "../assets";

const Courier = ({ delivery = { courier: "Courier katundu", date: { day_tag: "tomorrow", date_text: "6 February" }, price: 149 } }) => (
  <span className="courier  p-2 flex flex-col  ">
    <span className="title text-lg ">
      {delivery.courier}
    </span>
    <span className="details text-slate-400 text-sm">
      <span className='date'>
        {delivery.date.day_tag + ", " + delivery.date.date_text + " "}
      </span>
      -
      <span className="courier-price">
        {" "+tags.currencyType+delivery.price}
      </span>
    </span>
  </span>
)
export default Courier;