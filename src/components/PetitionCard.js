import { Link } from "react-router-dom";
import pdfFile from '../assets/Signatures.pdf';


function PetitionCard(props) {
  const percentage = Math.round((props.numberOfSigned / props.target) * 100);

  return (
    <div className="border p-4 shadow-lg max-w-lg mx-auto mt-4 flex">
      <img className="flex-none w-24 h-24 rounded mr-4" src={props.image} alt="petition" />
      <div className="flex-1">
        <h2 className="font-bold text-xl mb-2">{props.title}</h2>
        <p className="text-gray-600">{"Created by: " + props.author}</p>
        <p className="text-gray-600 mb-2">{"Created On: " + props.createdOn}</p>
        <p className="line-clamp-5 mb-2">{props.description}</p>
        
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-teal-100">
                {percentage}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">
                  {props.numberOfSigned + "/" + props.target} 
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></div>
          </div>
        </div>
        
        <span className= "block mb-2">
            View signatures by <a href={pdfFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 inline">PDF</a>
        </span>
        
        <Link className="text-blue-500 hover:text-blue-700 block" to={`/Petitions/${props.id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PetitionCard;
