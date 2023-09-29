import React from 'react';

function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-30 bg-gray-700">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-teal-500"></div>
        </div>
    );
}

export default Loading;
