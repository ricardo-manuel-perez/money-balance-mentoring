import React, { useState } from 'react';
import BaseForm from '../BaseForm/baseForm';
import PropTypes from 'prop-types';

const AccountForm = ({ accountId = null }) => {
    const [formAccount, setFormAccount] = useState({
        name: '',
        amount: 0,
        type: 1
    });

    const updateFormAccount = (newFormAccount) => {
        setFormAccount(newFormAccount);
    }

    const isEdit = accountId !== null;

    const sendRequestToUpdate = () => {
        alert('update account');
    }

    const onSubmit = (data) => {
        if (isEdit)
            sendRequestToUpdate();
        setFormAccount(data);
    };

    return (
        <div className="App">
            <h1>{isEdit ? 'Edit Account' : 'Add Account'}</h1>
            <BaseForm initialValues={{
                    name: '',
                    amount: 0,
                    type: 1
                }}
                onSubmit={onSubmit}
                submitLabel={ isEdit ? 'Actualizar cuenta' : 'Agregar cuenta'}
                formInputs={[
                    {
                        interface: 'input',
                        type: 'text',
                        label: 'Nombre de la cuenta',
                        name: 'name',
                        onChange: (e) => { updateFormAccount({
                            ...formAccount,
                            name: e.target.value
                        })},
                        //onBlur: () => { },
                        value: formAccount.name
                    },
                    {
                        interface: 'input',
                        type: 'number',
                        label: 'Monto inicial',
                        name: 'amount',
                        onChange: (e) => { updateFormAccount({
                            ...formAccount,
                            amount: e.target.value
                        })},
                        onBlur: () => { },
                        value: formAccount.amount
                    },
                    {
                        interface: 'select',
                        type: 'select',
                        label: 'Tipo de cuenta',
                        name: 'type',
                        onChange: (e) => { updateFormAccount({
                            ...formAccount,
                            type: e.target.value
                        })},
                        onBlur: () => { },
                        value: formAccount.type,
                        helperText: "Selecciona un tipo de cuenta",
                        options: [
                            {
                                value: 1,
                                label: 'Type one',
                            },
                            {
                                value: 2,
                                label: 'Type two',
                            }
                        ]
                    }
                ]} />
            <h1>Account to add</h1>
            <code>{JSON.stringify(formAccount)}</code>
        </div>
    );
}

AccountForm.propTypes = {
    accountId: PropTypes.string
}

export default AccountForm;