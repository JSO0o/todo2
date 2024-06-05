import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Tabs, Tab, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from './components/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialCategories = ['전체', '업무', '개인', '쇼핑'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [tasks, setTasks] = useState([
    { id: 1, category: '업무', title: '보고서 작성', text: '분기 보고서 작성 완료', deadline: new Date(), completed: false },
    { id: 2, category: '개인', title: '장보기', text: '우유, 빵, 버터 구매', deadline: new Date(), completed: false },
    { id: 3, category: '쇼핑', title: '새 신발 주문', text: '러닝화 사이즈 10 주문', deadline: new Date(), completed: false },
  ]);
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    category: '업무',
    title: '',
    text: '',
    deadline: new Date(),
  });

  const filteredTasks = tasks.filter(task => 
    selectedCategory === '전체' || task.category === selectedCategory
  );

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleTaskChange = (id, field, value) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, [field]: value } : task));
  };

  const handleClose = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, closed: true } : task));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setOpen(false);
    }
  };

  const handleDeleteCategory = (category) => {
    if (category === '전체') return; // "전체" 카테고리는 삭제 불가
    setCategories(categories.filter(cat => cat !== category));
    setTasks(tasks.filter(task => task.category !== category));
    setSelectedCategory('전체');
  };

  const handleAddTask = () => {
    const newTaskWithId = { ...newTask, id: tasks.length + 1, completed: false };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      category: '업무',
      title: '',
      text: '',
      deadline: new Date(),
    });
    setOpenTaskDialog(false);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            할 일 목록
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>카테고리 추가</Button>
          <Button color="inherit" onClick={() => setOpenTaskDialog(true)}>할 일 추가</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories.map(category => (
            <Tab
              key={category}
              label={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {category}
                  {category !== '전체' && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </span>
              }
              value={category}
            />
          ))}
        </Tabs>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {filteredTasks.map(task => (
            <Grid item xs={12} md={4} key={task.id}>
              <Card task={task} onTaskChange={handleTaskChange} onClose={handleClose} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>카테고리 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="카테고리 이름"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            취소
          </Button>
          <Button onClick={handleAddCategory} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>할 일 추가</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="카테고리"
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            SelectProps={{
              native: true,
            }}
            fullWidth
            margin="normal"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="제목"
            type="text"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="내용"
            type="text"
            fullWidth
            value={newTask.text}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
          />
          <div style={{ margin: '20px 0' }}>
            <Typography variant="body2">기한</Typography>
            <DatePicker
              selected={newTask.deadline}
              onChange={(date) => setNewTask({ ...newTask, deadline: date })}
              dateFormat="Pp"
              showTimeSelect
              style={{ width: '100%' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)} color="primary">
            취소
          </Button>
          <Button onClick={handleAddTask} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
