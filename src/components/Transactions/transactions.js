import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { getAccountQuery } from '../../services/Account/account';
import { useAuth } from '../../utils/Auth/use-auth';
import Navbar from '../Navbar/navbar';
import { Card, CardContent, Typography, Button, Modal, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotFound from '../NotFound/notFound';
import './transactions.css';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { currencyFormatter } from '../../utils/utils/format';
import TransactionForm from '../TransactionForm/transactionForm';
import { getTransactionsQuery } from '../../services/Transaction/transaction';
import { Badge } from '@mui/material';
import { TransactionType } from '../../utils/utils/constants';
import { UseGetEntity } from '../../services/Entity/entity';

const Transactions = () => {
    const auth = useAuth();
    const { accountId } = useParams();
    const [accountState, setAccountsState] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    let history = useHistory();
    let transactionsState = UseGetEntity(getTransactionsQuery(accountId));

    useEffect(() => {
        setIsLoading(true);
        if(auth.data && !auth.isLoading) {
            getAccountQuery(accountId).then(result =>
              setAccountsState(result.data())
            ).finally(() => setIsLoading(false));
        }
    }, [accountId, accountState]);

    return (accountState ? <>
        <Navbar />
        <Box>
            <Button className='back-button' onClick={() => history.push('/accounts')}><ArrowBackIosIcon/>Volver</Button>
        </Box>
        <div className="transactions">
          <Card>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Box>
                <Typography component="h1" variant="h4">
                    <strong>{ accountState.name }</strong>
                </Typography>
                <Typography component="h1" variant="h5">
                    {currencyFormatter.format(accountState.balance)}
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
                  Agregar transacción
                </Button>
              </Box>
            </CardContent>
          </Card>
          <div className="row">
            {transactionsState.map((transaction, i) => {
              return (<div className="column" key={i}>
                <Card className='transaction-card'>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box className='transaction-content'>
                      <Typography component="h1" variant="h4">
                        <strong>{transaction.title}</strong>
                      </Typography>
                      { transaction.type === TransactionType.deposit ? 
                        <Badge badgeContent={<Typography component="h3" variant="h6">Depósito</Typography>} color="success">
                        </Badge> 
                        :
                        <Badge badgeContent={<Typography component="h3" variant="h6">Retiro</Typography>} color="error">
                        </Badge>
                      }
                      <Tooltip title={transaction.description}>
                        <div className='truncate'>
                          {transaction.description}
                        </div>
                      </Tooltip>
                      <Typography component="h1" variant="h6" className='amount'>
                        {'Monto: '}
                        { transaction.type === TransactionType.deposit ? 
                            currencyFormatter.format(transaction.amount)
                          :
                          ' - ' + currencyFormatter.format(transaction.amount)
                        }
                      </Typography>
                      <Typography component="h6">
                        <strong>{'Fecha: '}</strong>
                        { new Date(transaction.date).toLocaleString() }
                      </Typography>
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
            <TransactionForm closeForm={handleClose} accountId={accountId} accountBalance={accountState.balance}/>
          </Box>
        </Modal>
      </> : (!isLoading && <NotFound></NotFound>)
    );
};

export default Transactions;