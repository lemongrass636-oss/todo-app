import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
// 今まで作ったToDoのロジックを TodoPage コンポーネントにまとめたと仮定
import TodoPage from './pages/TodoPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <>
      {/* ナビゲーションバー */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {/* Linkコンポーネントでページ移動（リロードなし！） */}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/settings">Settings</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* URLに応じて中身が入れ替わる場所 */}
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;