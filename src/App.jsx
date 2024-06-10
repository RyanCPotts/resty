import React, {useState} from 'react';

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
const [newData, setData] = useState({
  data: null,
  requestParams: {}
})
  const callApi = () => {
    // mock output
    const data = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    setData({...newData, data});
  }

 
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {newData.requestParams.method}</div>
        <div>URL: {newData.requestParams.url}</div>
        <Form handleApiCall={callApi} />
        <Results data={newData.data} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;