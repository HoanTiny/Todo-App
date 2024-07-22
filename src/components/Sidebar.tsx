import { useEffect, useState } from "react";
import { todoItem } from "../App";
import styles from "./Sidebar.module.scss";

// interface Todo {
//   name: string;
//   isImportant: boolean;
//   isCompleted: boolean;
//   // Add other properties if needed
// }

interface newTodo extends todoItem {
  name: string;
  isImportant: boolean;
  isCompleted: boolean;
}

interface SidebarProps {
  active: boolean;
  activeTodo: todoItem | undefined;
  handleSaveTodo: (todoItem: newTodo) => void;
  setShowSidebar: () => void;
}

function Sidebar({
  active,
  activeTodo,
  handleSaveTodo,
  setShowSidebar,
}: SidebarProps) {
  const [name, setNameTodo] = useState(activeTodo?.name);
  const [isImportant, setIsImportant] = useState(
    activeTodo?.isImportant || false
  );
  const [isCompleted, setIsCompleted] = useState(
    activeTodo?.isCompleted || false
  );

  useEffect(() => {
    setNameTodo(activeTodo?.name || "");
    setIsImportant(activeTodo?.isImportant || false);
    setIsCompleted(activeTodo?.isCompleted || false);
  }, [activeTodo]);

  const hanleSave = () => {
    const newTodo: newTodo = {
      ...activeTodo,
      name,
      isImportant,
      isCompleted,
    } as newTodo;
    console.log(33333, newTodo);

    handleSaveTodo(newTodo);
  };

  return (
    <div className={`${styles.sidebar} ${active ? styles.sidebarActive : ""}`}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <div className={styles.formItem}>
            <input
              type="text"
              id="sb-name"
              name="sb-name"
              className={styles.name}
              value={name || ""}
              placeholder="Todo name"
              onChange={(e) => setNameTodo(e.target.value)}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="sb-important">Todo important</label>
            <input
              type="checkbox"
              id="sb-important"
              name="isImpotant"
              checked={isImportant}
              onChange={() => setIsImportant(!isImportant)}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="sb-completed">Todo completed</label>
            <input
              type="checkbox"
              id="sb-completed"
              name="isCompleted"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
            />
          </div>
        </div>

        <div className={styles.action}>
          <button className={styles.btnSave} onClick={hanleSave}>
            Save
          </button>
          <button className={styles.btnCancel} onClick={() => setShowSidebar()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
