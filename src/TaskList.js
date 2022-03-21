import TaskItem from "./TaskItem";
import "./TaskList.css"

export default function TaskList(props){
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

