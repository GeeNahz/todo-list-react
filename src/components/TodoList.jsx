import TodoListCard from "./TodoListCard";

const TodoList = ({ activeTasks, completedTasks, actionTrigger }) => {
  function todoAction(action, id) {
    actionTrigger(action, id);
  }

  return (
    <section>
      <>
        <div className="active-section" style={{ marginBottom: "50px" }}>
          <h4>Active</h4>
          <div className="cards">
            {
              activeTasks.map(task => (
                <TodoListCard key={task.id} todotype="active" task={task} todoAction={todoAction} />
              ))
            }
          </div>
        </div>

        <div className="complete-section">
          <h4>Completed</h4>
          <div className="cards">
            {
              completedTasks.map(task => (
                <TodoListCard key={task.id} todotype="complete" task={task} todoAction={todoAction} />
              ))
            }
          </div>
        </div>
      </>
    </section>
  )
}

export default TodoList;
