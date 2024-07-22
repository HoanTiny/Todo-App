export interface TodoItemProps {
  name: string;
  todoId: number;
  isImportant?: boolean;
  isCompleted?: boolean;
  handleCompleteCheckbox: (todoId: number) => void;
  handleShowSidebar?: () => void;
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <div className="todo-item">
      <div
        style={{
          display: "flex",
          gap: "4px",
        }}
        onClick={props.handleShowSidebar}
      >
        <input
          type="checkbox"
          onChange={() => props.handleCompleteCheckbox(props.todoId)}
          checked={props.isCompleted}
          onClick={(e) => e.stopPropagation()}
        />
        <div>{props.name}</div>
      </div>
      {props.isImportant && <div>⭐</div>}
    </div>
  );
}
