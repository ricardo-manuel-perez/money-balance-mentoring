import React, { useState } from 'react';
import './home.css';
import Navbar from '../Navbar/navbar';
import { Card, CardContent } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Home() {
  const [accounts] = useState([
    {
      name: 'Account 1',
      amount: '$ 1500,8665.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    },
    {
      name: 'Account 2',
      amount: '$ 340,561.00'
    }
  ]);

  return (<>
    <Navbar />
    <div className="home">
      <Card>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box>
            <Typography component="h1" variant="h4">
              Cuentas disponibles
            </Typography>
            <Button
              className='add-button'
              type="button"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => { }}
            >
              <AddIcon />
              Agregar cuenta nueva
            </Button>
          </Box>
        </CardContent>
      </Card>
      <div className="row">
        {accounts.map((a, i) => {
          return (<div className="column" key={i}>
            <Card className='account-card'>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Box>
                  <Typography component="h1" variant="h4">
                    {a.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="h1" variant="h6">
                    <strong>{a.amount}</strong>
                  </Typography>
                  <Button
                    className='edit-button'
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { }}
                  >
                    <ModeEditIcon />
                    Detalles
                  </Button>
                  <Button
                    className='delete-button'
                    type="button"
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { }}
                  >
                    <DeleteForeverIcon />
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </div>)
        })}
      </div>
    </div>
  </>
  );
}

export default Home;