import { useState, useEffect } from 'react';
import { 
  Grid, Paper, Typography, TextField, Button, List, 
  ListItem, ListItemText, IconButton, Checkbox, Box, 
  CircularProgress, Divider, Badge, Container 
} from '@mui/material';
import { LocalizationProvider, DateCalendar, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

// --- 型定義 ---
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: string | null;
}

// --- カレンダーの「日」のカスタムコンポーネント ---
interface CustomPickerDayProps extends PickersDayProps {
  highlightedDays?: string[];
}

function ServerDay(props: CustomPickerDayProps) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // その日が未完了タスクの期限日リストに含まれているか
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <Box sx={{ width: 6, height: 6, bgcolor: 'secondary.main', borderRadius: '50%' }} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

// --- メインコンポーネント ---
export default function TodoPage() {
  // ステート: Todoリスト
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('my-todos');
    return saved ? JSON.parse(saved) : [];
  });

  // ステート: 入力フォーム
  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // ステート: カレンダーフィルター
  const [filterDate, setFilterDate] = useState<Dayjs | null>(dayjs());

  // 保存処理
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  // ロジック: タスク追加
  const addTodo = () => {
    if (!inputText.trim()) return;
    const newTodo: Todo = { 
      id: Date.now(), 
      text: inputText, 
      completed: false,
      deadline: selectedDate ? selectedDate.toISOString() : null 
    };
    setTodos([...todos, newTodo]);
    setInputText("");
    setSelectedDate(dayjs());
  };

  // ロジック: 削除・完了切り替え
  const deleteTodo = (id: number) => setTodos(todos.filter(t => t.id !== id));
  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // 統計計算
  const total = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  // カレンダーに印を付ける日のリスト (未完了の期限日)
  const highlightedDays = todos
    .filter(todo => todo.deadline && !todo.completed)
    .map(todo => dayjs(todo.deadline).format('YYYY-MM-DD'));

  // フィルタリングされたToDoリスト
const filteredTodos = todos
    .filter(todo => {
      // 1. カレンダーで選択された日のタスクだけを抽出
      if (!filterDate) return true;
      if (!todo.deadline) return false;
      return dayjs(todo.deadline).isSame(filterDate, 'day');
    })
    .sort((a, b) => {
      // 2. 期限が近い順に並び替える
      // 両方に期限がある場合
      if (a.deadline && b.deadline) {
        return dayjs(a.deadline).diff(dayjs(b.deadline));
      }
      // 片方にしか期限がない場合（期限がある方を上に）
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return 0;
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          
          {/* 【左側：タスク管理メインエリア】 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, minHeight: '600px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {filterDate ? `${filterDate.format('YYYY/MM/DD')} のタスク` : "すべてのタスク"}
                </Typography>
                {filterDate && (
                  <Button size="small" onClick={() => setFilterDate(null)}>すべて表示</Button>
                )}
              </Box>

              {/* 入力フォーム */}
              <Box sx={{ display: 'flex', gap: 1, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField 
                  fullWidth 
                  label="新しいタスクを入力" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <DatePicker 
                  label="期限"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ textField: { sx: { minWidth: '250px' } } }}
                />
                <Button variant="contained" onClick={addTodo} sx={{ px: 4, py: 1.5 }}>
                  追加
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* タスクリスト */}
              <List>
                {filteredTodos.map((todo) => {
                  const isOverdue = todo.deadline && dayjs(todo.deadline).isBefore(dayjs(), 'day') && !todo.completed;
                  return (
                    <ListItem
                      key={todo.id}
                      secondaryAction={
                        <IconButton onClick={() => deleteTodo(todo.id)} color="error"><DeleteIcon /></IconButton>
                      }
                      divider
                    >
                      <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                      <ListItemText 
                        primary={todo.text} 
                        secondary={
                          todo.deadline && (
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                              <CalendarMonthIcon sx={{ fontSize: 16 }} />
                              <Typography variant="caption" color={isOverdue ? 'error.main' : 'text.secondary'}>
                                期限: {dayjs(todo.deadline).format('YYYY/MM/DD')} {isOverdue && " (期限切れ)"}
                              </Typography>
                            </Box>
                          )
                        }
                        sx={{ 
                          textDecoration: todo.completed ? 'line-through' : 'none', 
                          opacity: todo.completed ? 0.6 : 1 
                        }}
                      />
                    </ListItem>
                  );
                })}
                {filteredTodos.length === 0 && (
                  <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                    この日のタスクはありません。
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          {/* 【右側：統計 ＆ カレンダー】 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'sticky', top: 20 }}>
              
              {/* 進捗レポートカード */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  進捗レポート
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3, position: 'relative' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={progress} 
                    size={100} 
                    thickness={5}
                    sx={{ color: progress === 100 ? 'success.main' : 'primary.main' }}
                  />
                  <Box sx={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Typography variant="h6" fontWeight="bold">{Math.round(progress)}%</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ListAltIcon color="action" />
                    <Typography variant="caption" display="block">全タスク</Typography>
                    <Typography variant="body1" fontWeight="bold">{total}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography variant="caption" display="block">完了</Typography>
                    <Typography variant="body1" fontWeight="bold">{completedCount}</Typography>
                  </Box>
                </Box>
              </Paper>

              {/* カレンダーカード */}
              <Paper elevation={3} sx={{ p: 1, borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 'bold' }}>
                  スケジュール
                </Typography>
                <Divider />
                <DateCalendar 
                  value={filterDate}
                  onChange={(newDate) => setFilterDate(newDate)}
                  slots={{ day: ServerDay }}
                  slotProps={{
                    day: { highlightedDays } as any,
                  }}
                  sx={{ width: '100%' }}
                />
                <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'secondary.main', borderRadius: '50%' }} />
                  <Typography variant="caption" color="text.secondary">● はタスクの期限日</Typography>
                </Box>
              </Paper>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </LocalizationProvider>
  );
}