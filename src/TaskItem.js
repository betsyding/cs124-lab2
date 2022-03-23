import './TaskItem.css';

export default function TaskItem(props) {
    const task = props.taskItem;

    return (<div>

                <input
                    type = "checkbox"
                    checked = {props.isCompleted}
                    id = {props.taskId}
                    onChange={(e) =>
                    props.handleChange(task.taskId, "isCompleted", e.target.checked)}/>

        <select className = "priorities"
                onChange={(e) => props.handleChange(task.taskId, "priority", e.target.value)}>
            <option className="high" value="high">High</option>
            <option className="mid" value="mid">Mid</option>
            <option className="low" value="low">Low</option>
        </select>

                {
                    // task.taskId === props.editedID?

                        <input
                            className = "newItem isEditing"
                            type = "text"
                            value = {props.taskName} id = {props.taskId}
                            onChange={(e)=> props.handleChange(task.taskId, "taskName", e.target.value)}
                            onBlur = {() => props.setEditedID(null)}
                            onKeyPress = {(e)=>{if (e.key === "Enter") {
                                                                                e.target.blur();}
                                                                            }}
                            placeholder = "✎ New Task"/>
                        // : <span id="label" onClick ={() => props.setEditedID(task.taskId)}>{task.taskName}</span>
                    }


            </div>)
}