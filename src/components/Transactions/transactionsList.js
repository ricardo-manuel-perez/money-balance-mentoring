import React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Tooltip } from '@mui/material';
import './transactions.css';
import { currencyFormatter } from '../../utils/utils/format';
import { Badge } from '@mui/material';
import { TransactionType } from '../../utils/utils/constants';
import PropTypes from 'prop-types';

const TransactionsList = ({transactionsState}) => {

  return (<div className="row">
    {transactionsState.map((transaction, i) => {
      return (<div className="column" key={i}>
        <Card className='transaction-card'>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box className='transaction-content'>
              <Typography component="h1" variant="h4">
                <strong>{transaction.title}</strong>
              </Typography>
              {transaction.type === TransactionType.deposit ?
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
                {transaction.type === TransactionType.deposit ?
                  currencyFormatter.format(transaction.amount)
                  :
                  ' - ' + currencyFormatter.format(transaction.amount)
                }
              </Typography>
              <Typography component="h6">
                <strong>{'Fecha: '}</strong>
                {new Date(transaction.date).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>)
    })}
  </div>
  );
};

TransactionsList.propTypes = {
  transactionsState: PropTypes.array.isRequired
}


export default TransactionsList;