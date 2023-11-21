import "../styles/todo.css";


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
                        ? <button onClick={() => todoAction("reactivate", task.id)} className="reactivate btn">Reactivate</button>
                        : <button onClick={() => todoAction("complete", task.id)} className="complete btn">Complete</button>
                }
                {
                    todotype === "complete"
                        ? <button onClick={() => todoAction("delete", task.id)} className="delete btn">Delete</button>
                        : <button onClick={() => todoAction("edit", task.id)} className="edit btn">Edit</button>
                }
            </div>
        </div>
    )
}

export default Todo;
