import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HelloSign from "hellosign-embedded";

const client = new HelloSign();

const StartPetitionNextPage = () => {
  const { state } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [petitionText, setPetitionText] = useState(state);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSignClick = async () => {
    setIsEditing(false);
    try {
      const response = await axios.post("http://localhost:3000/v1/petitions/", {
        userName: userName,
        userEmail: userEmail,
        title: state.title,
        petition: petitionText,
      });

      // 看看有没有url
      if (response.data && response.data.signUrl) {
        const signUrl = response.data.signUrl;

        client.open(signUrl, {
          clientId: "efe3f85f67aafe39ff9adc714413cf11",
          skipDomainVerification: true,
        });
      } else {
        console.log("No signUrl provided in response");
      }

      console.log("Petition sent successfully!");
    } catch (error) {
      console.error("Error sending petition:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Start Petition (Step 2/2)</h1>
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Preview your petition</h2>
        <div className="border bg-gray-100 h-64 mb-4 overflow-y-auto">
          {isEditing ? (
            <textarea
              value={petitionText}
              onChange={(e) => setPetitionText(e.target.value)}
              className="w-full h-full bg-gray-100 border-none resize-none"
            ></textarea>
          ) : (
            petitionText
          )}
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
          <button onClick={handleEditClick} className="px-6 py-2">
            Edit
          </button>

          <button
            onClick={handleSignClick}
            className="px-6 py-2 bg-teal-500 text-gray-50"
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
          <button className="px-6 py-2">Back</button>
        </Link>
        <button className="px-6 py-2">Create</button>
      </div>
    </div>
  );
};

export default StartPetitionNextPage;
