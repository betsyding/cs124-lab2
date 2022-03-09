
import './App.css';
import './TaskItem';
import './DataContainer';
import {useEffect, useState} from "react";
import AppHeader from "./AppHeader";
import TaskList from "./TaskList";

function App(props) {
    const [hideUncompleted, setHideUncompleted] = useState(true);
    const [displayData, setDisplayData] = useState(props.data);

    useEffect(()=>{setDisplayData(props.data)},[props.data]);

    function handleUncompleted(){
        if (hideUncompleted) {
            setDisplayData(props.data.filter(taskItem => !taskItem.isCompleted));
        }
        else{
            setDisplayData(props.data)
        }
        setHideUncompleted(!hideUncompleted);
        console.log(displayData)
    }

    function handleDelete(){
        props.onDataChange(props.data.filter(taskItem => !taskItem.isCompleted));
        //setDisplayData(props.data);
        console.log(props.data)
        console.log(displayData)
    }

  return (
      <div>
          <AppHeader/>
          <TaskList data={displayData} handleChange={props.handleChange} editedID={props.editedID} setEditedID = {props.setEditedID} />
          <button className="plus-button" type="button" id="plus" onClick = {props.handlePlusClick}> + </button>
          <label htmlFor="plus" className="newItem"> Create new item </label>
          <br/>
          <button className="uncompleted" type="button" id="showUncom" onClick = {handleUncompleted}>
              {hideUncompleted? "Hide completed items":"Show all items"} </button>
          <button className="deleteCompleted" type="button" id="delete" onClick = {handleDelete}> Delete completed items </button>
      </div>
  );
}

export default App;
