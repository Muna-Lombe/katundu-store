import { titleTagTypes as tags} from "../assets";


const ContentSpecification = ({pathId, children})=>{
    return(
      <div className="content-specification w-full max-w-[342px] ">
        <a href={`#${pathId}`}  target="_self" rel="no-referer no-reopenner" className=' text-blue-500 text-sm font-[arial] font-medium cursor-pointer'>
          {tags.contentSpecification.mainText}
        </a>

        {children.length
        ?
          <div className="price-decription-details p-3 bg-gray-200 rounded-sm">
            <p className='text-slate-400 text-md font-[arial]  font-medium'>
                {tags.contentSpecification.subText+":"}
            </p>
            <div className="details flex flex-wrap gap-6">
              {children}
              
            </div>
          </div>
          : ""
        }
      </div>
    )
  }
export default ContentSpecification;