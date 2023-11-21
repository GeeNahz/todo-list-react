import "../styles/todo-card.css";

import { CheckIcon, PencilSquareIcon, ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/20/solid";


const Todo = ({ todotype, task, todoAction }) => {
    return (
        <div className="card">
            <div className="text">
                <p className="title">{task.task}</p>
                <p className="desc">{task.note}</p>
                <span className="date">{task.dueDate}</span>
            </div>
            <div className="actions">
                {
                    todotype === "complete"
                        ? (
                            <ArrowUturnLeftIcon
                                title="undo"
                                onClick={() => todoAction("reactivate", task.id)}
                                className="icon reactivate icon-btn"
                            />
                        )
                        : (
                            <CheckIcon
                                title="complete"
                                onClick={() => todoAction("complete", task.id)}
                                className="icon icon-btn complete"
                            />
                        )
                }
                {
                    todotype === "complete"
                        ? (
                            <TrashIcon
                                title="delete"
                                onClick={() => todoAction("delete", task.id)}
                                className="delete icon-btn"
                            />
                        )
                        : (
                            <PencilSquareIcon
                                title="edit"
                                onClick={() => todoAction("edit", task.id)}
                                className="icon edit icon-btn"
                            />
                        )
                }
            </div>
        </div>
    )
}

export default Todo;
