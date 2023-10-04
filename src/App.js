import MyRoutes from './components/Routes'
import React from 'react';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
}, []);

  return (
    <div className="App">
      {isLoading && <Loading />}
      <MyRoutes />
    </div>
  );
}

export default App;

 