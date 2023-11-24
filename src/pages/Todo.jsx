import { useState, useEffect, useRef, useCallback } from "react";

import { PlusIcon } from "@heroicons/react/20/solid"
import useKeyboardJs from 'react-use/lib/useKeyboardJs';

import "../styles/todos.css";

import TodoService from "../services/TodoService";

import TodoList from "../components/TodoList";

const Todo = () => {
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const defaultNewTask = useCallback(() => ({ text: "", id: null }), []);
    const [newTask, setNewTask] = useState(defaultNewTask);

    const inputEl = useRef(null);
    const formEl = useRef(null);
    const submitBtnEl = useRef(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (newTask.text === "") {
            return; // do nothing when nothing is typed
        }

        const todoService = new TodoService()
        const { activeTasks } = todoService.addTask(newTask);
        setNewTask(defaultNewTask);
        setActiveTasks([...activeTasks]);
        inputEl.current.style.height = "auto"; // reset the height of the input field
    }, [newTask, defaultNewTask]);

    const [isPressed, keyboardEvent] = useKeyboardJs("ctrl + enter");

    useEffect(() => {
        const { activeTasks, completedTasks } = new TodoService().getTasks()
        setActiveTasks([...activeTasks]);
        setCompletedTasks([...completedTasks]);
    }, [])

    useEffect(() => {
        if (isPressed && (keyboardEvent.target.tagName === "TEXTAREA")) {
            formEl.current.requestSubmit(submitBtnEl.current);
        };
    }, [isPressed, keyboardEvent, handleSubmit]);

    const findTaskIndex = useCallback((taskId, arr) => {
        const index = arr.findIndex(task => task.id === taskId);
        return index;
    }, []);

    const completeTask = (taskId) => {
        const i = findTaskIndex(taskId, activeTasks);
        const task = activeTasks[i];

        const { activeTasks: active, completedTasks } = new TodoService().completeTask(task);

        setActiveTasks([...active]);
        setCompletedTasks([...completedTasks]);
    };

    const reactivateTask = (taskId) => {
        const index = findTaskIndex(taskId, completedTasks);
        const task = completedTasks[index];

        const { activeTasks: active, completedTasks: complete } = new TodoService().undoCompleteTask(task)

        setActiveTasks([...active]);
        setCompletedTasks([...complete]);
    };

    const deleteTask = (taskId) => {
        const index = findTaskIndex(taskId, completedTasks);
        const task = completedTasks[index];

        const { completedTasks: complete } = new TodoService().deleteCompletedTask(task);

        setCompletedTasks([...complete]);
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

        setNewTask({ id: task.id, text });
        inputEl.current.focus();

        const { activeTasks: active } = new TodoService().deleteActiveTask(task);
        setActiveTasks([...active]);
    }

    const actionTrigger = (actiontype, taskId) => {
        if (actiontype === "complete") {
            completeTask(taskId);
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

    return (
        <section className='todo-page'>
            <p className="todo-page-title">Track your progress and improve your productivity with this amazing todo list</p>


            <div className="todo-page-main">
                <form
                    onSubmit={handleSubmit}
                    ref={formEl}
                >
                    <textarea
                        ref={inputEl}
                        type="text"
                        className="todo-page-input todo-textarea"
                        rows={1}
                        placeholder="Write a new task. Use // to write a note"
                        value={newTask.text}
                        onInput={() => {
                            inputEl.current.style.height = `auto`
                            inputEl.current.style.height = `${inputEl.current.scrollHeight}px`
                        }}
                        onChange={(e) => setNewTask(prev => ({ ...prev, text: e.target.value }))}
                    />
                    <button
                        ref={submitBtnEl}
                        type="submit"
                        className="todo-page-add-btn btn-icon">
                        <PlusIcon className="icon" />
                        <p className="text">Add list</p>
                    </button>
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
