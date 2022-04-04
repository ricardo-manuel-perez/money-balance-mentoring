import React, { useState } from 'react';
import BaseForm from '../BaseForm/baseForm';
import PropTypes from 'prop-types';
import { postTransaction } from '../../services/Transaction/transaction';
import { TransactionType } from '../../utils/utils/constants';
import { updateAccount } from '../../services/Account/account';


const emptyTransaction = {
    title: '',
    description: '',
    amount: 0,
    type: 1
}

const TransactionForm = ({ closeForm, accountId, accountBalance }) => {
    const [formTransaction, setFormTransaction] = useState(emptyTransaction);

    const updateFormTransaction = (newFormTransaction) => {
        if (newFormTransaction)
        setFormTransaction(newFormTransaction);
    }
    
    const sendRequesToAdd = () => {
        try {
            if(formTransaction.type === TransactionType.deposit || parseInt(accountBalance) >=  parseInt(formTransaction.amount))
            {
                new Promise((resolve) => {
                    postTransaction(accountId,
                    {
                        ... formTransaction,
                        date: Date.now()
                    });
                    resolve();
                })
                .then(() => {
                    let newBalance = parseInt(accountBalance);
                    let amount = parseInt(formTransaction.amount);
                    if(formTransaction.type === TransactionType.deposit)
                        newBalance = newBalance + amount;
                    else
                        newBalance = newBalance - amount;

                    updateAccount(accountId, {
                        balance: newBalance.toString()
                    });
                })
                .finally(() => closeForm())

            } else {
                alert("No cuentas con los fondos suficientes para realizar esta transacción")
            }
        }catch(e) {
            console.error(e);
        }
    }

    const onSubmit = () => {
        sendRequesToAdd();
    };

    return (
        <div className="App">
            <h1>{'Agregar transacción'}</h1>
            <BaseForm initialValues={emptyTransaction}
                onSubmit={onSubmit}
                submitLabel={'Agregar transacción'}
                formInputs={[
                    {
                        interface: 'input',
                        type: 'text',
                        label: 'Titulo de la transacción',
                        name: 'title',
                        onChange: (e) => { updateFormTransaction({
                            ...formTransaction,
                            title: e.target.value
                        })},
                        value: formTransaction.title
                    },
                    {
                        interface: 'input',
                        type: 'text',
                        label: 'Descripción de la transacción',
                        name: 'description',
                        inputProps: {
                            maxLength: 30
                        },
                        onChange: (e) => { updateFormTransaction({
                            ...formTransaction,
                            description: e.target.value
                        })},
                        value: formTransaction.description
                    },
                    {
                        interface: 'input',
                        type: 'number',
                        label: 'Monto',
                        name: 'amount',
                        onChange: (e) => { updateFormTransaction({
                            ...formTransaction,
                            amount: e.target.value
                        })},
                        onBlur: () => { },
                        value: formTransaction.balance
                    },
                    {
                        interface: 'select',
                        type: 'select',
                        label: 'Tipo de cuenta',
                        name: 'type',
                        onChange: (e) => { updateFormTransaction({
                            ...formTransaction,
                            type: e.target.value
                        })},
                        value: formTransaction.type,
                        helperText: "Selecciona un tipo de cuenta",
                        options: [
                            {
                                value: 1,
                                label: 'Depósito',
                            },
                            {
                                value: 2,
                                label: 'Retiro',
                            }
                        ]
                    }
                ]} />
            <h1>Transaction to add</h1>
            <code>{JSON.stringify(formTransaction)}</code>
        </div>
    );
}

TransactionForm.propTypes = {
    closeForm: PropTypes.func.isRequired,
    accountId: PropTypes.string.isRequired,
    accountBalance: PropTypes.string.isRequired
}

export default TransactionForm;