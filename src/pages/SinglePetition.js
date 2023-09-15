import { useParams } from "react-router-dom";
import dummyPetitionData from "../components/dummyPetitionData";
import pdfFile from '../assets/Signatures.pdf';


function SinglePetitionPage() {
  const { fileID } = useParams();
  const File = dummyPetitionData.find((d) => {
    return d.id === parseInt(fileID);
  });
  const percentage = Math.round((File.signed.length / File.target) * 100);

  return (
    <div className="flex">
      <div className="w-3/5 m-10">
        <img src={File.image} alt="" className="w-full rounded-lg mb-4" />
        <h1 className="font-bold text-xl mb-2">{File.title}</h1>
        <p className="text-gray-600 mb-2">{"Created by: " + File.author}</p>
        <p className="text-gray-600 mb-2">{"Created On: " + File.createdOn}</p>
        <p className="line-clamp-5 mb-2">{File.description}</p>
      </div>

      <div className="w-2/5 m-10 p-10 border border-gray-300 rounded-xl">
        <h1 className="font-bold text-xl mb-4">Sign this petition</h1>

        <div className="relative pt-1 mb-4">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-teal-100">
                {percentage}%
              </span>
            </div>
            <div className="text-right">
            <span className="text-xs font-semibold inline-block">
              {File.signed.length + "/" + File.target} 
              <a href={pdfFile} className="text-blue-500 hover:text-blue-700 text-xs ml-2" target="_blank" rel="noopener noreferrer">
                  Signatures
              </a>
            </span>
          </div>

          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
          <input type="email" id="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
        </div>
        <div className="flex mb-4">
          <div className="mr-2 w-1/2">
            <label className="block text-sm font-semibold mb-2" htmlFor="lastName">LastName</label>
            <input type="text" id="lastName" className="w-full p-2 border rounded-md" placeholder="Enter your last name" />
          </div>
          <div className="ml-2 w-1/2">
            <label className="block text-sm font-semibold mb-2" htmlFor="firstName">FirstName</label>
            <input type="text" id="firstName" className="w-full p-2 border rounded-md" placeholder="Enter your first name" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="phone">Phone Number (Optional)</label>
          <input type="text" id="phone" className="w-full p-2 border rounded-md" placeholder="Enter your phone number (optional)" />
        </div>
        <button className="py-3 px-6">Sign</button>
      </div>
    </div>
  );
}

export default SinglePetitionPage;
