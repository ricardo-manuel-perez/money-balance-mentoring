import React, { useState } from 'react';
import './home.css';
import Navbar from '../Navbar/navbar';
import { Card, CardContent, Modal } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountForm from '../AccountForm/accountForm';

const Home = () => {
  const [accounts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              onClick={handleOpen}
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 10,
        p: 4
      }}>
        <AccountForm />
      </Box>
    </Modal>
  </>
  );
}

export default Home;