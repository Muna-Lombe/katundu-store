import { ArrowRight, titleTagTypes as tags } from "../assets";

const PickupPoints = ({  points = { date: { day_tag: "tomorrow", date_text: "6 February" }, price: 0 } }) => (
  <span className="pickup-points p-2 flex flex-row justify-between gap-4 ">
    <span className='flex flex-col'>
      <span className="title">
        {tags.pickupPoints.text}
      </span>
      <span className="details text-slate-400 text-sm">
        <span className='date'>
          {points.date.day_tag + ", " + points.date.date_text}
        </span>
        -
        <span className="courier-price">
          {points.price > 0 ? tags.currencyType+points.price : "no charge"}
        </span>
      </span>
    </span>

    <span className="arrow-right">
      <ArrowRight />
    </span>
  </span>
)
export default PickupPoints;