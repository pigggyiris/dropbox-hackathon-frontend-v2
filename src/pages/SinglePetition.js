import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HelloSign from "hellosign-embedded";
import defaultImg from "../assets/default-petition.png";
import Loading from "../components/Loading";
import { BASE_URL } from "../config";

function SinglePetitionPage() {
  const { fileID } = useParams();
  const [petition, setPetition] = useState(null);
  const client = new HelloSign();
  const [petitionId, setPetitionId] = useState(null);
  const [signId, setSignId] = useState(null);
  const navigate = useNavigate();

  const [canFinishSign, setCanFinishSign] = useState(false); // 是否可以点击Finish Sign按钮
  const [isSigning, setIsSigning] = useState(false); // 是否正在签署过程中

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/petitions/${fileID}`)
      .then((response) => {
        setPetition(response.data);
      })
      .catch((error) => {
        console.error("Error fetching petition:", error);
      });
  }, [fileID]);

  function handleSign() {
    setIsSigning(true);
    axios
      .put(`${BASE_URL}/v1/petitions/${fileID}`)
      .then((response) => {
        setIsSigning(false);
        setCanFinishSign(true);

        console.log("Petition signed successfully", response.data);
        if (response.data && response.data.signUrl) {
          const signUrl = response.data.signUrl;

          setPetitionId(response.data.petitionId);
          setSignId(response.data.signId);

          client.open(signUrl, {
            clientId: "efe3f85f67aafe39ff9adc714413cf11",
            skipDomainVerification: true,
          });
        } else {
          console.log("No signUrl provided in response");
        }
      })
      .catch((error) => {
        setIsSigning(false);
        console.error("Error signing petition:", error);
      });
  }

  const handleFinishSignClick = async () => {
    if (!petitionId || !signId) {
      console.error("Missing petitionId or signId");
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/v1/petitions/`, {
        petitionId: petitionId,
        signId: signId,
      });
      console.log("Petition updated successfully!", response.data);
      window.alert("Petition updated successfully!");
      navigate("/BrowsePetitions");
    } catch (error) {
      console.error("Error updating petition:", error);
    }
  };

  if (!petition) {
    return <div>Loading...</div>;
  }
  let signedCount = petition?.signed?.length || 0;

  const percentage = Math.round((signedCount / petition.target) * 100);

  return (
    <div className="flex">
      <div className="w-3/5 m-10">
        <img
          src={petition.image || defaultImg}
          alt=""
          className="w-3/4 rounded-lg mb-4 mx-auto"
        />
        <h1 className="font-bold text-xl mb-2">{petition.petitionName}</h1>

        <p className="line-clamp-5 mb-2">{petition.petitionContent}</p>
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
                {signedCount + "/" + petition.target + " "}signatures
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex mb-4">
          <div className="mr-2 w-1/2">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="lastName"
            >
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your last name"
            />
          </div>
          <div className="ml-2 w-1/2">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="firstName"
            >
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your first name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="phone">
            Phone Number (Optional)
          </label>
          <input
            type="text"
            id="phone"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your phone number (optional)"
          />
        </div>

        <div className="flex">
          {isSigning && <Loading />}
          <button
            onClick={handleSign}
            className={
              "py-3 px-6 mr-3 " +
              (isSigning ? "bg-gray-400 cursor-not-allowed" : "")
            }
            disabled={isSigning}
          >
            Sign
          </button>
          <button
            onClick={handleFinishSignClick}
            className={
              "py-3 px-6 text-gray-50" +
              (canFinishSign
                ? " bg-teal-500"
                : " bg-gray-400 cursor-not-allowed")
            }
            disabled={!canFinishSign}
          >
            Finish Sign
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePetitionPage;
