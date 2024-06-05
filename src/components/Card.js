import React from 'react';
import { Paper, Typography, TextField, Checkbox, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const categoryColors = {
  '업무': '#f8d7da',
  '개인': '#d4edda',
  '쇼핑': '#d1ecf1',
};

function Card({ task, onTaskChange, onClose, onDelete }) {
  return (
    <Paper style={{ padding: 20, position: 'relative', backgroundColor: task.completed ? '#e0e0e0' : categoryColors[task.category] }}>
      <TextField
        label="제목"
        value={task.title}
        onChange={(e) => onTaskChange(task.id, 'title', e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="내용"
        value={task.text}
        onChange={(e) => onTaskChange(task.id, 'text', e.target.value)}
        fullWidth
        margin="normal"
      />
      <div style={{ margin: '20px 0' }}>
        <Typography variant="body2">기한</Typography>
        <DatePicker
          selected={task.deadline}
          onChange={(date) => onTaskChange(task.id, 'deadline', date)}
          dateFormat="Pp"
          showTimeSelect
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Checkbox
          checked={task.completed}
          onChange={(e) => onTaskChange(task.id, 'completed', e.target.checked)}
          color="primary"
        />
                <Typography variant="body2">완료됨</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" onClick={() => onClose(task.id)}>
          닫기
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(task.id)}>
          삭제
        </Button>
      </div>
    </Paper>
  );
}

export default Card;

