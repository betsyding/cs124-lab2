import './TaskItem.css';
import {useState} from "react";

export default function TaskItem(props) {
    const task = props.taskItem;
    const [currentInput, setCurrentInput] = useState(task.taskName);

    console.log(task.taskName, task.priority);
    return (<tr>
        <input
            type="checkbox"
            checked={props.isCompleted}
            id={props.taskId}
            onChange={(e) =>
                props.handleChange(task.taskId, "isCompleted", e.target.checked)}/>

        <select className="priorities"
                defaultValue={task.priority}
                onChange={(e) => props.handleChange(task.taskId, "priority", parseInt(e.target.value))}>
            <option className="asap" value="1">High</option>
            <option className="mid" value="2">Medium</option>
            <option className="naur" value="3">Low</option>
        </select>
        {
            <input
                className="newItem isEditing"
                type="text"
                value={currentInput}
                id={props.taskId}
                onChange={(e)=>setCurrentInput(e.target.value)}
                onBlur={() => {props.setEditedID(null);
                                props.handleChange(task.taskId, "taskName", currentInput);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.target.blur();
                        props.handleChange(task.taskId, "taskName", currentInput);
                    }
                }}
                placeholder="✎ New Task"/>
        }

    </tr>)
}