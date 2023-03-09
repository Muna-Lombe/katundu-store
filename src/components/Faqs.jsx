const Faqs = ({ titleText = "FAQ", subTexts = ["Delivery conditions "," Return of goods "," Methods of payment "," Return of money"], children }) => {
  return (
    <div className="faqs py-4">
      <p className="title text-lg">{titleText}</p>
      <p className="samples grid grid-cols-2 gap-2 text-base text-blue-500 child-hover:underline cursor-pointer">
        <span>
          {subTexts[0]}
        </span>
        <span>
          {subTexts[1]}
        </span>
        <span>
          {subTexts[2]}
        </span>
        <span>
          {subTexts[3]}
        </span>
      </p>
    </div>
  )
}
  export default Faqs;