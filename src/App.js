import { initializeApp } from "firebase/app";
import {collection, deleteDoc, doc, getFirestore, query, setDoc, orderBy, updateDoc, serverTimestamp} from "firebase/firestore";
import './App.css';
import './TaskItem';
import AppHeader from "./AppHeader";
import TaskList from "./TaskList";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {useState} from "react";
import {Tab} from "./Tab";

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

const collectionName = "Lists";
// const listDoc = (doc(db,"Lists", "List 1"))
// const subCollectionName = "TaskItems";
// const tasksDoc = getDoc(doc(db, "Lists/TaskItems/Tasks"))
// const subTaskList = doc(db,"T")

function App() {
    // const [hideCompleted, setHideCompleted] = useState(false);
    // const [sortType, setSortType] = useState("priority");

    // const [editedID, setEditedID] = useState(null);
    // const q = query(collection(db, "Lists"),
    //           orderBy(sortType, sortType === "creationDate"? "desc":"asc"));
    const q = query(collection(db, "Lists"))
    const [lists, loading, error] = useCollectionData(q);

    // if (!loading && !error) {
    //     console.log("Lists:", lists);
    // }
    // const [taskItems, loading, error] = useCollectionData(query(collection(props.db, "Lists", props.listID, "Tasks Items" ))

    // const taskCollection = collection(db, "Lists");

    function addList() {
        const uniqueListId = generateUniqueID();
        void setDoc(doc(db,collectionName, uniqueListId),
        {
            listId: uniqueListId,
            listName: "",
            isShown: true ,
        });
    }

    // Moved to TaskList
    // function handleUncompleted(){
    //     setHideCompleted(!hideCompleted);
    //     console.log(displayData)
    // }

    // //Move over
    // function handleDelete(){
    //     lists.forEach(taskItem => taskItem.isCompleted? deleteDoc(doc(db, collectionName, taskItem.taskId)):taskItem);
    // }

    //Move over
    // function handleChange(taskID, field, value) {
    //     console.log(taskID, field, value);
    //     updateDoc(doc(db, collectionName, taskID),
    //         {[field]: value})
    // }

    if (loading) {
        return "loading...";
    }

    if (error) {
        return "Error: " + error;
    }

    // console.log("hideCompleted", hideCompleted);
    // Move over:
    // const displayData = lists.filter(taskItem => !taskItem.isCompleted || !hideCompleted);
    // console.log("displayData", displayData);

  return (
      <div>
          <AppHeader/>

          {/*<button className="uncompleted" type="button" id="showUncom" onClick = {handleUncompleted}>*/}
          {/*    {hideCompleted? "Show all":"Hide completed"} </button>*/}

          {/*<button className="deleteCompleted" type="button" id="delete" onClick = {handleDelete}> Delete completed</button>*/}

          {/*<div className="sort"> Sort By:*/}
          {/*    <select className="sorting"*/}
          {/*            onChange={(e) => setSortType(e.target.value)}*/}
          {/*            defaultValue={sortType}>*/}
          {/*        <option value = "priority"> priority </option>*/}
          {/*        <option value = "taskName"> name </option>*/}
          {/*        <option value = "creationDate">date</option>*/}
          {/*    </select>*/}
          {/*</div>*/}
          <tbody>
          <br/>
          <div className = "listButton"><button className="list-button" type = "button" id="newList" onClick = {addList}>+</button>
              <label htmlFor="newList" className = "listName" > Create new list </label></div>
          <br/>
          {lists.map(list => <TaskList
              db={db}
              listId={list.listId}
              listName = {list.listName}
              key={list.listId}
          />)}
          </tbody>
          {/*<TaskList data = {displayData}*/}
          {/*          handleChange={handleChange} editedID={editedID} setEditedID = {setEditedID} />*/}

          {/*<div className = "divButton">*{/*<button className="plus-button" type="button" id="plus" onClick = {addTask}> + </button>*/}
          {/*<label htmlFor="plus" className="newItem"> Create new item </label></div>*/}
          <br/>
      </div>
  );
}

export default App;
