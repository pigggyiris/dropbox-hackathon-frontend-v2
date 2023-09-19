import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StartPetitionPage() {
  const [petitionData, setPetitionData] = useState({
    title: "",
    organization: "",
    background: "",
    petition: "",
    target: "10",
  });

  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetitionData({
      ...petitionData,
      [name]: value,
    });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/petitions/text",
        petitionData
      );

      console.log("Entire Response:", response);

      if (response.data) {
        console.log("Returned petition from server:", response.data);
        setSubmittedSuccessfully(true);
      } else {
        console.error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error submitting the petition:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Start Petition (Step 1/2)</h1>

      <form onSubmit={handleConfirm}>
        <p className="mb-8">
          Please fill in the details below. You will have the option to edit and
          format your petition after completing this step from your toolbox.
        </p>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <label
              htmlFor="title"
              className="w-32 text-lg font-medium text-right"
            >
              *Petition Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={petitionData.title}
              onChange={handleChange}
              className="w-1/2 border rounded p-2"
            />
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label
              htmlFor="organization"
              className="w-32 text-lg font-medium text-right"
            >
              Organization:
            </label>
            <input
              type="text"
              name="organization"
              id="organization"
              value={petitionData.organization}
              onChange={handleChange}
              className="w-1/2 border rounded p-2"
            />
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label
              htmlFor="target"
              className="w-32 text-lg font-medium text-right"
            >
              *Target:
            </label>
            <select
              name="target"
              id="target"
              value={petitionData.target}
              onChange={handleChange}
              className="w-20 border rounded p-2"
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-32 text-lg font-medium text-right">
                <label htmlFor="background">*Background:</label>
              </div>
              <p className="text-sm">
                Provide a concise summary of the facts and/or situations that
                support your case
              </p>
            </div>
            <div className="ml-36">
              <textarea
                name="background"
                id="background"
                value={petitionData.background}
                onChange={handleChange}
                className="w-1/2 border rounded p-2"
                rows="4"
              />
            </div>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="petition"
                className="w-32 text-lg font-medium text-right"
              >
                *Petition:
              </label>
              <p className="text-sm">
                Specify the exact content that calls for people's signatures.
                Keep the text concise and to the point.
              </p>
            </div>
            <div className="ml-36">
              <textarea
                name="petition"
                id="petition"
                value={petitionData.petition}
                onChange={handleChange}
                className="w-1/2 border rounded p-2"
                rows="4"
              />
            </div>
          </div>
        </div>

        <div className="text-right mt-8">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white border rounded-l-md mr-4"
          >
            Confirm
          </button>

          <Link
            to={{
              pathname: "/StartPetitionNext",
              state: { petitionData: petitionData },
            }}
            className={`px-6 py-2 border rounded-md inline-block box-border ${
              submittedSuccessfully
                ? "bg-amber-400 text-teal-950  hover:bg-transparent hover:text-teal-800 rounded-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!submittedSuccessfully) e.preventDefault();
            }}
          >
            Next
          </Link>
        </div>
      </form>
    </div>
  );
}

export default StartPetitionPage;
