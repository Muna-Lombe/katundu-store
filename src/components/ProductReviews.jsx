import { CheckIco, StarIco, ThumbIco, titleTagTypes as tags } from "../assets"
import { image1_1, imagepath } from "../assets/images"
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'
import no_avtr_path from '../assets/tests/jsonServer/img/placeholders/avatar.png'
import { useSelector } from "react-redux"
import { authenticatedUsers, isAuthedUser } from "../orm/selectors"
import types from "../orm/actions/actionTypes"
import { useLocation, useNavigate } from "react-router-dom"

const ProductReviews=({prs})=>{
  const goto = useNavigate()
  const location = useLocation()
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))



 
  const AddReview = ({ }) => {
    const handlePost = (e) =>{
      e.preventDefault()
      document.getElementById("add-review-input").value=""
    }
    const Component  = () => (
      <div className="add-review p-6  flex flex-col gap-2 bg-slate-200 border rounded-lg">
        <p className="main-title text-lg font-raleway lining-nums tabular-nums  font-medium">
          {tags.addReview.mainText}
        </p>
        <p className="sub-title text-sm font-raleway lining-nums tabular-nums  font-normal">
          {tags.addReview.subText}
        </p>
        <input id="add-review-input" type="text" name="add-review-input" placeholder='Post a review' className="p-3 max-w-md border-2 border-slate-400 rounded-lg" />
        <input type="button"  value="Add Review" onClick={handlePost} className="  p-1 w-max bg-orange-500 rounded-lg text-white text-sm font-raleway lining-nums tabular-nums  font-semibold cursor-pointer" />

      </div>
    )
    return (
      <>
        {
          (!authSessions.length || authSessions?.some(as => as.authStatus === types.AUTH_EXPIRED || !userAuthed))
            ? ""
            : <Component />
        }
      </>
      
    )
  }
  const ReviewImages =({imageArray})=>(
    <div className="review-images-wrapper w-auto max-w-[570px] overflow-clip">
      <div className="review-images w-full max-w-max flex flex-row gap-2 border-b-2 overflow-x-scroll scrollbar">
        {
          imageArray?.map((i,x)=>{
            return (
              <img key={x} src={imagepath(i.image_url) || no_img_path} alt={"review-img-"+x}
            className="min-w-[40px] aspect-square "
            />
            )
          })
        }

      </div>

    </div>
  )
  const Stars = ({ count, max=count }) => (
    <p className="relative flex flex-row text-yellow-500 ">
      {
        new Array(max).fill("").map((i, x) => {
          return <StarIco key={x} value={x+1} count={count} maxCount={max} />
        })
      }
      
    </p>
  )
  const OverallRating = ({hasGap=false, summary})=> {
    const userNotAuthed = !authSessions.length || authSessions?.some(as => as.authStatus === types.AUTH_EXPIRED || !userAuthed)
    const handleRedirect = (e) => {
      e.preventDefault()
      if (userNotAuthed){ 
        goto("/signin", { state: { ...location } })
      }
    }
    
    const GradeCount =({grade=2, maxCount=10, total=100})=>(
      <div className="rating-count flex flex-row gap-4">
        <div className="star-grade w-11 flex flex-row gap-1 text-slate-300 text-sm font-raleway lining-nums tabular-nums  font-semibold align-bottom text-end">
          <span className="grade-value text-[20px] leading-6">
            {grade}
          </span>
          <span className="grade-text  h-8 flex items-baseline leading-[30px] align-bottom">
            {" star" + (grade > 1 ? "s" : "")}
          </span>
        </div>
        <div className="progress-visual mx-2 ">
          <progress value={maxCount} max={total} color="yellow" className="[&]:appearance-none [&]:w-52 [&]:h-2 [&]:rounded-xl [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-bar]:rounded-xl [&::-webkit-progress-value]:bg-yellow-400 [&::-webkit-progress-value]:rounded-xl  "></progress>
        </div>
        <div className="grade-count">
          {maxCount}
        </div>
      </div>
    )

    const RatingAverage =()=>{
      const summaryValues = summary.ratings.summary.map(s=> s.value)
      const avg = (summaryValues.reduce((a, b) => a + b) / summaryValues.sort((a, b) => b-a)[0]).toFixed(1)
      const total = summaryValues.length
      return (
        <div className="rating-total my-2 px-1 flex flex-row justify-center items-baseline gap-4 border-b-[3px] text-xl">
          <div className="star-count">
            {/* {"⭐⭐⭐⭐⭐"} */}
            <Stars count={avg} max={total} />
          </div>
          <div className="number-count font-raleway lining-nums tabular-nums  font-semibold leading-snug">
            {avg+"/"+total}
          </div>
        </div>
      )
      }

    const RatingsSummary=()=>(
      <div className="varied-rating-grade-totals less-than-md:hidden my-5">
        {
          summary.ratings.summary.map((s,x)=> <GradeCount key={x} grade={s.grade} maxCount={s.value} total={summary.reviewTotal} />)
        }
        
      </div>
    )
    const AddIco =()=>(
      <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" /> </svg>

    )
    const ReviewBtn=()=>(
      <p onClick={handleRedirect} className="review-btn  ">
        <input type="button" value="Add Review" className=" less-than-md:hidden p-2 w-full bg-blue-500 rounded-xl text-white text-lg font-raleway lining-nums tabular-nums  font-semibold cursor-pointer" />
        <button type="button" className={(userNotAuthed ? " ": " hidden ")+"greater-than-md:hidden  w-full  rounded-xl hover:text-orange-600 text-orange-500 text-xl leading-3 font-raleway lining-nums tabular-nums  font-semibold cursor-pointer "} >
      
          <AddIco/>
        </button>
      </p>
    )
    return (
      <div className={"overall-rating px-2 flex lg:flex-col"+ (hasGap ? " gap-4 justify-start items-center " : "")}>

        <RatingAverage/>
        <RatingsSummary/>
        <ReviewBtn/>
      </div>
    )
  }
  const Review =({review})=>{
    return (
      <div className="review-component w-full p-2 flex gap-2 justify-between">
        <div className="reviewer flex flex-col gap-3">
          <div className="reviewer-avtr flex justify-self-start gap-2">
            <img src={imagepath(review?.i) || review.reviewer.avtr_url || no_avtr_path|| no_img_path} alt="" className="w-[50px] min-w-[50px] h-max aspect-square  border-2 rounded-3xl" />
            <div className="reviewer-name-date-ranking  sm:w-full sm:max-w-full xs:max-w-xs flex flex-col xs:flex-col sm:flex-row lg:flex-col justify-between ">
              <p className="name text-lg font-medium ">
                {review.reviewer.name}
              </p>
              <div className="review-date-rating   flex flex-col float-left">
                <div className="review-date text-slate-400 text-base font-raleway lining-nums tabular-nums ">
                  {review.datePosted}
                </div>
                <div className="review-rating flex flex-row">
                  {
                    new Array(review.reviewRanking).fill(1).map((i, x) => <Stars key={x} count={i} max={i} />)
                  }
                </div>

              </div>
            </div>
          </div>
          <div className="review-details my-2 less-than-xs:ml-0 ml-12 px-2 flex flex-col gap-8">
            <div className="purchase-platform-brief  flex flex-col gap-2 font-raleway lining-nums tabular-nums  font-medium">
              <div className="platform w-max px-3 py-1 flex justify-around gap-2 bg-[#F2F5F9] border-1 rounded-xl text-[#5d5d5d] text-sm font-raleway lining-nums tabular-nums  font-semibold">
                <p className="text-blue-500">
                  <CheckIco />
                </p>
                <p className="less-than-xs:hidden">{"purchased on Katundu"}</p>
              </div>
              <div className="brief-outline">
                <p>{"brief description"}</p>
                {
                  review.quantifiers.map((q, x) =>
                    <p key={x} className="flex flex-col xs:flex-col sm:flex-row lg:flex-col gap-1">
                      <span className="quantifier-name text-slate-400 text-base">{q.quantifier}:</span>
                      <span className="quantifier-value text-base">{q.value}</span>
                    </p>

                  )
                }

              </div>
            </div>
            {
              review.images
              ? <ReviewImages imageArray={review.images}/>
              :""
            }
            <div className="reviewer-comment">
              <p className=" my-3 flex flex-col gap-1 ">
                <span className="comment-title text-slate-400 text-lg">{"Comment"}</span>
                <span className="comment-text whitespace-normal text-base">{review.comment}</span>
              </p>

            </div>
            <div className="helpful-review-rank w-max flex flex-col gap-2 ">
              <p className="title text-slate-400 text-sm ">{"Was this review helpful?"}</p>
              <div className="ranking flex flex-row gap-2">
                <p className="rank-yes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button">
                  <span className="text-slate-500">
                    <ThumbIco />
                  </span>
                  <span className="rank-count">
                    {review.rating.upvotes}
                  </span>
                </p>
                <p className="rank-no py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600  font-raleway lining-nums tabular-nums " role="button">
                  <span className="text-slate-500">
                    <ThumbIco invert />
                  </span>
                  <span className="rank-count">
                    {review.rating.downvotes}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
  const Reviews =({reviews, k=1})=>{
    
    return(
      reviews?.map((r, x) => <Review key={x} review={r} />) 
    )
  }
  return(

    <div className="reviews-container py-1 px-2 w-full  flex flex-row justify-between gap-3">
      <div className="reviews-wrapper w-full flex flex-col">
        <ReviewImages imageArray={prs.reviewsSummary.reviewsImages} />
        <div className="rating-hidden-at-big-screen greater-than-md:hidden">
          <OverallRating summary={prs.reviewsSummary} hasGap={true}/>
          <AddReview/>

        </div>

        <Reviews reviews={prs.reviews}/>
      </div>
      <div className="rating-visible-at-big-screen less-than-md:hidden">
        <OverallRating summary={prs.reviewsSummary}/>

      </div>

    </div>
  )
}

export default ProductReviews;