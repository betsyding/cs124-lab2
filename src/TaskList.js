import {collection, deleteDoc, doc, query, serverTimestamp, setDoc, updateDoc, orderBy} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import TaskItem from "./TaskItem";
import {useState} from "react";
import "./TaskList.css";
import Alert from "./Alert";
import {collectionName, tasksCollectionName} from "./SignedInApp";

export default function TaskList(props) {

    const [hideCompleted, setHideCompleted] = useState(false);
    const [editedID, setEditedID] = useState(null);
    const [currentInput, setCurrentInput] = useState(props.listName);
    const [sortType, setSortType] = useState("priority");
    const q = query(collection(props.db, collectionName, props.listId, tasksCollectionName), orderBy(sortType, sortType === "creationDate"? "desc":"asc"));
    const [taskItems, loading, error] = useCollectionData(q);
    const [showAlert, setShowAlert] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    function handleDeleteItem(){
        console.log(taskItems);
        taskItems.forEach(taskItem => taskItem.isCompleted && deleteDoc(doc(props.db, collectionName, props.listId, tasksCollectionName, taskItem.taskId)));
    }

    function handleUncompleted(){
        setHideCompleted(!hideCompleted);
    }

    function handleChange(taskID, field, value) {
        void updateDoc(doc(props.db, collectionName, props.listId, tasksCollectionName, taskID),
            {[field]: value})
    }

    function handleChangeList(listId, field, value) {
        void updateDoc(doc(props.db, collectionName, props.listId),
            {[field]: value})
    }

    function addTask() {
        const uniqueId = generateUniqueID();
        void setDoc(doc(props.db, collectionName, props.listId, tasksCollectionName, uniqueId),
            {
                taskId: uniqueId,
                taskName: "",
                isCompleted: false,
                priority: 1,
                creationDate: serverTimestamp(),
            });
    }

    function handleDeleteList(){
        void taskItems.map(taskItem => deleteDoc(doc(props.db, collectionName, props.listId, tasksCollectionName, taskItem.taskId)));
        void deleteDoc(doc(props.db, collectionName, props.listId));
    }

    function handleShareList(newEmail) {
        // add user to shareWith array
        console.log(props.sharedWith);
        if (!props.sharedWith.includes(newEmail)) {
            void updateDoc(doc(props.db, collectionName, props.listId),
                {sharedWith: [...props.sharedWith, newEmail]});
            // console.log(props.shared
        }
    }

        // Unshare??

        function toggleModal() {
            setShowAlert(!showAlert);
        }

        return (
            <div className="everything">
                <br/>
                <div className="ownerLabel"> Owned by {props.ownerEmail} </div>
                <input
                    className="newList isEditing"
                    type="text"
                    value={currentInput}
                    id={props.listId}
                    aria-label={(currentInput === '' ? "type task list name here" : props.listName)}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onBlur={() => {
                        setEditedID(null);
                        handleChangeList(props.listId, "listName", currentInput);
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
                            defaultValue={sortType}
                            aria-label={"Drop down menu to specify sorting for list " + props.listName}>
                        <option value="priority"> priority</option>
                        <option value="taskName"> name</option>
                        <option value="creationDate">date</option>
                    </select>
                </div>
                <br/>
                <div className="black-border">
                    {!loading && !error &&
                        <>
                            <table>
                                <tbody className="makingGrids">
                                {taskItems.map(t =>
                                    (!t.isCompleted || !hideCompleted) && <TaskItem
                                        taskItem={t}
                                        key={t.taskId}
                                        isCompleted={t.isCompleted}
                                        taskName={t.taskName}
                                        handleChange={handleChange}
                                        editedID={editedID}
                                        setEditedID={setEditedID}/>)}
                                </tbody>
                            </table>
                        </>}
                    <div className="divButton">
                        <button className="plus-button"
                                type="button"
                                id={`plus-${props.listId}`}
                                onClick={addTask}
                                aria-label={"Create new item button."}> +
                        </button>

                        <label htmlFor={`plus-${props.listId}`} className="newItem"> Create New Item </label>
                        <br/>

                        <button className="uncompleted" type="button" id="showUncom" onClick={handleUncompleted}>
                            {hideCompleted ? "Show All Items" : "Hide Completed Items"} </button>

                        <button className="deleteCompleted" type="button" id="delete" onClick={handleDeleteItem}> Delete
                            Completed Items
                        </button>

                        {props.owner === props.user.uid && <button className="deleteList" type="button" id="deleteList" onClick={handleDeleteList}> Delete
                            List
                        </button>}

                        {props.owner === props.user.uid && <button className="shareList" type="button" id="shareList" onClick={toggleModal}> Share List
                        </button>}
                    </div>

                    <div>
                        {showAlert && <Alert onClose={toggleModal} onOK={() => handleShareList(newEmail)}
                                             setNewEmail={setNewEmail} newEmail={newEmail}/>}
                    </div>
                </div>
                <br/>
            </div>
        )
    }



