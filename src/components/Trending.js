import React, { useState, useEffect } from "react";
import axios from "axios";
import PetitionCard from "../components/PetitionCard";
import { BASE_URL } from "../config";

const Trending = () => {
  const [trendingPetitions, setTrendingPetitions] = useState([]);

  useEffect(() => {
    const fetchTrendingPetitions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/v1/petitions/allpetitions`
        );
        // 从响应中取得前6个petitions
        const topPetitions = response.data.slice(0, 6);
        setTrendingPetitions(topPetitions);
      } catch (error) {
        console.error("Error fetching trending petitions:", error);
      }
    };

    fetchTrendingPetitions();
  }, []);
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
    <div className="w-full my-32">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl text-teal-950 font-bold">
            Trending Petitions
          </h2>
        </div>

        {/* 显示热门请愿的列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trendingPetitions.map((petition) => (
            <PetitionCard
              key={petition._id}
              id={petition._id}
              title={petition.petitionName}
              author={petition.author}
              createdOn={petition.createdOn}
              description={petition.description}
              numberOfSigned={countSigned(petition.signatures)}
              target={10}
              image={petition.image}
              pdfData={petition.pdfData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
