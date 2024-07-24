import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import Filter from "./components/Filter";

export interface todoItem {
  id: number;
  name: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}

function App() {
  const [todos, setTodo] = useState<todoItem[]>([
    { id: 1, name: "Learn React", isImportant: true, isCompleted: true },
    { id: 2, name: "Learn TypeScript", isImportant: false, isCompleted: true },
  ]);
  const [value, setValue] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(`todos`, todos);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newTodo = {
        id: todos.length + 1,
        name: (event.target as HTMLInputElement)?.value,
        isCompleted: false,
        isImportant: false,
      };
      setTodo([...todos, newTodo]);
      setValue("");
      inputRef.current?.focus();
    }
  };

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCompleteCheckbox = (todoId: number) => {
    const newTodoList = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodo(newTodoList);
  };

  const handleShowSidebar = (todoId: number) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const activeTodoItem = todos.find((todo) => todo.id === activeTodoItemId);

  const handleSaveTodo = (newTodo: todoItem) => {
    const newTodoList = todos.map((t) => {
      if (t.id === newTodo.id) {
        return newTodo;
      }
      return t;
    });

    console.log(`todo`, newTodo);

    setTodo(newTodoList);
    setShowSidebar(false);
  };

  return (
    <div
      className="App"
      style={{
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <div className="filter">
        <Filter />
      </div>

      <div className="content">
        <h1>Todo App</h1>
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          value={value}
          onChange={handleOnchange}
          onKeyDown={handleKeyDown}
        />
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              name={todo.name}
              todoId={todo.id}
              isImportant={todo.isImportant}
              isCompleted={todo.isCompleted}
              handleCompleteCheckbox={handleCompleteCheckbox}
              handleShowSidebar={() => handleShowSidebar(todo.id)}
            />
          ))}

          <Sidebar
            active={showSidebar}
            activeTodo={activeTodoItem}
            handleSaveTodo={handleSaveTodo}
            setShowSidebar={() => setShowSidebar(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
