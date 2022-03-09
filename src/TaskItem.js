import './DataContainer'
import {useEffect, useRef} from "react";


export default function TaskItem(props) {
    const task = props.taskItem;
    const taskInputRef = useRef(null);

    useEffect(() => {
        if (taskInputRef.current && task.taskId === props.editedID) {
            taskInputRef.current.focus();
        }
    }, [props.editedID, task]);

    return (<div>
                <input
                    type = "checkbox"
                    checked = {props.isCompleted}
                    id = {props.taskId}
                    onChange={(e) =>
                    props.handleChange(task.taskId, "isCompleted", e.target.checked)}/>

                    {
                    task.taskId === props.editedID?
                        <input
                            className = "newItem isEditing"
                            type = "text"
                            value = {props.taskName} id = {props.taskId}
                            onChange={(e)=> props.handleChange(task.taskId, "taskName", e.target.value)}
                            onBlur = {() => props.setEditedID(null)}
                            onKeyPress = {(e)=>e.key === "Enter" && props.setEditedID(null)}
                            ref = {taskInputRef}
                            placeholder = "New Task"/>
                        : <span id="label" onClick ={() => props.setEditedID(task.taskId)}>{task.taskName}</span>
                    }
            </div>)
}