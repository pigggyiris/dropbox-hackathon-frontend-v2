import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import HelloSign from "hellosign-embedded";
import Loading from "../components/Loading";
import { BASE_URL } from "../config";

const client = new HelloSign();

const StartPetitionNextPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [petitionText, setPetitionText] = useState(location.state.responseData);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [petitionId, setPetitionId] = useState(null);
  const [signId, setSignId] = useState(null);

  const [isSigning, setIsSigning] = useState(false);
  const [canCreateDelete, setcanCreateDelete] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSignClick = async () => {
    setIsSigning(true);
    setIsEditing(false);
    //检查一下发送到backend的text
    console.log("userName:", userName);
    console.log("userEmail:", userEmail);
    console.log("title:", location.state.title);
    console.log("petition:", petitionText);

    try {
      const response = await axios.post(`${BASE_URL}/v1/petitions/`, {
        userName: userName,
        userEmail: userEmail,
        title: location.state.title,
        petition: petitionText,
      });
      setIsSigning(false);
      setcanCreateDelete(true); // 已签署

      // 看看接收到的东西
      if (response.data && response.data.signUrl) {
        const signUrl = response.data.signUrl;

        setPetitionId(response.data.petitionId);
        setSignId(response.data.signId);

        console.log(response.data.signUrl);

        client.open(signUrl, {
          clientId: "efe3f85f67aafe39ff9adc714413cf11",
          skipDomainVerification: true,
        });
      } else {
        console.log("No signUrl provided in response");
      }

      console.log("Petition sent successfully!");
    } catch (error) {
      setIsSigning(false);
      console.error("Error sending petition:", error);
      window.alert("Error sending petition:", error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the currently signed petition?"
    );
    if (!confirmation) {
      return; // 点击了取消
    }

    if (!petitionId) {
      console.error("Missing petitionId");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/v1/petitions/${petitionId}`);
      window.alert("The signed petition has been deleted.");
      navigate("/StartPetition");
    } catch (error) {
      console.error("Error deleting petition:", error);
    }
  };

  const handleCreateClick = async () => {
    if (!petitionId || !signId) {
      console.error("Missing petitionId or signId");
      return;
    }

    setIsSigning(true);

    const callAPI = async () => {
      try {
        const response = await axios.put(`${BASE_URL}/v1/petitions/`, {
          petitionId: petitionId,
          signId: signId,
        });

        return response;
      } catch (error) {
        console.error("Error updating petition:", error);
        return null;
      }
    };
    let counter = 0;
    const intervalId = setInterval(async () => {
      const response = await callAPI();

      if (response && response.data.data !== null) {
        clearInterval(intervalId);
        setIsSigning(false);
        console.log("Petition updated successfully!", response.data);
        window.alert("Petition has been successfully created!");
        navigate("/BrowsePetitions");
      } else if (counter >= 8) {
        clearInterval(intervalId);
        setIsSigning(false);
        console.log("Max attempts reached.");
        window.alert(
          "Technical error while generating pdf in Dropbox, please try again."
        );
      } else {
        counter += 1;
        console.log("Data is null. Retrying in 5 seconds...");
      }
    }, 5000);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Start Petition (Step 2/2)</h1>
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Preview your petition</h2>
        <div className="border bg-gray-100 h-64 mb-4 overflow-y-auto">
          <textarea
            value={petitionText}
            onChange={(e) => setPetitionText(e.target.value)}
            className="w-full h-full bg-gray-100 border-none resize-none"
            readOnly={!isEditing}
          ></textarea>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <label className="block mb-2 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full border p-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleEditClick}
            className="px-6 py-2"
            disabled={isSigning}
          >
            Edit
          </button>

          <button
            onClick={handleSignClick}
            className="px-6 py-2 bg-teal-500 text-gray-50"
            disabled={isSigning || canCreateDelete}
          >
            Sign
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Preference</h2>
        <div className="flex mb-4">
          <div className="w-1/4">
            <input type="checkbox" id="privatePublic" name="privatePublic" />
            <label htmlFor="privatePublic" className="ml-2 font-semibold">
              Private or Public:
            </label>
          </div>
          <div className="w-3/4">
            Check if you do NOT want your campaign publicly listed at VoxPeti.
            So check if you want a 'private' petition. But, if you want a
            publicly listed campaign then leave the box unchecked.
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/4">
            <input type="checkbox" id="allowContact" name="allowContact" />
            <label htmlFor="allowContact" className="ml-2 font-semibold">
              Allow Contact:
            </label>
          </div>
          <div className="w-3/4">
            If checked, people will be able to send you an email message to your
            mailbox through the web interface we provide. Your email address
            will NOT be viewable by anyone. People will only be able to contact
            you through the web interface we provide.
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms" className="ml-2 font-semibold">
              Terms:
            </label>
          </div>
          <div className="w-3/4">I agree with VoxPeti's Terms of Use.</div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/StartPetition">
          <button className="px-6 py-2" disabled={isSigning}>
            Back
          </button>
        </Link>
        <button
          onClick={handleDeleteClick}
          className="px-6 py-2 bg-red-500 text-gray-50"
          disabled={!canCreateDelete || isSigning}
        >
          Delete
        </button>
        <button
          onClick={handleCreateClick}
          className="px-6 py-2 bg-teal-500 text-gray-50"
          disabled={!canCreateDelete || isSigning}
        >
          Create
        </button>
      </div>
      {isSigning && <Loading />}
    </div>
  );
};

export default StartPetitionNextPage;
