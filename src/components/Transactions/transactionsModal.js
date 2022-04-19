import React from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import './transactions.css';
import TransactionForm from '../TransactionForm/transactionForm';
import PropTypes from 'prop-types';

const TransactionsModal = ({open, handleClose, accountId, balance}) => {
  return (<Modal
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
        <TransactionForm closeForm={handleClose} accountId={accountId} accountBalance={balance} />
      </Box>
    </Modal>
  );
};

TransactionsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
}

export default TransactionsModal;