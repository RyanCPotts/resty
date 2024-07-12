import React, {useState} from 'react';
import axios from 'axios'
import {useEffect} from 'react'

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

  useEffect(()=>{
  const callApi = async () => {
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
    
      try{
        // const response = await axios.get('https://swapi.dev/api/people/1/')
        // const{url, method, body} = requestParams;
        const options = {
          method:requestParams.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body:requestParams.method != 'GET' && requestParams.body?JSON.stringify(requestParams.body):undefined
        }
        const responseData = await fetch(requestParams.url, options)
        const response = await responseData.json()
        setData(response)
        // setHeaders(Object.fromEntries(responseData.headers.entries()))
        setHeaders(responseData.headers)
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

  if(Object.keys(requestParams).length !==0){
    callApi();
  }
  },[requestParams]);

  const handleApiCall = (params)=>{
    setRequestParams(params)
  }
 
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        <Form handleApiCall={handleApiCall} />
        <Results data={data} headers = {headers} loading = {loading} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;