import {useState} from "react";
import App from "./App";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import { initializeApp } from "firebase/app";
import {collection, deleteDoc, doc, getFirestore, query, setDoc} from "firebase/firestore";

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

const collectionName = "Task-Items"


export default function DataContainer(props) {
    // const [data, setData] = useState(props

    const [editedID, setEditedID] = useState(null);
    const q = query(collection(db, collectionName));

    const [taskItems, loading, error] = useCollectionData(q);
    console.log(taskItems);

    function handleChange(taskID, field, value) {
        //setData(data.map(taskItem => taskItem.taskId === taskID ? {...taskItem, [field]:value}:taskItem))
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
    }
if (loading){
    return "loading..";
}
    return (
        <div>
            <App data={taskItems}
                 // onDataChange={setData}
                 handleChange={handleChange}
                 handlePlusClick={handlePlusClick}
                 editedID={editedID}
                 setEditedID={setEditedID}
            />
        </div>
    )
}
