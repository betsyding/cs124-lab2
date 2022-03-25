import './TaskItem.css';

export default function TaskItem(props) {
    const task = props.taskItem;
    console.log(task.taskName, task.priority);
    return (<div>
                <input
                    type = "checkbox"
                    checked = {props.isCompleted}
                    id = {props.taskId}
                    onChange={(e) =>
                    props.handleChange(task.taskId, "isCompleted", e.target.checked)}/>

        <select className = "priorities" defaultValue={task.priority}
                onChange={(e) => props.handleChange(task.taskId, "priority", e.target.value)}>
            <option className="asap" value="asap">ASAP</option>
            <option className="mid" value="mid">Maybe</option>
            <option className="naur" value="naur">Not Now</option>
        </select>

                {
                    // task.taskId === props.editedID?

                        <input
                            className = "newItem isEditing"
                            type = "text"
                            value = {props.taskName} id = {props.taskId}
                            onChange={(e)=> props.handleChange(task.taskId, "taskName", e.target.value)}
                            onBlur = {() => props.setEditedID(null)}
                            onKeyPress = {(e)=>{if (e.key === "Enter") {e.target.blur();}}}
                            placeholder = "✎ New Task"/>
                        // : <span id="label" onClick ={() => props.setEditedID(task.taskId)}>{task.taskName}</span>
                    }


            </div>)
}