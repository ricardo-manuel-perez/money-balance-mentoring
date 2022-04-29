import React, { useState } from "react";
import "./home.css";
import { Card, CardContent, Modal } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountForm from "../AccountForm/accountForm";
import { currencyFormatter } from "../../utils/utils/format";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PropTypes from 'prop-types';

const Home = ({ accountsStateParam, history }) => {
  const [accountsState, setAccountsState] = useState(accountsStateParam ? accountsStateParam : []);
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedAccount(undefined);
  };

  function handleEdit(account) {
    setSelectedAccount(account);
    handleOpen();
  }

  const goToTransactions = (path) => {
    history.push(path);
  };

  return (
    <>
      <div className="home">
        <Card>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box>
              <Typography component="h1" variant="h4">
                Cuentas disponibles
              </Typography>
              <Button
                className="add-button"
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
          {accountsState.map((account, i) => {
            return (
              <div className="column" key={i}>
                <Card id='account-card' className="account-card">
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box>
                      <Typography component="h1" variant="h4">
                        <strong>{account.name}</strong>
                      </Typography>
                      <Typography component="h1" variant="h6">
                        <strong>
                          {currencyFormatter.format(account.balance)}
                        </strong>
                      </Typography>
                      <Box>
                        <Button
                          className="edit-button"
                          type="button"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() => handleEdit(account)}
                        >
                          <ModeEditIcon />
                          Detalles
                        </Button>
                        <Button
                          className="delete-button"
                          type="button"
                          fullWidth
                          variant="contained"
                          color="error"
                          id="delete-account"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() => {
                            const filteredAccountState = accountsState.filter(accountList => accountList.id !== account.id);
                            setAccountsState(filteredAccountState);
                          }}
                        >
                          <DeleteForeverIcon />
                          Eliminar
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          className="transactions-button"
                          type="button"
                          variant="contained"
                          color="success"
                          id="go-to-transaction"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() =>
                            goToTransactions(
                              `/accounts/${account.id}/transactions`
                            )
                          }
                        >
                          <ReceiptIcon />
                          Transacciones
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 10,
            p: 4,
          }}
        >
          <AccountForm
            closeForm={handleClose}
            selectedAccount={selectedAccount}
          />
        </Box>
      </Modal>
    </>
  );
};

Home.propTypes = {
  accountsStateParam: PropTypes.array.isRequired,
  history: PropTypes.any.isRequired
}

export default Home;
