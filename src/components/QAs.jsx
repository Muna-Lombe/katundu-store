import React, { useEffect, useState } from 'react'
import { image1_1, imagepath } from '../assets/images'
import { useLocation, useNavigate } from "react-router-dom"

import { ArrowDown, CheckIco, DeleteIco, EditIco, OpenIco, StarIco, ThumbIco, titleTagTypes as tags } from '../assets'
import { CopyIco } from '../assets'
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'
import no_avtr_path from '../assets/tests/jsonServer/img/placeholders/avatar.png'
import { useSelector } from 'react-redux'
import { authenticatedUsers, isAuthedUser, orderedByUser } from '../orm/selectors'
import types from '../orm/actions/actionTypes'
import { useAddAnswerMutation, useAddQuestionMutation, useRemoveAnswerMutation, useRemoveQuestionMutation, useUpdateAnswerMutation, useUpdateQuestionMutation } from '../js/middleware/queryHandler'
import { renderToString } from 'react-dom/server'
import randomizer from '../js/utils/randomizer'
import PostCreatorTag from './PostCreatorTag'

const QAs = ({ qas, productReviewId , productId}) => {
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.uuid))
  const hasOrdered = useSelector(orderedByUser(productId))
  const isAuthed = () => (authSessions.length || authSessions?.some(as => as.authStatus !== types.AUTH_EXPIRED || userAuthed))
  const goto = useNavigate()
  const location = useLocation()
  const [addQuestion, { data: addedQuestionData, isLoading: addQuestionLoading, isError: addQuestionError, isSuccess: addQuestionSuccess }] = useAddQuestionMutation();
  const [updateQuestion, { data: updatedQuestionData, isLoading: updateQuestionLoading, isError: updateQuestionError, isSuccess: updateQuestionSuccess }] = useUpdateQuestionMutation();
  const [removeQuestion, { data: removedQuestionData, isLoading: removeQuestionLoading, isError: removeQuestionError, isSuccess: removeQuestionSuccess }] = useRemoveQuestionMutation();

  const [addAnswer] = useAddAnswerMutation();
  const [updateAnswer, { data: updatedAnswerData, isLoading: updateAnswerLoading, isError: updateAnswerError, isSuccess: updateAnswerSuccess } ] = useUpdateAnswerMutation();
  const [removeAnswer, { data: removedAnswerData, isLoading: removeAnswerLoading, isError: removeAnswerError, isSuccess: removeAnswerSuccess }] = useRemoveAnswerMutation();
  
  useEffect(() => {
    if (addQuestionSuccess && addedQuestionData) {
      const {questionAnswerId:qandas_id, ...rest} = addedQuestionData
      
      const questions = document.getElementById("questions")
      const q = { uuid: qandas_id, rankby: [], question: { ...rest } }
      
      const InsertElement = ()=>(
        <Question qandas_id={q.uuid} question={{ ...q.question, responses: "" }}>
          {
            q.question.answers.map((ans, x) =>
            <Answer key={x} qandas_id={q.uuid} response={ans} />
            )
            
          }
          <Respond qandas_id={q.uuid} />
        </Question>
      )


      questions.insertAdjacentHTML("afterbegin", renderToString(<InsertElement />) )
      
    }
  
    return () => {
      "second"
    }
  }, [addQuestionSuccess, addedQuestionData])
  


  const AddPost = ({type, editMode})=>{
    const isAuthed = () => (authSessions.length || authSessions?.some(as => as.authStatus !== types.AUTH_EXPIRED || userAuthed))

    // console.log("editMode", editMode)

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
      const form = document.forms[type+"_post"];

      const post = { ["product_review"]: {}, type: editMode ? editMode.type : "add_"+type }
      // Get form data
      const formData = new FormData(form);
      
      for (let [name, value] of formData) {
        // console.log(name, value);
        post["product_review"] = {
          [type]: {
            text: value,
          },
          poster_uuid: authSessions[0].uuid
        }
      }

      // console.log("updateFn", typeof updateFn)
      // return

      if (edit) {
        console.log(editMode)
        updateFn(post)
      } else {

        updateFn({ initialPost: post, productReviewId, productId })
      }
      document.getElementById("add-"+type+"-input").value = "";
    };


    const Tooltip = () => {

      return (

        <div id="auth-tooltip" className="tooltip-wrapper max-w-[75%] max-h-[40px]  justify-center flex-wrap whitespace-normal transition-transform ease-linear delay-700">
          <div id="tooltip" className="tooltip hidden justify-center text-center ">
            {tags.noReviews.noOrderText}
          </div>
        </div>
      )
    }
    const Componentheader = () => (
      <>
        <p className="main-title text-lg font-raleway lining-nums tabular-nums  font-medium">
          {isAuthed() ? tags.addReview.mainText : "Sign in before you can post a "+ type +"!"}
        </p>
        <p className="sub-title h-[27px] text-sm font-raleway lining-nums tabular-nums  font-normal">
          {isAuthed() ? tags.addReview.subText : ""}
        </p>
      </>
    )
    const Componentbody = () => (
      <form id={type+"_post"} name={type+"_post"} action="" onSubmit={() => ""} className="flex flex-col gap-3">
        {
          editMode?.value ?
              <input form={type+"_post"} id={"add-"+type+"-input"} type="text" name={"add-"+type+"-input"} placeholder={'Post a '+type} defaultValue={editMode?.value || null} className="p-3 max-w-md border-2 border-slate-400 rounded-lg caret-black text-black" />
          :   <textarea form={type + "_post"} name={"add-" + type + "-input"} id={"add-" + type + "-input"} cols="10" rows="3" placeholder={'Post a ' + type} className="p-3 max-w-2xl border-2 border-slate-400 rounded-lg caret-black text-black"></textarea>
        }

        <div className="update-btns flex flex-row gap-2">
          <input form={type+"_post"} type="button" onClick={(e) => handlePost(e, editMode?.value, (arg) => editMode?.updateFn(arg) || addQuestion(arg))} value={editMode?.value ? " Save " : isAuthed() ? " Post " : " Sign In "} className="  p-1 w-max min-w-[80px] bg-orange-500 rounded-md text-white text-sm font-raleway lining-nums tabular-nums font-semibold cursor-pointer" />
          {
            (editMode?.value || type === "answer") ?
              <input form={type+"_post"} type="button" onClick={(e) => { e.preventDefault(); editMode.toggleEditMode(false) }} value={"Cancel"} className="  p-1 w-max min-w-[80px] bg-inherit rounded-md text-slate-300 border border-transparent hover:border-slate-300  text-sm font-raleway lining-nums tabular-nums font-semibold cursor-pointer" />
              : <></>
          }

        </div>
      </form>
    )
    const Component = () => (
    
        <Componentbody />
        
    )
    return (
      <>

        <Tooltip />
        <Component />

      </>

    )
  }
  
  
  const QuestionInput=({})=>{
    
    return(
      <div className="question-input p-6 max-w-4xl  flex flex-col gap-2 bg-slate-200 dark:bg-slate-600 border rounded-lg  ">
        <p className="main-title text-lg font-raleway lining-nums tabular-nums  font-medium">
          {tags.questionBanner.mainText}
        </p>
        <p className="sub-title text-sm font-raleway lining-nums tabular-nums  font-normal">
          {tags.questionBanner.subText}
        </p>
        {/* <input type="text" name="question-input" placeholder='Write your question' id="" className="p-1 max-w-sm border-2 border-slate-400 rounded-lg" /> */}
        <AddPost type={"question"}/>
      </div>
    )
  }
  const AnswerSorter =({answersList})=>{
    
    const optgrp =()=> document.querySelector(".sort-options")

    const handleRotateIco =(e)=>{
      const elem = e?.target || e
      // console.log(elem)
      if(e?.type==="click") e.preventDefault()
      if(e?.type === "click") e.stopPropagation()
      const clickedSvg = () => elem?.tagName === "svg"
      const clickedP = () => elem?.tagName === "p"
      let child;
      if(clickedSvg()) child = elem
      if(clickedP()) child = elem?.firstChild

      if(child?.classList?.contains("-rotate-90")){
        child?.classList?.replace("-rotate-90", "rotate-90")
        optgrp()?.classList?.replace("hidden", "visible")
      }else{
        child?.classList?.replace("rotate-90", "-rotate-90")
        optgrp()?.classList?.replace("visible", "hidden")

      }
      
    }

    const handleBlur=(e)=>{
      // console.log("triggered blur",e)
      return optgrp().classList.contains("visible") 
        ? handleRotateIco(document.querySelector(".arrow-up"))//optgrp().classList.replace("visible", "hidden")
        : "" 
    }

    const handleSetValue = (e)=>{
      e.preventDefault()
      document.querySelector("#sort-selector").value = e.target.value
    }
    return(
      <div className="sorter-wrapper  py-1 w-full h-14">
        <div onClick={(e)=>handleBlur(e)} className="answer-sorter  max-w-min flex flex-col justify-between gap-1  border-2 border-slate-400 rounded-lg">
          <div className=" sorter-input relative my-1 px-1 flex less-than-xs:gap-1 gap-10">
            <input disabled type="text" name="sort-selector" id="sort-selector" value={answersList[0]} className="w-min flex flex-row bg-white" />
            <p  className="less-than-xs:absolute top-0 right-0 p-1 flex items-center cursor-pointer opacity-50 bg-transparent z-[5] ">
              <ArrowDown defaultPos={"up"} handleClick={handleRotateIco} />
            </p>
          </div>
          <optgroup onClick={(e) => handleSetValue(e)} className="sort-options top-full left-0 w-full bg-white border opacity-90 rounded-xl child:cursor-pointer child-hover:bg-slate-400  hidden ">
            {
              answersList.map((a,x)=> <option key={x} value={a} >{a}</option>)
            }
            
          </optgroup>
        </div>
      </div>
      
    )
  }
  
  const MoreActions = ({ children }) => {
    const Option = ({ children }) => (
      <div className="more-options-wrapper less-than-sm:absolute  py-1 min-w-max  items-baseline less-than-sm:border rounded-xl shadow-sm text-sm less-than-sm:hidden  less-than-sm:group-hover:flex  less-than-sm:flex-col greater-than-sm:flex greater-than-sm:flex-row less-than-sm:gap-1 gap-2">
        {children}
        {/* <span>{"Copy to clipboard"}</span> */}
      </div>
    )
    return (
      <div className="more-actions relative py-0 flex flex-col items-center text-xl text-slate-400 font-semibold cursor-pointer group " anchor="actions-anchor">
        <p className="px-2 aspect-square greater-than-sm:hidden less-than-sm:group-hover:hidden  hover:text-blue-500 ">{"..."}</p>
        <Option >
          {children}
        </Option>

      </div>
    )
  }
  const HelpfulQuestionVotes = ({ question, qandas_id }) => {

    const upvotes = updateQuestionSuccess ?
      (updatedQuestionData.uuid === question.uuid) && (updatedQuestionData.rating.upvotes !== question?.rating.upvotes) ?
        updatedQuestionData.rating.upvotes
        : question?.rating.upvotes
      : question?.rating.upvotes
    const downvotes = updateQuestionSuccess ?
      (updatedQuestionData.uuid === question.uuid) && (updatedQuestionData.rating.downvotes !== question?.rating.downvotes) ?
        updatedQuestionData.rating.downvotes
        : question?.rating.downvotes
      : question?.rating.downvotes

    const handleUpvote = (e) => {
      e.preventDefault()
      updateQuestion({ postUpdate: { type: "update_question_votes", product_review: { question: { upvotes: 1 }, poster_uuid: authSessions[0].uuid } }, productId, productReviewId, questionAnswerId: qandas_id, questionId: question.uuid })
    }
    const handleDownvote = (e) => {
      e.preventDefault()
      updateQuestion({ postUpdate: { type: "update_question_votes", product_review: { question: { downvotes: 1 }, poster_uuid: authSessions[0].uuid } }, productId, productReviewId, questionAnswerId: qandas_id, questionId: question.uuid })
    }

    return (
      <div className="helpful-question-rank w-max flex flex-col gap-2 ">
        <p className="title text-slate-400 text-sm ">{"Was this question helpful?"}</p>
        <div className="votes flex flex-row gap-2">
          <p className="question-upvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleUpvote(e) : ""}>
            <span className="upvote-thumb text-slate-500">
              <ThumbIco />
            </span>
            <span className="rank-count">
              {upvotes}
            </span>
          </p>
          <p className="question-downvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600  font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleDownvote(e) : ""}>
            <span className="downvote-thumb text-slate-500">
              <ThumbIco invert />
            </span>
            <span className="rank-count">
              {downvotes}
            </span>
          </p>
        </div>
      </div>
    )
  }
  const QuestionText = ({ question, qandas_id }) => {
    const [editQuestion, setEditQuestion] = useState(false)


    const handleEdit = (e) => {
      e.preventDefault()
      setEditQuestion(prev => !prev)
    }

    const handleDelete = (e, questionId) => {
      e.preventDefault()
      removeQuestion({ productId, productReviewId, questionId, questionAnswerId:qandas_id })
    }
    useEffect(() => {

      const editBtn = document.getElementById("edit-question" + question.uuid)
      const deleteBtn = document.getElementById("delete-question" + question.uuid)

      deleteBtn?.addEventListener("click", (e) => handleDelete(e, question.uuid))
      editBtn?.addEventListener("click", handleEdit)

      return () => {
        editBtn?.removeEventListener("click", handleEdit)
        deleteBtn?.removeEventListener("click", (e) => handleDelete(e, question.uuid))
      }
    }, [])
    const text = updateQuestionSuccess ?
      (updatedQuestionData.uuid === question.uuid) && (updatedQuestionData.text !== question?.text) ?
        updatedQuestionData.text
        : question?.text
      : question?.text

    const editData = {
      value: text,
      type: "update_question_text",
      toggleEditMode: setEditQuestion,
      updateFn: (questionBody) => updateQuestion({
        postUpdate: questionBody,
        questionId: question.uuid,
        questionAnswerId: qandas_id,
        productId, productReviewId,
      })
    }


    return (
      <div className="reviewer-question">
        <div className=" my-3 flex flex-col gap-1 ">
          {
            editQuestion ?
              <AddPost type={"question"} editMode={editData} />
              : <span className="question-text font-bold  whitespace-normal text-lg">{text}</span>
          }

        </div>

      </div>
    )
  }
  const Question =({question,qandas_id,children})=>{
    
    return(
      <div className="question-wrapper flex flex-col gap-3">
        <div className="question-description my-2 h-max flex less-than-xs:flex-col flex-row less-than-xs:items-start justify-between gap-2 ">
          
          <PostCreatorTag posterName={question?.poster?.name} avtr_url={question?.poster?.avtr_url} postTimestamp={question?.datePosted} />
          <div className="question-timestamp py-1 flex less-than-xs:flex-row flex-col justify-self-end  self-start child:py-0">
            
              {
                (userAuthed && (question?.poster.canUpdate === authSessions[0]?.uuid)) ?
                <MoreActions>
                  <>
                    <div id={"edit-question" + question?.uuid} className="edit-question flex flex-row items-baseline gap-1 text-slate-400 hover:text-blue-500 text-base">
                      <EditIco />
                      <p className="less-than-sm:hidden ">{"Edit"}</p>
                    </div>
                    <div id={"delete-question" + question?.uuid} className="delete-question flex flex-row items-baseline gap-1  text-red-600  text-base hover:text-red-500">
                      <DeleteIco size={16} />
                      <p className="less-than-sm:hidden">{"Delete"}</p>
                    </div>
                  </>
                </MoreActions>
                  : <></>
              }
          </div>
        </div>
        <div className="question-answer-details w-full flex flex-col gap-5 child:ml-2">
          <div className="question-content my-2 px-2 flex flex-col gap-6 ">
            <div className="question-details px-0 w-full flex flex-row justify-between gap-2 font-raleway lining-nums tabular-nums  font-medium">
              <QuestionText question={question} qandas_id={qandas_id} />

            </div>
            <HelpfulQuestionVotes question={question} qandas_id={qandas_id} />

          </div>
          <Respond qandas_id={qandas_id} />
            
          <div className="children-wrapper w-auto flex flex-col gap-6 pl-9 less-than-xs:pl-2 ">
            {children}
            <div className="has-more-responses p-4">
              {
                question?.responseCount > 3
                  ? <p className="response-count text-sm text-blue-500 font-raleway lining-nums tabular-nums  font-semibold cursor-pointer">
                      {"+ "+question?.responseCount+" more answer"}
                    </p>
                : ""
              }
            </div>
          </div>
        </div>
      </div>
      // </div>
    )
  }
  const Stars = ({ count }) => (
    <p className="relative flex flex-row text-yellow-500 ">
      {
        new Array(5).fill("").map((i, x) => {
          return <StarIco key={x} value={parseFloat(x + 1)} count={parseFloat(count)} maxCount={5} />
        })
      }

    </p>
  )
  const RankedAs =({resp})=>(
    
      resp.rankedAs ? 
        <div className="best-answer-tag w-max py-1 px-2 flex bg-green-500 rounded-2xl text-xs text-white dark:text-black  font[arial] font-semibold ">
          <span>{resp?.rankedAs}</span>
          
        </div>
      :<></>
  )
  const HelpfulAnswerVotes = ({ answer, qandas_id }) => {

    const upvotes = updateAnswerSuccess ?
      (updatedAnswerData.uuid === answer.uuid) && (updatedAnswerData.rating.upvotes !== answer?.rating.upvotes) ?
        updatedAnswerData.rating.upvotes
        : answer?.rating.upvotes
      : answer?.rating.upvotes
    const downvotes = updateAnswerSuccess ?
      (updatedAnswerData.uuid === answer.uuid) && (updatedAnswerData.rating.downvotes !== answer?.rating.downvotes) ?
        updatedAnswerData.rating.downvotes
        : answer?.rating.downvotes
      : answer?.rating.downvotes

    const handleUpvote = (e) => {
      e.preventDefault()
      updateAnswer({ postUpdate: { type: "update_answer_votes", product_answer: { answer: { upvotes: 1 }, poster_uuid: authSessions[0].uuid } }, productId, productReviewId, questionAnswerId: qandas_id, answerId: answer.uuid })
    }
    const handleDownvote = (e) => {
      e.preventDefault()
      updateAnswer({
        postUpdate: { type: "update_answer_votes", product_review: { answer: { downvotes: 1 }, poster_uuid: authSessions[0].uuid } }, productId, productReviewId, 
        questionAnswerId: qandas_id, answerId: answer.uuid })
    }

    return (
      <div className="helpful-answer-rank w-max flex flex-col gap-2 ">
        <p className="title text-slate-400 text-sm ">{"Was this answer helpful?"}</p>
        <div className="votes flex flex-row gap-2">
          <p className="answer-upvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleUpvote(e) : ""}>
            <span className="upvote-thumb text-slate-500">
              <ThumbIco />
            </span>
            <span className="rank-count">
              {upvotes}
            </span>
          </p>
          <p className="answer-downvotes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600  font-raleway lining-nums tabular-nums " role="button" onClick={(e) => userAuthed ? handleDownvote(e) : ""}>
            <span className="downvote-thumb text-slate-500">
              <ThumbIco invert />
            </span>
            <span className="rank-count">
              {downvotes}
            </span>
          </p>
        </div>
      </div>
    )
  }
  const AnswerText = ({ answer, qandas_id }) => {
    const [editAnswer, setEditAnswer] = useState(false)


    const handleEdit = (e) => {
      e.preventDefault()
      setEditAnswer(prev => !prev)
    }

    const handleDelete = (e, answerId) => {
      e.preventDefault()
      removeAnswer({ productId, productReviewId, answerId, questionAnswerId: qandas_id })
    }
    useEffect(() => {

      const editBtn = document.getElementById("edit-answer" + answer.uuid)
      const deleteBtn = document.getElementById("delete-answer" + answer.uuid)

      deleteBtn?.addEventListener("click", (e) => handleDelete(e, answer.uuid))
      editBtn?.addEventListener("click", handleEdit)

      return () => {
        editBtn?.removeEventListener("click", handleEdit)
        deleteBtn?.removeEventListener("click", (e) => handleDelete(e, answer.uuid))
      }
    }, [])
    const text = updateAnswerSuccess ?
      (updatedAnswerData.uuid === answer.uuid) && (updatedAnswerData.text !== answer?.text) ?
        updatedAnswerData.text
        : answer?.text
      : answer?.text

    const editData = {
      value: text,
      type: "update_answer_text",
      toggleEditMode: setEditAnswer,
      updateFn: (answerBody) => updateAnswer({
        postUpdate: answerBody,
        answerId: answer.uuid,
        questionAnswerId: qandas_id,
        productId, productReviewId,
      })
    }


    return (
      <div className="reviewer-answer">
        <div className=" my-3 flex flex-col gap-1 ">
          {
            editAnswer ?
              <AddPost type={"answer"} editMode={editData} />
              : <span className="answer-text whitespace-normal text-base">{text}</span>
          }

        </div>

      </div>
    )
  }
  const Answer =({response, qandas_id})=>{

   
    return (
      <div className="answer-wrapper pl-4 w-full flex flex-col gap-2 border-l border-green-400">
        <RankedAs resp={response}/>
        <div className="answer-content w-full flex flex-col justify-between gap-2 ">
          <div className="answer-details my-2 flex  flex-col items-start gap-2 ">
            <div className="answerer-details-header w-full flex less-than-xs:flex-col  less-than-xs:items-start justify-between items-center gap-2">
            
              <PostCreatorTag posterName={response?.poster?.name} avtr_url={response?.poster?.avtr_url} postTimestamp={response?.datePosted} posterVerified={response?.poster?.verified} />
              <div className="answer-timestamp min-w-max flex flex-col justify-between items-center font-raleway lining-nums tabular-nums ">
                  <span>
                    <Stars count={response?.rating} />
                  </span>
                  {
                    (userAuthed && (response?.canUpdate === authSessions[0]?.uuid)) ?
                    <MoreActions>
                      <>
                        <div id={"edit-answer" + response?.uuid} className="edit-answer flex flex-row items-baseline gap-1 text-slate-400 hover:text-blue-500 text-base">
                          <EditIco />
                          <p className="less-than-sm:hidden ">{"Edit"}</p>
                        </div>
                        <div id={"delete-answer" + response?.uuid} className="delete-answer flex flex-row items-baseline gap-1  text-red-600  text-base hover:text-red-500">
                          <DeleteIco size={16} />
                          <p className="less-than-sm:hidden">{"Delete"}</p>
                        </div>
                      </>
                    </MoreActions>
                      : <></>
                  }
              </div>
            </div>
            <div className="answerer-details-content flex flex-col gap-2 ">
              
              <AnswerText answer={response} qandas_id={qandas_id} />
              <HelpfulAnswerVotes answer={response} qandas_id={qandas_id}/>

            </div>
          </div>
          
        </div>
      </div>
    )
  }
  const Respond = ({qandas_id})=>{
    const [toggleRespond, setToggleRespond] = useState(false)
    const answerData = {
      type: "add_answer",
      value: "  ",
      toggleEditMode: setToggleRespond,
      updateFn: (postBody) => addAnswer({
        initialPost: postBody,
        questionAnswerId: qandas_id,
        productId, 
        productReviewId
      })
    }
    const ReplyBtn = () =>(
      <p onClick={(e) => { e.preventDefault(); setToggleRespond(true) }} className="  p-1 w-max min-w-[80px] bg-inherit rounded-md text-white text-base font-raleway lining-nums tabular-nums font-semibold cursor-pointer"> {"Reply"} </p>
    )
    return(
      <>
        {
          toggleRespond?
            <AddPost type={"answer"}  editMode={answerData}/> 
          : <ReplyBtn/>
        }
      </>
      
    )
  }
  const QuestionsWrapper = ({children})=>{

    
    return (
    <div className="questions-wrapper flex flex-col gap-6">
        <div className="question-input max-w-4xl flex flex-col gap-1 border-b border-spacing-1 " >
        {children}
      </div>
        <div id="questions" className="questions max-w-4xl py-4 ">
          <div className="product-tag flex flex-row items-center gap-2">
            <div className="product-tag-iamge">
              <img src={("https://placehold.co/600x400/orange/" + randomizer(["black", "white", "gray", "red"])) || qas[0]?.productImgUrl} alt="" className="w-[80px] h-max aspect-square border-[0.6px] shadow-sm" />
            </div>
            <div className="product-tag-name text-xl font-raleway lining-nums tabular-nums font-semibold">
                {qas[0]?.productName}
            </div>

          </div>
            
          {
            qas?.map((q, x) => {
              // console.log("q",q)
              return(
                <Question key={x} qandas_id={q.uuid} question={{ ...q?.question, responses: "" }}>
                  
                  {
                    q?.question?.answers?.map((ans, x) =>
                      <Answer key={x} qandas_id={q.uuid} response={ans} />
                    )

                  }
                </Question>

              )

              }
            )
          }
      </div>
    </div>
      
    
  )}
  const NoQuestions =()=>(
    <div className="no-posts w-full flex flex-col gap-4 justify-center items-center">
      <p className="text-lg font-medium">
        {tags.noQuestions.mainText}
      </p>
      <p className="text-sm font-normal">
        {tags.noQuestions.subText}
      </p>
      <QuestionInput />
      {/* <AnswerSorter answersList={[]} /> */}
    </div>
  )
  return (
    <div className="QA-wrapper min-h-[351px] flex flex-col gap-4">
      
      {
      qas.length?
        <QuestionsWrapper>
            <QuestionInput />
            <AnswerSorter answersList={[]} />
        </QuestionsWrapper>
        : <NoQuestions/>
        
        
      }
    </div>
  )
}

export default QAs