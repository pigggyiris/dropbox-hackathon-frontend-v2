import React from "react";
import { Link } from 'react-router-dom';

const StartPetitionNextPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Start Petition (Step 2/2)</h1>

            <div className="space-y-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Preview your petition</h2>
                <div className="border bg-gray-100 h-64 mb-4"></div> {/* AI generated model*/}
                <div className="flex justify-end gap-4">
                    <button className="px-6 py-2">Sign</button>
                    <button className="px-6 py-2">Save</button>
                    <button className="px-6 py-2">Export</button>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Preference</h2>
                <div className="flex mb-4">
                    <div className="w-1/4">
                        <input type="checkbox" id="privatePublic" name="privatePublic" />
                        <label htmlFor="privatePublic" className="ml-2 font-semibold">Private or Public:</label>
                    </div>
                    <div className="w-3/4">Check if you do NOT want your campaign publicly listed at VoxPeti. So check if you want a 'private' petition. But, if you want a publicly listed campaign then leave the box unchecked.</div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/4">
                        <input type="checkbox" id="allowContact" name="allowContact" />
                        <label htmlFor="allowContact" className="ml-2 font-semibold">Allow Contact:</label>
                    </div>
                    <div className="w-3/4">If checked, people will be able to send you an email message to your mailbox through the web interface we provide. Your email address will NOT be viewable by anyone. People will only be able to contact you through the web interface we provide.</div>
                </div>
                <div className="flex">
                    <div className="w-1/4">
                        <input type="checkbox" id="terms" name="terms" />
                        <label htmlFor="terms" className="ml-2 font-semibold">Terms:</label>
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
}

export default StartPetitionNextPage;