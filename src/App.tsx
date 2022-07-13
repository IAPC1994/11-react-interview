import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

/**
 * First Challenge:
 * Create a counter with increase, decrease and reset button.
 * 
 * Second Challenge: 
 * Call a API and show the response on screen
 * 
 * Third Challenge: 
 * Get the name and the picture from the API
 * 
 * Last Challenge:
 * Create a button to show more users using the param ?page=2
 * @returns 
*/


export const App = () => {
  const [ apiResponse, setApiResponse ] = useState<string>('');
  const [ userInfo, setUserInfo ] = useState<any>([]);

  const [ page, setPage ] = useState<number>(1);

  useEffect(() => {
      axios.get(`https://randomuser.me/api?page=${ page }`)
        .then( ({ data }) => { 
            setApiResponse(data); 
            setUserInfo([...userInfo, data.results[0]]); 
          })
        .catch( (err) => {console.log(err)})
  }, [page]);
  

  const nextPage = () => {
    setPage( page + 1 );
  }

  const [ counter, setCounter ] = useState<number>(0);

  const increaseCounter = () => {
      setCounter( counter + 1 );
  }

  const decreaseCounter = () => {
      setCounter( counter - 1 );
  }

  const resetCounter = () => {
      setCounter( 0 );
  }
  
  return (
    <div className="App">
        <h1> Interview Begginer React </h1>
        <hr/>
        <h2> Counter: { counter } </h2>
        <button
          onClick={ increaseCounter }
        >
          Increase
        </button>

        <button
          onClick={ resetCounter}
        >
          Reset
        </button>

        <button
          disabled={ counter===0 }
          onClick={ decreaseCounter }
        >
          Decrease
        </button>
        <hr/>
        <h2>API Call</h2>
        <pre>
            { JSON.stringify( apiResponse, null, 2) }  
        </pre>

        <hr/>
        <h2>Show User from API</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
              userInfo.map( (user:any) => ((
                <div key={ user.login.uuid }>
                  <img src={ user.picture.large } alt={ user.picture.thumbnail }  />
                  <h4>
                    Full Name: { user.name.first } { user.name.last }
                  </h4>
                </div>
              )) )
          }   
        </div>
        <button
          onClick={ nextPage }
        >
            Show More
        </button>
    </div>
  );
}

export default App;
