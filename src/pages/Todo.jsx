import { useState, useEffect, useRef, useCallback } from "react";

import { PlusIcon } from "@heroicons/react/20/solid"
import { v4 as uuidv4 } from "uuid";

import "../styles/todos.css";

import TodoList from "../components/TodoList";

const Todo = () => {
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const inputEl = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTask === "") {
            return; // do nothing when nothing is typed
        }

        const arr = newTask.split("//");
        let task = arr[0];
        let note = arr[1] || "";
        setNewTask("");

        const toCreate = {
            id: uuidv4(),
            isComplete: false,
            dueDate: new Date().toDateString(), // will require this later
            task,
            note,
        };

        setActiveTasks(prev => [...prev, toCreate]);
    };

    const findTaskIndex = useCallback((taskId, arr) => {
        const index = arr.findIndex(task => task.id === taskId);
        return index;
    }, []);

    const flagTaskAsComplete = (taskId) => {
        const index = findTaskIndex(taskId, activeTasks);
        activeTasks[index].isComplete = true;

        setActiveTasks([...activeTasks]);
    };

    const reactivateTask = (taskId) => {
        const index = findTaskIndex(taskId, completedTasks);
        completedTasks[index].isComplete = false;

        const task = completedTasks.splice(index, 1)[0];

        setActiveTasks(prev => [...prev, task]);
    };

    const deleteTask = (taskId) => {
        const index = findTaskIndex(taskId, completedTasks);
        completedTasks.splice(index, 1);
        setCompletedTasks([...completedTasks]);
    };

    const setupTaskForEditing = (taskId) => {
        const index = findTaskIndex(taskId, activeTasks);
        const task = activeTasks[index];

        let taskText = task.task;
        let note = task.note;
        let text = "";

        if (note !== "") {
            text = `${taskText} // ${note}`;
        } else {
            text = taskText;
        }

        setNewTask(text);
        inputEl.current.focus();

        activeTasks.splice(index, 1);
    }

    const actionTrigger = (actiontype, taskId) => {
        if (actiontype === "complete") {
            flagTaskAsComplete(taskId);
        } else if (actiontype === "edit") {
            setupTaskForEditing(taskId);
        } else if (actiontype === "delete") {
            if (window.confirm("Are you sure you want to delete the task?")) {
                deleteTask(taskId);
            }
        } else if (actiontype === "reactivate") {
            reactivateTask(taskId);
        } else {
            alert("Please provide a valid action trigger type");
        }
    };

    useEffect(() => {
        for (const task of activeTasks) {
            const index = findTaskIndex(task.id, activeTasks);
            if (task.isComplete === true) {
                const completed = activeTasks.splice(index, 1)[0];
                setCompletedTasks(prev => [...prev, completed]);
            }
        }
    }, [activeTasks, findTaskIndex]);

    return (
        <section className='todo-page'>
            <p className="todo-page-title">Track your progress and improve your productivity with this amazing todo list</p>


            <div className="todo-page-main">
                <form onSubmit={handleSubmit}>
                    <textarea
                        ref={inputEl}
                        type="text"
                        className="todo-page-input todo-textarea"
                        rows={1}
                        placeholder="Write a new task. Use // to write a note"
                        value={newTask}
                        onInput={() => {
                            inputEl.current.style.height = `auto`
                            inputEl.current.style.height = `${inputEl.current.scrollHeight}px`
                        }}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button type="submit" className="todo-page-add-btn btn-icon"><PlusIcon className="icon" /> <p className="text">Add list</p></button>
                </form>

                <TodoList
                    activeTasks={[...activeTasks].reverse()}
                    completedTasks={[...completedTasks].reverse()}
                    actionTrigger={actionTrigger}
                />
            </div>
        </section>
    );
}

export default Todo;
