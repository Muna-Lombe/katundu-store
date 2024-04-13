import { useState } from "react";
import ProductReviews from "./ProductReviews";
import QAs from "./QAs";
import prs from "../assets/tests/jsonServer/ProductReviews.json"
import qas from "../assets/tests/jsonServer/QandAs.json"
import { titleTagTypes as tags } from "../assets";
import { useGetProductReviewsQuery } from "../js/middleware/queryHandler";
import { createdToastMessage } from "../orm/models/ToastMessageModel";
import { useDispatch } from "react-redux";
import types from "../orm/actions/actionTypes";
import LoadingStateComponent from "./LoadingStateComponent";

const ReviewsAndQuestions = ({ productId, reviewCount = 0, reviewQuestions }) => {
  const [activeTab, setActiveTab] = useState("PRs")
  const dispatch = useDispatch()
  // let prs = 
  // const qas = 
  let summary,reviews,questionsAndAnswers=null;
  const {data, isSuccess, isLoading, isError, error} = useGetProductReviewsQuery({productId})
  
  const handleClassToggle = (e, setActive) => {
    e.preventDefault()
    const toBeActiveElem = e.target;

    setActive(toBeActiveElem.classList[0])

  }
  if(isSuccess){
    // console.log("data",data)
    summary = data?.summary
    reviews = data?.reviews
    questionsAndAnswers = data?.questionAndAnswers
    reviewCount = data?.reviewCount
  }else if(isError){
    dispatch(createdToastMessage(
      {
        text:
        {
          header: "Error",
          body: "Something happened back-stage. Refresh the page and try again."
        },
        status: types.TOAST_VALID,
        type: types.TOAST_ERROR,
        id: "checkout error"
      })
    )
  }

  

  const ReviewsQuestionsWrapper = ()=>{
    const active = " active border-b-2 border-blue-500 text-black "
    const inactive = " inactive border-b-[1px] text-slate-400 border-slate-200 "
    return(
    <div id="review_and_questions" className="">
      <p className="title h-max text-2xl">
        {tags.reviewsAndQuestions.mainText}
        <b className="reviews-total-count px-2 align-super text-sm text-gray-400  font-medium">
          {reviewCount}

        </b>
        <span className="flex gap-1 items-start text-2xl font-medium">
          {/* <span className="reviews-total-count ordinal text-gray-400  font-medium">
        </span> */}
        </span>
      </p>
      

      <div className="review-questions-toggle max-w-max py-2 flex  cursor-pointer dark:text-white ">
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className={" PRs "+(activeTab === "PRs"? active : inactive)+" py-1 px-2  text-sm text-[arial] font-medium hover:text-blue-500 transition ease-linear delay-50 "}>{tags.reviewsAndQuestions.productReviewsText}</p>
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className={" QAs "+(activeTab === "QAs"? active : inactive)+" py-1 px-2 text-sm text-[arial] font-medium hover:text-blue-500 transition ease-in delay-100 "}>{tags.reviewsAndQuestions.QAsText}</p>
      </div>
      {/* {children} */}
      {
        activeTab === "PRs"
          ? <ProductReviews productId={productId} productReviewId={data?.uuid} summary={summary} prs={reviews||prs}/>
            : <QAs productId={productId} productReviewId={data?.uuid} qas={questionsAndAnswers||qas}/>
      }
    </div>
  )}
  return (
    <div className="review-questions-wrapper p-2  w-full">
          {
            isLoading
              ? <LoadingStateComponent/>
              : <ReviewsQuestionsWrapper/>
          }
          {/* <LoadingStateComponent/>
          <ReviewsQuestionsWrapper/> */}
      
    </div>
     
    
  )
}
export default ReviewsAndQuestions;