import React from 'react'
import no_img_path from '../assets/tests/jsonServer/img/placeholders/no_product_img.png'
import no_avtr_path from '../assets/tests/jsonServer/img/placeholders/avatar.png'
import { CheckIco } from '../assets'

const PostCreatorTag = ({posterName, posterVerified, avtr_url, postTimestamp}) => {
  return (
    <div className="post-creator w-fit flex flex-col items-start gap-2 ">

      <div className='flex flex-row gap-2'>
        <img src={no_avtr_path || avtr_url || no_img_path} lazy="true" alt="" className="w-[50px] h-[50px] aspect-square object-contain   border rounded-3xl" />
        <div className="answerer-name py-2 flex items-center gap-2">
          <span className="text-base font-raleway lining-nums tabular-nums  font-semibold">
            {posterName}
          </span>
          {
            posterVerified
              ? <span className="verified-tag p-[0.8px] bg-blue-500 border rounded-3xl text-white dark:text-black  text-xs ">
                <CheckIco />
              </span>
              : ""
          }

        </div>


      </div>
      <div className="answer-date-time flex flex-row items-start gap-1 text-slate-400 text-base less-than-sm:text-xs font-raleway lining-nums tabular-nums ">
        <div className="response-date">
          {postTimestamp?.date}
        </div>
        <div className="response-time">
          {postTimestamp?.time}
        </div>
      </div>
    </div>
  )
}

export default PostCreatorTag