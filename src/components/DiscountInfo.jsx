import { BellIco } from "../assets";
import { titleTagTypes as tags } from "../assets";

const DiscountInfo = ({ children }) => {
    return (
      <div className="discount-information  py-1 gap-1 flex flex-col">
        <p className="best-price-note text-slate-500 font-raleway lining-nums tabular-nums  text-base cursor-pointer">
          {tags.discountInfo.titleText}
        </p>
        <p className='line-through border-b-[2px] border-slate-700'></p>
        <p className="learn-more-tag flex flex-row items-baseline gap-2  text-slate-500 font-raleway lining-nums tabular-nums  text-base cursor-pointer">
          <span className="text-sm text-green-500 font-bold stroke-green-500">
            <BellIco bold />
          </span>
          <span>{tags.discountInfo.moreText}</span>
        </p>
      </div>
    )
  }
export default DiscountInfo;