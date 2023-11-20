import Todo from "./Todo";

const TodoList = ({ activeTasks, completedTasks, actionTrigger }) => {
  function todoAction(action, id) {
    actionTrigger(action, id);
  }

  return (
    <section>
      <>
        <div className="active" style={{ marginBottom: "50px" }}>
          <h4>Active</h4>
          <div className="cards">
            {
              activeTasks.map(task => (
                <Todo key={task.id} todotype="active" task={task} todoAction={todoAction} />
              ))
            }
          </div>
        </div>

        <div className="complete">
          <h4>Completed</h4>
          <div className="cards">
            {
              completedTasks.map(task => (
                <Todo key={task.id} todotype="complete" task={task} todoAction={todoAction} />
              ))
            }
          </div>
        </div>
      </>
    </section>
  )
}

export default TodoList;
