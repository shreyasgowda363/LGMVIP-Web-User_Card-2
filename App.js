import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TAKE INFO
          </Typography>
          <Button color="inherit" onClick={getUsers}>
            Get Users
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {loading ? (
          <CircularProgress sx={{ m: 'auto' }} />
        ) : (
          users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/featured/?${user.name}`}
                  alt={user.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  {/* Add more user information here if needed */}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default App;
