import React, {useState} from 'react';
import axios from 'axios'

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = ()=> {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: null,
  //     requestParams: {},
  //   };
  // }
// const [newData, setData] = useState({
//   data: null,
//   requestParams: {},
//   loading: false
// })

const [data, setData]=useState(null);
const [headers, setHeaders]=useState(null);
const [requestParams, setRequestParams]=useState({});
const [loading, setLoading]=useState(false);

  const callApi = async (params) => {
    // mock output
    // const data = {
    //   count: 2,
    //   results: [
    //     {name: 'fake thing 1', url: 'http://fakethings.com/1'},
    //     {name: 'fake thing 2', url: 'http://fakethings.com/2'},
    //   ],
    // };
    // setData({...newData, data});

    setLoading(true)
    setRequestParams(params)
      try{
        const response = await axios.get('https://swapi.dev/api/people/1/')
        setData(response.data)
        setHeaders(response.headers)
      }
        catch(e){console.error('cannot retrieve data', e)}
        
        // const response = await axios({
        //   method: params.method,
        //   url: params.url,
        //   data: params.body
        // })
      finally{
        setLoading(false)
      }

  }

 
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        <Form handleApiCall={callApi} />
        <Results data={data} headers = {headers} loading = {loading} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;