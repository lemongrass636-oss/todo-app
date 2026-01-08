import { Paper, Typography, Switch, FormControlLabel } from '@mui/material';

export default function SettingsPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>設定画面</Typography>
      <FormControlLabel control={<Switch defaultChecked />} label="ダークモード" />
      <FormControlLabel control={<Switch />} label="通知をオンにする" />
    </Paper>
  );
}