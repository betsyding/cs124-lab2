import {collection, deleteDoc, doc, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import TaskItem from "./TaskItem";
import {useState} from "react";
import "./TaskList.css";

export default function TaskList(props) {

    const [hideCompleted, setHideCompleted] = useState(false);
    const [taskItems, loading, error] = useCollectionData(query(collection(props.db, "Lists", props.listId, "Tasks")))
    const [editedID, setEditedID] = useState(null);
    const [currentInput, setCurrentInput] = useState(props.listName);
    const [sortType, setSortType] = useState("priority");

    function handleDeleteItem(){
        taskItems.forEach(taskItem => taskItem.isCompleted? deleteDoc(doc(props.db, "Lists", props.listId, "Tasks", taskItem.taskId)):taskItem);
    }

    function handleUncompleted(){
        setHideCompleted(!hideCompleted);
    }

    function handleChange(taskID, field, value) {
        void updateDoc(doc(props.db, "Lists", props.listId, "Tasks", taskID),
            {[field]: value})
    }

    function handleChangeList(listId, field, value) {
        void updateDoc(doc(props.db, "Lists", props.listId),
            {[field]: value})
    }

    function addTask() {
        const uniqueId = generateUniqueID();
        void setDoc(doc(props.db, "Lists", props.listId, "Tasks", uniqueId),
            {
                taskId: uniqueId,
                taskName: "",
                isCompleted: false,
                priority: 1,
                creationDate: serverTimestamp(),
            });
    }

    return (
        <div className="everything">
            <br/>
            <input
                className="newList isEditing"
                type="text"
                value={currentInput}
                id={props.listId}
                onChange={(e)=>setCurrentInput(e.target.value)}
                onBlur={() => {props.setEditedID(null);
                    handleChangeList(props.listId, "taskName", currentInput);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.target.blur();
                        handleChangeList(props.listId, "listName", currentInput);
                    }
                }}
                placeholder="✎ New List"/>
            <br/>
            <div className="sort"> Sort By:
                <select className="sorting"
                        onChange={(e) => setSortType(e.target.value)}
                        defaultValue={sortType}>
                    <option value = "priority"> priority </option>
                    <option value = "taskName"> name </option>
                    <option value = "creationDate">date</option>
                </select>
            </div>
            <br/>
        <div className="black-border">
            {!loading && !error &&
                <>
                <table>
                    <tbody>
                    {taskItems.map(t =>
                        (!t.isCompleted || !hideCompleted) && <TaskItem taskItem={t}
                                  key={t.taskId}
                                  isCompleted={t.isCompleted}
                                  taskName={t.taskName}
                                  handleChange = {handleChange}
                                  editedID = {editedID}
                                  setEditedID = {setEditedID}/>)}
                    </tbody>
                </table>
                </>}
            <div className = "divButton">
                <button className="plus-button" type="button" id="plus" onClick = {addTask}> + </button>
                <label htmlFor="plus" className="newItem"> Create new item </label>

                <button className="uncompleted" type="button" id="showUncom" onClick = {handleUncompleted}>
                {hideCompleted? "Show all":"Hide completed"} </button>

                <button className="deleteCompleted" type="button" id="delete" onClick = {handleDeleteItem}> Delete completed</button>
            </div>
        </div>
            <br/>
        </div>
    )
}


