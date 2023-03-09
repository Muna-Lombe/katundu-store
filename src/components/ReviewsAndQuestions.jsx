import { useState } from "react";
import ProductReviews from "./ProductReviews";
import QAs from "./QAs";
import prs from "../assets/tests/jsonServer/ProductReviews.json"
import qas from "../assets/tests/jsonServer/QandAs.json"
import { titleTagTypes as tags } from "../assets";
const ReviewsAndQuestions = ({ reviewCount = 6298, handleClassToggle }) => {
  const [activeTab, setActiveTab] = useState("PRs")
  // let prs = 
  // const qas = 
  return (
    <div className="review-questions-wrapper p-2  w-full">
      <p className="title h-max text-2xl">
          {tags.reviewsAndQuestions.mainText}
          <b className="reviews-total-count px-2 align-super text-sm text-gray-400  font-medium">
            {prs.reviewsSummary.reviewTotal}

          </b>
        <span className="flex gap-1 items-start text-2xl font-medium">
        {/* <span className="reviews-total-count ordinal text-gray-400  font-medium">
        </span> */}
        </span>
      </p>
      <div className="review-questions-toggle max-w-max py-2 flex  cursor-pointer  ">
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" PRs active py-1 px-2 border-b-2 border-blue-500 text-sm text-[arial] text-black font-medium hover:text-blue-500 transition ease-linear delay-50 ">{tags.reviewsAndQuestions.productReviewsText}</p>
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" QAs py-1 px-2 text-sm text-[arial] text-slate-400 font-medium border-b-[1px]  hover:text-blue-500 transition ease-in delay-100 ">{tags.reviewsAndQuestions.QAsText}</p>
      </div>
      {/* {children} */}
      {
        activeTab === "PRs"
          ? <ProductReviews prs={prs}/>
          : <QAs qas={qas}/>
      }
    </div>
  )
}
export default ReviewsAndQuestions;