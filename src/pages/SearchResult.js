import React from "react";
import { useLocation } from 'react-router-dom';
import PetitionCard from '../components/PetitionCard'; 

function SearchResultPage() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Search Results</h1>

        {results.length === 0 && <p>No results found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((petition) => (
                <PetitionCard
                    key={petition._id}
                    id={petition._id}
                    title={petition.petitionName}
                    author={petition.author}
                    createdOn={petition.createdOn}
                    description={petition.petitionContent}
                    numberOfSigned={petition.numberOfSigned}
                    target={petition.target}
                    image={petition.image}
                    pdfData={petition.data}
                />
            ))}
        </div>
    </div>
  );
}

export default SearchResultPage;
