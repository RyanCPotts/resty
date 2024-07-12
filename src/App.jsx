import React, { useReducer, useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react'
import History from './Components/History'

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {

  // const [data, setData]=useState(null);
  // const [headers, setHeaders]=useState(null);
  // const [requestParams, setRequestParams]=useState({});
  // const [loading, setLoading]=useState(false);
  // const [history, setHistory]=useState([]);

  const initialState = {
    data: null,
    headers: null,
    loading: false,
    requestParams: {},
    history: []

  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_REQUEST_PARAMS':
        return { ...state, requestParams: action.payload }
      case 'SET_LOADING':
        return { ...state, loading: true }
      case 'SET_DATA':
        return { ...state, data: action.payload.data, headers: action.payload.headers, loading: false }

      case 'ADD_HISTORY':
        return { ...state, history: [...state.history, action.payload] }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
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

      dispatch({ type: 'SET_LOADING' })

      try {
        // const response = await axios.get('https://swapi.dev/api/people/1/')
        const { url, method, body } = state.requestParams;
        const options = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: method != 'GET' && body ? JSON.stringify(body) : undefined
        }
        const responseData = await fetch(url, options)
        const response = await responseData.json()
        dispatch({
          type: 'SET_DATA',
          payload: { data: response, headers: Object.fromEntries(responseData.headers.entries()) }
        })
        dispatch({
          type: 'ADD_HISTORY',
          payload: { results: response, method, url, headers: Object.fromEntries(responseData.headers.entries()) }
        })
      }
      catch (e) { console.error('cannot retrieve data', e) }

      // const response = await axios({
      //   method: params.method,
      //   url: params.url,
      //   data: params.body
      // })
      // finally {
      //   dispatch({ type: 'SET_LOADING' })
      // }

    }

    if (Object.keys(state.requestParams).length !== 0) {
      callApi();
    }
  }, [state.requestParams]);

  const handleApiCall = (params) => {
    dispatch({ type: 'SET_REQUEST_PARAMS', payload: params })
  }

  const handleHistory = (item) => {
    dispatch({
      type: 'SET_DATA',
      payload: {
        data: item.results,
        headers: item.headers,
      }
    })
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.method}</div>
      <div>URL: {state.url}</div>
      <Form handleApiCall={handleApiCall} />
      <Results data={state.data} headers={state.headers} loading={state.loading} />
      <History history={state.history} handleHistory = {handleHistory}/>
      <Footer />
    </React.Fragment>
  );

}

export default App;