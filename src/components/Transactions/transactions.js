import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getAccountQuery } from "../../services/Account/account";
import { useAuth } from "../../utils/Auth/use-auth";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../NotFound/notFound";
import "./transactions.css";
import { currencyFormatter } from "../../utils/utils/format";
import TransactionsModal from "./transactionsModal";
import TransactionsList from "./transactionsList";
import { getTransactionsQuery } from "../../services/Transaction/transaction";
import { UseGetEntity } from "../../services/Entity/entity";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Link } from "react-router-dom";

const Transactions = () => {
  const auth = useAuth();
  const { accountId } = useParams();
  const [accountState, setAccountsState] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initialFiler = {
    type: 3,
    date: {
      from: undefined,
      to: undefined,
    },
  };
  const [filter, setFilter] = useState(initialFiler);
  let transactionsQuery = getTransactionsQuery(accountId, filter);
  let transactionsState = UseGetEntity(transactionsQuery, filter);
  const transactionTypeOptions = [
    {
      value: 1,
      label: "Depósito",
    },
    {
      value: 2,
      label: "Retiro",
    },
    {
      value: 3,
      label: "Todas",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    if (auth.data && !auth.isLoading) {
      getAccountQuery(accountId)
        .then((result) => setAccountsState(result.data()))
        .catch(() => setAccountsState(undefined))
        .finally(() => setIsLoading(false));
    }
  }, [accountId]);

  return accountState ? (
    <>
      <Box className="back-button">
        <Link to={"/accounts"}>Volver</Link>
      </Box>
      <div className="transactions">
        <Card>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box>
              <Typography component="h1" variant="h4">
                <strong>{accountState.name}</strong>
              </Typography>
              <Typography component="h1" variant="h5">
                {currencyFormatter.format(accountState.balance)}
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
                Agregar transacción
              </Button>
              <Divider />
              <Box>
                <TextField
                  id="outlined-select-type"
                  margin="normal"
                  select
                  label={"Tipo"}
                  variant="outlined"
                  type={"select"}
                  name={"type"}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      type: e.target.value,
                    })
                  }
                  value={filter.type}
                  helperText={"Filtrar por tipo de transacción"}
                >
                  {transactionTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <DateTimePicker
                  label="Desde"
                  value={filter.date.from}
                  onChange={(value) =>
                    setFilter({
                      ...filter,
                      date: {
                        ...filter.date,
                        from: value,
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField className="date-picker" {...params} />
                  )}
                />
                <DateTimePicker
                  label="Hasta"
                  minDate={filter.date.from}
                  value={filter.date.to}
                  onChange={(value) =>
                    setFilter({
                      ...filter,
                      date: {
                        ...filter.date,
                        to: value,
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField className="date-picker" {...params} />
                  )}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="info"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => setFilter(initialFiler)}
                >
                  Limpiar filtros
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <TransactionsList transactionsState={transactionsState} />
      </div>
      <TransactionsModal
        open={open}
        handleClose={handleClose}
        accountId={accountId}
        balance={accountState.balance}
      />
    </>
  ) : (
    !isLoading && <NotFound></NotFound>
  );
};

export default Transactions;
