import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx"

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

class TaskStore {
    //observable
    taskList: TaskType[] = []
    //observable
    lengthCounter = 1

    constructor() {
        makeAutoObservable(this)
        // makeObservable(this, {
        //     taskList: observable,
        //     addTask: action,
        //     toggleIsDone: action,
        //     notDoneTasks: computed
        // })
    }

    //action
    addTask(title: string) {
        this.taskList.push(
            {
                id: this.lengthCounter++,
                title,
                isDone: false
            }
        )
    }

    //action
    toggleIsDone(id: number) {
        const thisTask = this.taskList.find(t => t.id === id)
        thisTask!.isDone = !thisTask?.isDone
    }

    //remove item by id

    //computed
    get notDoneTasks() {
        return this.taskList.filter(t => !t.isDone)
    }
}

export default new TaskStore()