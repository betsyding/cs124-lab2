import TaskItem from "./TaskItem";
import "./TaskList.css"
import {useCollectionData} from "react-firebase-hooks/firestore";

export default function TaskList(props){
    // const = useCollectionData(query(collection(props.db, "Lists", props.listID, "Tasks Items" ))
return(
        <div>
            <table>
                <tbody>
                    {props.data.map(t =>
                            <TaskItem taskItem={t}
                                      key={t.taskId}
                                      isCompleted={t.isCompleted}
                                      taskName={t.taskName}
                                      handleChange = {props.handleChange}
                                      editedID = {props.editedID}
                                      setEditedID = {props.setEditedID}/>)}
                </tbody>
            </table>
        </div>);
}

