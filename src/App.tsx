import { useContext, useMemo, useRef, useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import Sidebar from './components/Sidebar';
import Filter from './components/Filter';
import CategoryList from './components/CategoruList';
import { AppContext } from './context/AppProvider';

export interface todoItem {
  id: number;
  name: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  isDeleted?: boolean;
  category: string;
}

function App() {
  const [todos, setTodo] = useState<todoItem[]>([
    {
      id: 1,
      name: 'Learn React',
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: 'Học tập',
    },
    {
      id: 2,
      name: 'Learn TypeScript',
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: 'Books',
    },
  ]);

  const [filterItemId, setFilterItemId] = useState('all');

  const [value, setValue] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext must be used within a AppProvider');
  }

  const { selectedCategoryId } = context;

  console.log(`cate`, selectedCategoryId);
  console.log(`todos`, todos);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newTodo = {
        id: todos.length + 1,
        name: (event.target as HTMLInputElement)?.value,
        isCompleted: false,
        isImportant: false,
        category: 'Works',
      };
      setTodo([...todos, newTodo]);
      setValue('');
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

  const fitlerTodoList = useMemo(() => {
    return todos.filter((todos) => {
      if (!todos.name.includes(searchText)) {
        return false;
      }
      console.log(1111111, todos.id, selectedCategoryId);
      if (selectedCategoryId && todos.category !== selectedCategoryId) {
        return false;
      }
      switch (filterItemId) {
        case 'all':
          return true;
        case 'important':
          return todos.isImportant;
        case 'completed':
          return todos.isCompleted;
        case 'deleted':
          return todos.isDeleted;
        default:
          return true;
      }
    });
  }, [todos, filterItemId, searchText, selectedCategoryId]);

  console.log(searchText);

  return (
    <div
      className="App"
      style={{
        padding: '20px',
        cursor: 'pointer',
      }}
    >
      <div className="filter">
        <Filter
          filterItemId={filterItemId}
          setFilterItemId={setFilterItemId}
          todoList={todos}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <CategoryList />
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
          {fitlerTodoList.map((todo) => (
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
