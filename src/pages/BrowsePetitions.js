import { useState } from "react";
import dummyPetitionData from "../components/dummyPetitionData";
import PetitionCard from "../components/PetitionCard";



function BrowsePetitionPage() {
    const [displayPetitions, setDisplayPetition] = useState(dummyPetitionData);

    
    const searchHandler = (e) => {
        const currentValue = e.target.value;
        if (!currentValue) {
            setDisplayPetition(dummyPetitionData);
        } else {
            const filteredPetitions = dummyPetitionData.filter(data => data.title.toLowerCase().includes(currentValue.toLowerCase()));
            setDisplayPetition(filteredPetitions);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">
                Browse Petitions
            </h1>
            
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={searchHandler}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPetitions.map((petition) => (
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
    );
}

export default BrowsePetitionPage;
