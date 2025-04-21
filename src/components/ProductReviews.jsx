import { CheckIco, CopyIco, DeleteIco, EditIco, StarIco, ThumbIco, titleTagTypes as tags } from "./icons"
import { image1_1, imagepath } from "../assets/images"
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'
import no_avtr_path from '../assets/tests/jsonServer/img/placeholders/avatar.png'
import { useDispatch, useSelector } from "react-redux"
import { authenticatedUsersV2, isAuthedUserV2, orderedByUser } from "../orm/selectors"
import types from "../orm/actions/actionTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAddReviewMutation, useRemoveReviewMutation, useUpdateReviewMutation } from "../js/middleware/queryHandler"
import PostCreatorTag from "./PostCreatorTag"


const RatingInput = ({ label, name, value, ratings, setRatings, Stars }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const getStarCount = (rating) => {
    switch (rating) {
      case 'Low': return 1;
      case 'Medium': return 3;
      case 'High': return 5;
      default: return 3;
    }
  };

  const currentValue = getStarCount(value);

  const handleRatingClick = (stars) => {
    let newRating;
    if (stars <= 2) newRating = 'Low';
    else if (stars <= 4) newRating = 'Medium';
    else newRating = 'High';

    setRatings(prev => ({
      ...prev,
      [name.toLowerCase()]: newRating
    }));
  };

  return (
    <div className="rating-input flex flex-row flex-wrap items-center gap-4">
      <label className="w-32 text-sm font-medium text-gray-700">{label}</label>
      <div className="stars flex flex-row gap-1"
           onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            className="star-button p-1 hover:scale-110 transition-transform"
          >
            <StarIcon 
              filled={hoverRating ? star <= hoverRating : star <= currentValue}
              className={`w-6 h-6 ${
                hoverRating ? 
                  star <= hoverRating ? 'text-yellow-400' : 'text-gray-300' :
                  star <= currentValue ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {value}
      </span>
    </div>
  );
};

const StarIcon = ({ filled, className }) => (
  <svg 
    className={className}
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const AddReview = ({ editMode, addReview, authSessions, userAuthed, hasOrdered, productId, productReviewId, location, Stars, goto, }) => {
  const [ratings, setRatings] = useState({
    satisfaction: editMode?.value?.quantifiers?.[0]?.value || 'Medium',
    recommend: editMode?.value?.quantifiers?.[1]?.value || 'Medium',
    quality: editMode?.value?.quantifiers?.[2]?.value || 'Medium'
  });
  const isAuthed = () => (authSessions.length || authSessions?.some(as => as.authStatus !== types.AUTH_EXPIRED || userAuthed))

  

  const handlePost = async (e, edit, updateFn) => {
    e.preventDefault();
    if (!isAuthed()) return goto("/signin", { state: { ...location } });

    // if (!hasOrdered) {
    //   const tooltip = document.getElementById("tooltip");
    //   tooltip.classList.replace("hidden", "flex");
    //   setTimeout(() => {
    //     tooltip.classList.replace("flex", "hidden");
    //   }, 3000);
    //   return;
    // }

    const form = document.forms["review_post"];
    const formData = new FormData(form);

    const reviewPost = {
      "product_review": {
        review: {
          comment: formData.get("add-review-input"),
          quantifiers: [
            {
              quantifier: "Satisfaction",
              value: ratings.satisfaction
            },
            {
              quantifier: "Likely to recommend",
              value: ratings.recommend
            },
            {
              quantifier: "Quality",
              value: ratings.quality
            }
          ]
        },
        poster_uuid: authSessions[0].uuid
      },
      type: editMode ? editMode.type : "add_review"
    };

    if (reviewPost.product_review?.review?.comment.length === 0) return;

    if (edit) {
      updateFn(reviewPost);
    } else {
      const { product_review, ...rest } = reviewPost;
      const initialReview = { product_review: { ...rest, ...product_review } };
      updateFn({ initialReview, productReviewId, productId });
    }

    document.getElementById("add-review-input").value = "";
  };

  const Tooltip = () =>{
    
    return(
      
      <div id="auth-tooltip" className="tooltip-wrapper max-w-[80%] max-h-[40px]  justify-center flex-wrap whitespace-normal transition-transform ease-linear delay-700">
        <div id="tooltip" className="tooltip hidden justify-center text-center ">
          {tags.noReviews.noOrderText}
        </div>
      </div>
    )
  }
  return (
    <div className="add-review max-w-2xl p-6 flex flex-col gap-4 dark:bg-slate-600 bg-slate-200 border dark:border-slate-500 rounded-lg">

      <form id="review_post" name="review_post" action="" onSubmit={() => ""} className="flex flex-col gap-3">
        <div className="ratings-section flex flex-col gap-3">

          <RatingInput
            label="Satisfaction"
            name="satisfaction"
            value={ratings.satisfaction}
            ratings={ratings}
            setRatings={setRatings}
            Stars={Stars}
          />
          <RatingInput
            label="Recommend"
            name="recommend"
            value={ratings.recommend}
            ratings={ratings}
            setRatings={setRatings}
            Stars={Stars}
          />
          <RatingInput
            label="Quality"
            name="quality"
            value={ratings.quality}
            ratings={ratings}
            setRatings={setRatings}
            Stars={Stars}
          />
        </div>
        <Tooltip/>
        {editMode?.value ? (
          <input
            form="review_post"
            id="add-review-input"
            type="text"
            name="add-review-input"
            placeholder='Post a review'
            defaultValue={editMode?.value?.comment || ''}
            className="p-3 max-w-md border-2 border-slate-400 rounded-lg caret-black text-black"
          />
        ) : (
          <textarea
            form="review_post"
            name="add-review-input"
            id="add-review-input"
            cols="10"
            rows="3"
            placeholder="Post a review"
            className="p-3 max-w-2xl border-2 border-slate-400 rounded-lg caret-black text-black"
          />
        )}

        <div className="update-btns flex flex-row gap-2">
          <input
            form="review_post"
            type="button"
            onClick={(e) => handlePost(e, editMode?.value, (arg) => editMode?.updateFn(arg) || addReview(arg))}
            value={editMode?.value ? "Save" : isAuthed() ? "Add Review" : "Sign In"}
            className="p-1 w-max min-w-[80px] bg-orange-500 rounded-md text-white text-sm font-raleway lining-nums tabular-nums font-semibold cursor-pointer"
          />
          {editMode?.value && (
            <input
              form="review_post"
              type="button"
              onClick={(e) => { e.preventDefault(); editMode.toggleEditMode(false) }}
              value="Cancel"
              className="p-1 w-max min-w-[80px] bg-inherit rounded-md text-slate-300 border border-transparent hover:border-slate-300 text-sm font-raleway lining-nums tabular-nums font-semibold cursor-pointer"
            />
          )}
        </div>
      </form>
    </div>
  );
};

const ProductReviews = ({ prs, summary, productId, productReviewId })=>{
  const goto = useNavigate()
  const location = useLocation()
  const authSessions = useSelector(authenticatedUsersV2)
  const userAuthed = useSelector(isAuthedUserV2(authSessions[0]?.uuid))
  const hasOrdered =useSelector(orderedByUser(productId))
  const dispatch = useDispatch()
  const [addReview, {data:addedData, isLoading:addLoading, isSuccess:addSuccess, error:addError }] = useAddReviewMutation();
  const [updateReview, {data:updatedData, isLoading:updateLoading, isError:updateError, isSuccess:updateSuccess}] = useUpdateReviewMutation();
  const [removeReview, { data: removedData, isLoading: removeLoading, isError: removeError, isSuccess: removeSuccess }] = useRemoveReviewMutation();
  
  useEffect(() => {
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.replace("hidden", "flex");
    setTimeout(() => {
      tooltip.classList.replace("flex", "hidden");
    }, 3000);
      
  
    return () => {
      // second
    }
  }, [addError])
  
  const ReviewImages =({imageArray})=>(
    <div className="review-images-wrapper w-auto max-w-[570px] overflow-clip">
      <div className="review-images w-full max-w-min flex flex-row gap-2 border-b-2 overflow-x-scroll scrollbar">
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
  const MoreActions = ({children}) => {
    
    const Option = ({children}) => (
      <div className="more-options-wrapper less-than-sm:absolute left-1 p-[2px] less-than-xs:min-w-max  min-w-[100px] items-baseline less-than-sm:border rounded-xl shadow-sm text-sm less-than-sm:hidden  less-than-sm:group-hover:flex  less-than-sm:flex-col greater-than-sm:flex greater-than-sm:flex-row less-than-sm:gap-1 gap-2 bg-white">
        {children}
        {/* <span>{"Copy to clipboard"}</span> */}
      </div>
    )
    return (
      <div className="more-actions relative py-0 flex flex-col items-center text-xl text-slate-400 font-semibold cursor-pointer group " anchor="actions-anchor">
        <p className="px-2 aspect-square greater-than-sm:hidden   hover:text-blue-500 ">{"..."}</p>
        <Option >
          {children}
        </Option>
        
      </div>
    )
  }
  const Stars = ({ count}) => (
    <p className="relative flex flex-row text-yellow-500 ">
      {
        new Array(5).fill("").map((i, x) => {
          return <StarIco key={x} value={parseFloat(x+1)} count={parseFloat(count)} maxCount={5} />
        })
      }
      
    </p>
  )
  const OverallRating = ({hasGap=false, summary={}})=> {
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
      const summaryValues = summary?.reviewRatingsSummary?.map(s=> s.value)||[]
      const avg = summaryValues.length ? (summaryValues?.reduce((a, b) => a + b) / summaryValues?.sort((a, b) => b-a)[0]).toFixed(1) : 0
      const total = summaryValues.length || 0 
      return (
        <div className="rating-total my-2 px-1 flex flex-row justify-center items-baseline gap-4 border-b-[3px] text-xl">
          <div className="star-count">
            {/* {"⭐⭐⭐⭐⭐"} */}
            <Stars count={avg} />
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
          summary?.reviewRatingsSummary?.length ? 

            summary?.reviewRatingsSummary?.map((s,x)=> <GradeCount key={x} grade={s.grade} maxCount={s.value} total={summary.reviewTotal} />)
          : Array(5).fill("").map((s,x)=> <GradeCount key={x} grade={x+1} maxCount={0} total={0} />)
        }
        
      </div>
    )
    const AddIco =()=>(
      <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" /> </svg>

    )
    const ReviewBtn=()=>(
      <p onClick={handleRedirect} className="review-btn  ">
        <input type="button" value="Add Review" className=" less-than-md:hidden p-2 w-full bg-blue-500 rounded-xl text-white dark:text-black  text-lg font-raleway lining-nums tabular-nums  font-semibold cursor-pointer" />
        <button type="button" className={(userNotAuthed ? " ": " hidden ")+"greater-than-md:hidden  w-full  rounded-xl hover:text-orange-600 text-orange-500 text-xl leading-3 font-raleway lining-nums tabular-nums  font-semibold cursor-pointer "} >
      
          <AddIco/>
        </button>
      </p>
    )
    return (
      <div className={"overall-rating px-2 flex lg:flex-col"+ (hasGap ? " gap-4 justify-start items-center " : "")}>

        <RatingAverage/>
        <RatingsSummary/>
        {/* <ReviewBtn/> */}
      </div>
    )
  }
  const ReviewComment = ({review}) =>{
    const [editComment, setEditComment] = useState(false)
    
    
    const handleEdit = (e) => {
      e.preventDefault()
      setEditComment(prev => !prev)
    }

    const handleDelete = (e, reviewId)=>{
      e.preventDefault()
      removeReview({ productId, productReviewId, reviewId })
    }
    useEffect(() => {
      
      const editBtn = document.getElementById("edit-review"+review.uuid)
      const deleteBtn = document.getElementById("delete-review"+review.uuid)

      deleteBtn?.addEventListener("click", (e)=> handleDelete(e, review.uuid))
      editBtn?.addEventListener("click", handleEdit)

      return () => {
        editBtn?.removeEventListener("click", handleEdit)
        deleteBtn?.removeEventListener("click", (e)=> handleDelete(e, review.uuid))
      }
    }, [])
    const comment = updateSuccess ? 
      (updatedData.uuid === review.uuid) && (updatedData.comment !== review?.comment) ?
        updatedData.comment
        : review?.comment
      : review?.comment 
    
    const editData = { 
      value: { comment: comment, quantifiers: review.quantifiers },
      type: "update_review_comment",
      toggleEditMode: setEditComment, 
      updateFn: (reviewBody) => {
        const { product_review, ...rest } = reviewBody
        const postUpdate = {}
        postUpdate["product_review"] = { ...rest, ...product_review }
        return updateReview({ 
          postUpdate, 
          productId, productReviewId, 
          reviewId: review.uuid 
        }) 
      }
    }

    
    return(
      <div className="reviewer-comment">
        <div className=" my-3 flex flex-col gap-1 ">
          <span className="comment-title text-slate-400 text-lg">{"Comment"}</span>
          {
            editComment ?
              <AddReview editMode={editData} addReview={addReview} authSessions={authSessions} userAuthed={userAuthed} hasOrdered={hasOrdered} productId={productId} productReviewId={productReviewId} location={location} Stars={Stars} goto={goto}  />
              : <span className="comment-text whitespace-normal text-base">{comment}</span>
          }

        </div>

      </div>
    )
  }
  const HelpfulReviewVotes = ({review})=>{
    
    const upvotes = updateSuccess ? 
      (updatedData.uuid === review.uuid) && (updatedData.upvotes !== review?.rating.upvotes) ?
        updatedData.upvotes
        : review?.rating.upvotes
      : review?.rating.upvotes
    const downvotes = updateSuccess ?
      (updatedData.uuid === review.uuid) && (updatedData.downvotes !== review?.rating.downvotes) ?
        updatedData.downvotes
        : review?.rating.downvotes
      : review?.rating.downvotes

    const handleUpvote = (e) => {
      e.preventDefault()
      updateReview({ reviewUpdate: { type: "update_review_rating", product_review: { review: { upvotes: 1}, reviewer_uuid:authSessions[0].uuid } }, productId, productReviewId, reviewId: review.uuid })
    }
    const handleDownvote = (e) => {
      e.preventDefault()
      updateReview({ reviewUpdate: { type: "update_review_rating", product_review: { review: { downvotes: 1 }, reviewer_uuid: authSessions[0].uuid } }, productId, productReviewId, reviewId: review.uuid })
    }

    return (
    <div className="helpful-review-rank w-max flex flex-col gap-2 ">
      <p className="title text-slate-400 text-sm ">{"Was this review helpful?"}</p>
      <div className="votes flex flex-row gap-2">
        <p className="review-upvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleUpvote(e) : ""}>
          <span  className="upvote-thumb text-slate-500">
            <ThumbIco />
          </span>
          <span className="rank-count">
            {upvotes}
          </span>
        </p>
        <p className="review-downvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600  font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleDownvote(e) : ""}>
            <span  className="downvote-thumb text-slate-500">
            <ThumbIco invert />
          </span>
          <span className="rank-count">
            {downvotes}
          </span>
        </p>
      </div>
    </div>
  )}
  const ReviewQuantifiers = ({quantifiers}) => {
    const Quantifier = ({quantifier, value}) => {
      return (
        <div className="quantifier flex flex-row gap-2 items-baseline">
          <p className="quantifier dark:text-white font-semibold text-base">{quantifier}</p>
          <p className="value dark:text-white  text-sm">{value}</p>
        </div>
      )
    }
    return (
      // <div className="brief-outline">
      //           <p>{"brief description"}</p>
      //           {
      //             review?.quantifiers.map((q, x) =>
      //               <p key={x} className="flex flex-col xs:flex-col sm:flex-row lg:flex-col gap-1">
      //                 <span className="quantifier-name text-slate-400 text-base">{q.quantifier}:</span>
      //                 <span className="quantifier-value text-base">{q.value}</span>
      //               </p>

      //             )
      //           }

      //         </div>
      <div className="review-quantifiers flex flex-col gap-2">
        {
          quantifiers?.map((q, x) => <Quantifier key={x} quantifier={q.quantifier} value={q.value} />)
        }
      </div>
    )
  }

  const ReviewRanking = ({review}) => {
    return (
      <div className="reviewer-ranking  flex flex-col  ">
        <div className="review-rating-actions w-max flex flex-row items-center greater-than-sm:flex-col greater-than-xs:items-end gap-2">

          <div className="review-rating flex flex-row">
            <Stars count={review?.reviewRanking} />

          </div>
          {
            (userAuthed && (review?.reviewer?.canUpdate === authSessions[0]?.uuid)) ?
              <MoreActions>
                <>
                  <div id={"edit-review" + review?.uuid} className="edit-review flex flex-row items-baseline gap-1 text-slate-400 hover:text-blue-500 text-base">
                    <p className="less-than-xs:hidden ">{"Edit"}</p>
                    <EditIco />
                  </div>
                  <div id={"delete-review" + review?.uuid} className="delete-review flex flex-row items-baseline gap-1  text-red-600  text-base hover:text-red-500">
                    <p className="less-than-xs:hidden">{"Delete"}</p>
                    <DeleteIco size={16} />
                  </div>
                </>
              </MoreActions>
              : <></>
          }

          {/* <div className="copy-review flex flex-row items-baseline gap-1">
                    <CopyIco size={16} />
                    <p className="less-than-sm:hidden text-slate-400 hover:text-blue-500 text-base ">{"Copy"}</p>

                  </div> */}

        </div>
      </div>
    )
  }
  const Review =({review})=>{
    return (
      <div className="review-component w-full p-2 flex gap-2 justify-between">
        <div className="reviewer w-full flex flex-col gap-3">
          <div className="reviewer-name-date-ranking  flex flex-row less-than-sm:flex-col less-than-sm:items-start justify-between items-center gap-1">
           
            <PostCreatorTag posterName={review?.reviewer?.name} avtr_url={review?.reviewer?.avtr_url} postTimestamp={review?.datePosted}/>
            
            <ReviewRanking review={review}/>
            
          </div>
          <div className="review-details w-auto my-2 less-than-xs:ml-0 ml-12 px-2 flex flex-col gap-8">
            <div className="purchase-platform-brief  flex flex-col gap-2 font-raleway lining-nums tabular-nums  font-medium">
              <div className="platform w-max px-3 py-1 flex justify-around items-center gap-2 bg-[#F2F5F9] border-1 rounded-xl text-[#5d5d5d] text-sm font-raleway lining-nums tabular-nums  font-semibold">
                <p className="text-green-600">
                  <CheckIco type="bought"/>
                </p>
                <p className="less-than-xs:hidden text-base font-semibold">{"purchased on Katundu"}</p>
              </div>
              {
                review?.quantifiers.length?
                  <ReviewQuantifiers  quantifiers={review?.quantifiers}/>
                  :<></>
              }
            </div>
            {
              review?.images
              ? <ReviewImages imageArray={review.images}/>
              :""
            }
            <ReviewComment review={review}/>
            
            <HelpfulReviewVotes review={review}/>
          </div>
        </div>

      </div>
    )
  }
  const Reviews =({reviews, k=1})=>{
    
    return(
      <div className="reviews-component max-w-4xl border-t border-spacing-1">
        {
          reviews?.map((r, x) => <Review key={x} review={r} />) 

        }

      </div>
    )
  }
  const ReviewsWrapper = () =>(
    <>
        <div className="reviews-wrapper w-full flex flex-col gap-6">
          <div className="reviews-header flex flex-col gap-1">
            <ReviewImages imageArray={summary?.reviewsImages || []} />
            <div className="rating-hidden-at-big-screen greater-than-md:hidden">
              <OverallRating summary={summary} hasGap={true} />

            </div>

            <AddReview addReview={addReview} authSessions={authSessions} userAuthed={userAuthed} hasOrdered={hasOrdered} productId={productId} productReviewId={productReviewId} location={location} Stars={Stars} goto={goto}  />
          </div>
          <Reviews reviews={prs}/>
        </div>
        <div className="rating-visible-at-big-screen less-than-md:hidden">
          <OverallRating summary={summary}/>

        </div>
    </>
  )

  const NoReviews = () =>(
    <div className="no-reviews w-full flex flex-col gap-4 justify-center items-center">
      <p className="text-lg font-medium">
        {tags.noReviews.mainText}
      </p>
      <p className="text-sm font-normal">
        {tags.noReviews.subText}
      </p>
      <AddReview addReview={addReview} authSessions={authSessions} userAuthed={userAuthed} hasOrdered={hasOrdered} productId={productId} productReviewId={productReviewId} location={location} Stars={Stars} goto={goto}  />
    </div>
      
  )
  return(

    <div className="reviews-container py-1 px-0 w-full min-h-[351px]  flex flex-row justify-between gap-3">
      {
        prs.length?
          <ReviewsWrapper />
        : <NoReviews/>
      }
      

    </div>
  )
}

export default ProductReviews;