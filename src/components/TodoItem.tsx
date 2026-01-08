interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
      <span 
        onClick={() => onToggle(todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {todo.completed ? "✅ " : "⬜ "} {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} style={{ color: 'red' }}>削除</button>
    </li>
  );
}