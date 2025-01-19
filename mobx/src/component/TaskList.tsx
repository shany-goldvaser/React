import { observer } from "mobx-react"
import TaskStore from "../store/TaskStore"
import AddTask from "./AddTask"
import TaskItem from "./TaskItem"

export default observer(() => {
    return (<>
        <div>
            all tasks
            {TaskStore.taskList.map(t => <TaskItem key={t.id} task={t} />)}
        </div>
        <div>
            not done tasks
            {TaskStore.notDoneTasks.map(t => <TaskItem key={t.id} task={t} />)}
        </div>
        <AddTask />
    </>)
})