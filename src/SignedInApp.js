import { initializeApp } from "firebase/app";
import {collection, doc, getFirestore, query, setDoc, where} from "firebase/firestore";
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

export const collectionName = "Lists-SharingAllowed";
export const tasksCollectionName = "Tasks-SharingAllowed";


function SignedInApp(props) {
    const q = query(collection(db, collectionName), where("sharedWith", "array-contains", props.user.email));
    const [lists, loading, error] = useCollectionData(q);
    const [showOnlyMyLists, setShowOnlyMyLists] = useState(false);

    function addList() {
        const uniqueListId = generateUniqueID();
        void setDoc(doc(db,collectionName, uniqueListId),
        {
            listId: uniqueListId,
            listName: "",
            isShown: true,
            owner: props.user.uid,
            sharedWith: [props.user.email],
        });
    }

    if (loading) {
        return "loading...";
    }

    if (error) {
        return "Error: " + error;
    }

    function handleDisplayMyLists(){
        setShowOnlyMyLists(!showOnlyMyLists);
    }
    console.log(props.user);
  return (
      <div className="centerContent">
          <AppHeader/>
          <tbody>
          <br/>
          <div className = "showSharedButton">
               <button className = "showShared" onClick = {handleDisplayMyLists}>
                   {showOnlyMyLists? "Show Shared and My Lists":"Show Only My Lists"} </button>
          </div>
          <br/>
          <div className = "listButton">
              <button className="list-button"
                      type = "button"
                      id="newList"
                      onClick = {addList}
                      aria-label={"Create new list"}
              >+</button>
              <label htmlFor="newList" className = "listName" > Create New List </label></div>
          <br/>
          {lists.map(list => ((list.owner === props.user.uid) || !showOnlyMyLists) && <TaskList
              db={db}
              listId={list.listId}
              listName={list.listName}
              key={list.listId}
              owner={list.owner}
              sharedWith={list.sharedWith}
              ownerEmail={list.sharedWith[0]}
              user={props.user}
          />)}
          </tbody>
          <br/>
      </div>
  );
}

export default SignedInApp;
