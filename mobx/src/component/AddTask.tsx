import { useRef } from "react"
import TaskStore from "../store/TaskStore"

export default () => {
    const titleRef = useRef<HTMLInputElement>(null)
    const handleAdd = () => {
        TaskStore.addTask(titleRef.current?.value || '')
        titleRef.current!.value = ''
    }
    return (<>
        <input ref={titleRef} />
        <button onClick={handleAdd}>add task</button>
    </>)
}