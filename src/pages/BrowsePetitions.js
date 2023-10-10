import { useState, useEffect } from "react";
import axios from "axios";
import PetitionCard from "../components/PetitionCard";
import { BASE_URL } from "../config";

function BrowsePetitionPage() {
  const [displayPetitions, setDisplayPetition] = useState([]);

  useEffect(() => {
    // 发起请求获取所有petitions
    fetchPetitions();
  }, []); // 空依赖数组表示这个effect只会在组件mount时运行

  const fetchPetitions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/petitions/allpetitions`);
      console.log(response.data);

      setDisplayPetition(response.data); // 使用axios时，数据存储在response.data中
    } catch (error) {
      console.error("Error fetching petitions:", error);
    }
  };

  const searchHandler = async (e) => {
    const currentValue = e.target.value;
    if (!currentValue) {
      await fetchPetitions();
    } else {
      const filteredPetitions = displayPetitions.filter((petition) =>
        petition.petitionName.toLowerCase().includes(currentValue.toLowerCase())
      );
      setDisplayPetition(filteredPetitions);
    }
  };
  const countSigned = (signatures) => {
    let count = 0;
    for (let signature of signatures) {
      if (signature.isUsed) {
        count++;
      } else {
        return count;
      }
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Browse Petitions</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          onChange={searchHandler}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayPetitions.map((petition) => (
          <PetitionCard
            key={petition._id}
            id={petition._id}
            title={petition.petitionName}
            author={petition.author}
            createdOn={petition.createdOn}
            description={petition.petitionContent}
            numberOfSigned={countSigned(petition.signatures)}
            target={10}
            image={petition.image}
            pdfData={petition.data}
          />
        ))}
      </div>
    </div>
  );
}

export default BrowsePetitionPage;
