import React from "react";
import dummyPetitionData from "../components/dummyPetitionData";
import PetitionCard from "../components/PetitionCard";

const Trending = () => {
    // 假设热门请愿是前5个
    const trendingPetitions = dummyPetitionData.slice(0, 5);

    return (
        <div className='w-full my-32'>
            <div className='max-w-[1240px] mx-auto'>
                <div className='text-center mb-8'>
                    <h2 className='text-5xl text-teal-950 font-bold'>Trending Petitions</h2>
                </div>
                
                {/* 显示热门请愿的列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingPetitions.map((petition) => (
                        <PetitionCard
                            key={petition.id}
                            id={petition.id}
                            image={petition.image}
                            title={petition.title}
                            author={petition.author}
                            createdOn={petition.createdOn}
                            description={petition.description}
                            numberOfSigned={petition.signed.length}
                            target={petition.target}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
