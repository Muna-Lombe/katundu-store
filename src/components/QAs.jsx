import React from 'react'
import { image1_1, imagepath } from '../assets/images'
import { ArrowDown, CheckIco, OpenIco, ThumbIco, titleTagTypes as tags } from '../assets'
import { CopyIco } from '../assets'
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'

const QAs = ({ qas}) => {


  const QuestionInput=({})=>{
    
    return(
      <div className="question-input p-6  flex flex-col gap-2 bg-slate-200 border rounded-lg">
        <p className="main-title text-lg font-raleway lining-nums tabular-nums  font-medium">
          {tags.questionBanner.mainText}
        </p>
        <p className="sub-title text-sm font-raleway lining-nums tabular-nums  font-normal">
          {tags.questionBanner.subText}
        </p>
        <input type="text" name="question-input" placeholder='Write your question' id="" className="p-1 max-w-sm border-2 border-slate-400 rounded-lg" />
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
  
  const MoreActions = ()=>{
    const Option =()=>(
       <div className="more-options-wrapper absolute -bottom-2 py-1 px-2 min-w-max gap-1 items-baseline border rounded-xl shadow-sm text-sm hidden  group-hover:flex">
          <CopyIco/>
          <span>{"Copy to clipboard"}</span>
       </div>
    )
     return(
       <div className="more-actions relative py-4 flex flex-col items-center text-xl text-slate-400 font-semibold cursor-pointer group ">
         <p className="px-2 aspect-square  hover:text-blue-500 ">{"..."}</p>
         <Option />
       </div>
     )
  }
  const Question =({question,children})=>{
    
    return(
      <div className="question-wrapper flex flex-col gap-3">
        <div className="question-description my-2 h-max flex less-than-xs:flex-col flex-row justify-between items-end">
          <div className=" flex flex-wrap">
            <img src={question.productImgUrl} alt="" className="w-[80px] h-max aspect-square border-[0.6px] shadow-sm" />
            <div className="w-auto">
              <div className="product-name py-1 px-2 text-base font-medium">
                {question.productName}
              </div>
              <div className="question-details-content px-2 flex flex-col gap-2">
                <p className="question-text  flex text-lg font-semibold">
                  {question.text}
                </p>
                <div className="user-data  text-slate-400 text-sm">
                  {question.poster.name}
                </div>
                <div className="vote flex items-baseline gap-1 bg- border-1 rounded-lg cursor-pointer">
                  <p className="rank-yes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button">
                    <span className="text-slate-500">
                      <ThumbIco />
                    </span>
                    <span className="rank-count">
                      {question.rating.upvotes}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="question-timestamp py-1 less-than-xs:contents flex flex-col justify-self-end  self-start child:py-0">
            <div className="question-date whitespace-nowrap text-base text-slate-500 font-raleway lining-nums tabular-nums  font-semibold">
              {question.datePosted}
            </div>
            <MoreActions/>
          </div>
        </div>
        <div className="question-answer-details w-full flex flex-col gap-1">
          <div className="question-content my-2 px-2 flex flex-col gap-6 ">
            <div className="question-details px-4 w-full flex flex-row justify-between gap-2 font-raleway lining-nums tabular-nums  font-medium">
              
              </div>

            </div>
            
          <div className="children-wrapper">
            {children}
            <div className="has-more-responses p-4">
              {
                question.responseCount > 3
                  ? <p className="response-count text-sm text-blue-500 font-raleway lining-nums tabular-nums  font-semibold cursor-pointer">
                      {"+ "+question.responseCount+" more answer"}
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
  const Answer =({response})=>{

   
    return (
      <div className="answer-wrapper pl-4 w-full flex flex-col gap-2 border-l border-green-400">
        <div className="best-answer-tag w-max py-1 px-2 flex bg-green-500 rounded-2xl text-xs text-white font[arial] font-semibold ">
          <span>{response.ranking}</span>
        </div>
        <div className="answer-content w-full flex flex-col justify-between gap-2 ">
          <div className="answer-details my-2 flex  flex-col items-start gap-2 ">
            <div className="answerer-avtr w-full flex less-than-xs:flex-col justify-between items-end">
              <div className="w-full flex flex-wrap">
                <img src={response?.poster?.avtr_url || no_img_path} lazy="true" alt="" className="w-[40px] min-w-[40px] aspect-square flex justify-center border rounded-3xl" />
                <div className="answerer-name py-2 flex items-center gap-2">
                  <span className="text-base font-raleway lining-nums tabular-nums  font-semibold">
                    {response.poster.name}
                  </span>
                  {
                    response.poster.verfied
                    ? <span className="verified-tag p-[0.8px] bg-blue-500 border rounded-3xl text-white text-xs ">
                        <CheckIco/>
                      </span>
                    :""
                  }
                  
                </div>
              </div>
              <div className="answer-timestamp min-w-max flex flex-col justify-between items-center font-raleway lining-nums tabular-nums ">
                <div className="question-date text-base text-slate-500 font-raleway lining-nums tabular-nums  font-semibold">
                  {response.datePosted}
                </div>
                <MoreActions />
              </div>
            </div>
            <div className="answerer-details-content flex flex-col gap-2 ">
              
              <div className="answerer-text">
                <p className="answer-text">
                  {response.text}
                 </p>
              </div>
              <div className="helpful-answer-rank w-max flex flex-col gap-2 ">
                <p className="title text-slate-400 text-sm ">{"Was this answer helpful?"}</p>
                <div className="ranking flex flex-row gap-2">
                  <p className="rank-yes py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600 font-raleway lining-nums tabular-nums " role="button">
                    <span className="text-slate-500">
                      <ThumbIco />
                    </span>
                    <span className="rank-count">
                      {response.rating.upvotes}
                    </span>
                  </p>
                  <p className="rank-no py-1 px-2 w-max flex flex-row items-baseline bg-slate-300 rounded-3xl text-slate-600  font-raleway lining-nums tabular-nums " role="button">
                    <span className="text-slate-500">
                      <ThumbIco invert />
                    </span>
                    <span className="rank-count">
                      {response.rating.downvotes}
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    )
  }
  return (
    <div className="QA-wrapper flex flex-col gap-4">
      <QuestionInput/>
      <AnswerSorter answersList={qas.answersList}/>
      {
        qas?.questions?.map((q,x)=> 
          <Question key={x} question={{...q, responses:""}}>
            {
              q.responses.map((r,x)=>
              <Answer key={x} response={r} />
              )
            }
          </Question>
        )
      }
    </div>
  )
}

export default QAs