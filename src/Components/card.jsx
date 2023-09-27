import { useNavigate } from "react-router-dom";

function Card({
  children,
  titleText = "Cart",
  background = "bg-primary",
  borderColor = "border-error",
  dividerColor = "bg-gray-100",
  fontColor = "text-white",
  quantity = 50,
  status = 50,
}) {
  const navigate = useNavigate();

  function onCardClick() {
    navigate(`/dashboard?status=${titleText}`);
  }
 
  const statusPercent = status * 100;

  return (
    <div onClick={onCardClick}
      className={`border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2 hover:scale-110 cursor-pointer transition-all ease-in-out duration-700 `}
    >
      <div className="text-primary-content text-2xl mb-2 ">
        {children} <span> {titleText} </span>
      </div>

      <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div>

      <div className="flex justify-around gap-4 items-center mt-2  ">
        <div className={`text-7xl  ${fontColor}`}> {quantity}/ </div>
        <div className={`radial-progress bg-white ${fontColor} `} style={{ "--value": status * 100 }}>
          {statusPercent.toString().substring(0, 4) }%
        </div>
      </div>
      
    </div>
  );
}

export default Card;
