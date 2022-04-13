import { initializeApp } from "firebase/app";
import {collection, doc, getFirestore, query, setDoc} from "firebase/firestore";
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

function App() {

    const q = query(collection(db, "Lists"));
    const [lists, loading, error] = useCollectionData(q);


    function addList() {
        const uniqueListId = generateUniqueID();
        void setDoc(doc(db,collectionName, uniqueListId),
        {
            listId: uniqueListId,
            listName: "",
            isShown: true ,
        });
    }


    if (loading) {
        return "loading...";
    }

    if (error) {
        return "Error: " + error;
    }


  return (
      <div className="centerContent">
          <AppHeader/>
          <tbody>
          <br/>
          <div className = "listButton">
              <button className="list-button"
                      type = "button"
                      id="newList"
                      onClick = {addList}
                      aria-label={"Create new list"}
              >+</button>
              <label htmlFor="newList" className = "listName" > Create new list </label></div>
          <br/>
          {lists.map(list => <TaskList
              db={db}
              listId={list.listId}
              listName = {list.listName}
              key={list.listId}
          />)}
          </tbody>
          <br/>
      </div>
  );
}

export default App;
