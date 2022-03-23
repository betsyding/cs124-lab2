import { initializeApp } from "firebase/app";
import {collection, deleteDoc, doc, getFirestore, query, setDoc} from "firebase/firestore";
import './App.css';
import './TaskItem';
import AppHeader from "./AppHeader";
import TaskList from "./TaskList";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyD2Qc2rKu6YBO6pugcmKQ65JQhSS7VlmEQ",
    authDomain: "cs124-lab-3.firebaseapp.com",
    projectId: "cs124-lab-3",
    storageBucket: "cs124-lab-3.appspot.com",
    messagingSenderId: "958194478289",
    appId: "1:958194478289:web:7c9e5383b578ce60f429f0"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionName = "Task-Items";

function App() {
    const [hideCompleted, setHideCompleted] = useState(true);

    const [editedID, setEditedID] = useState(null);
    const q = query(collection(db, collectionName));

    const [taskItems, loading, error] = useCollectionData(q);
    console.log(taskItems);

    function handleUncompleted(){
        setHideCompleted(!hideCompleted);
        console.log(displayData)
    }

    function handleDelete(){
        // props.onDataChange(taskItems.filter(taskItem => !taskItem.isCompleted));
        //
        // console.log(props.data)
        // console.log(displayData)

       taskItems.forEach(taskItem => taskItem.isCompleted? deleteDoc(doc(db, collectionName, taskItem.taskId)):taskItem);
     }

    function handleChange(taskID, field, value) {
        //setData(data.map(taskItem => taskItem.taskId === taskID ? {...taskItem, [field]:value}:taskItem))

        void setDoc(doc(db, collectionName, taskID),
            {[field]: value}, {merge: true})
    }

    function handlePlusClick() {
        // const newRandomId = generateUniqueID();
        // const newData = data.concat(
        //     {
        //         taskName: "New Item",
        //         taskId: newRandomId,
        //         isCompleted: false,
        //     }
        // )
        // setData(newData);
        // setEditedID(newRandomId);

        const uniqueId = generateUniqueID();
        void setDoc(doc(db, collectionName, uniqueId),
            {
                taskId: uniqueId,
                taskName: "",
                isCompleted: false,
                priority: "high",
            });
    }

    if (loading) {
        return "loading...";
    }

    if (error) {
        return "Error: " + error;
    }

    console.log("hideCompleted", hideCompleted);
    const displayData = taskItems.filter(taskItem => !taskItem.isCompleted || !hideCompleted);
    console.log("displayData", displayData);

  return (
      <div>
          <AppHeader/>
          <button className="uncompleted" type="button" id="showUncom" onClick = {handleUncompleted}>
              {hideCompleted? "Show all":"Hide completed"} </button>
          <button className="deleteCompleted" type="button" id="delete" onClick = {handleDelete}> Delete completed</button>
          <TaskList data = {displayData}
                    handleChange={handleChange} editedID={editedID} setEditedID = {setEditedID} />
          <div className = "divButton"> <button className="plus-button" type="button" id="plus" onClick = {handlePlusClick}> + </button>
          <label htmlFor="plus" className="newItem"> Create new item </label></div>
          <br/>
      </div>
  );
}

export default App;
