import TaskStore, { TaskType } from "../store/TaskStore";

export default ({ task }: { task: TaskType }) => {
    return (<>
        <div>
            <label>
                <input type="checkbox" onChange={() => TaskStore.toggleIsDone(task.id)} checked={task.isDone} />
                {task.title}
            </label>
            {/* //add input to remove */}
        </div>
    </>)
}