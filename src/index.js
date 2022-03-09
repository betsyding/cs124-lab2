import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DataContainer from './DataContainer';

let initialData=[
        {
            taskName: "feed dog",
            taskId: 0,
            isCompleted: false,
        }, {
            taskName: "steal pomona banner",
            taskId: 2,
            isCompleted: true
        }
    ]


ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
      <DataContainer data={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
