import React, { useState, useEffect } from 'react';
import BaseForm from '../BaseForm/baseForm';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/Auth/use-auth';
import { postAccount } from '../../services/Account/account';
import { updateAccount } from '../../services/Account/account';


const emptyAccount = {
    owner: '',
    name: '',
    description: '',
    balance: 0
}

const AccountForm = ({ closeForm, selectedAccount }) => {
    const auth = useAuth();
    const user = auth?.data;
    const [formAccount, setFormAccount] = useState(emptyAccount);

    useEffect(() => {
        updateFormAccount(selectedAccount);
    }, [selectedAccount]);

    const updateFormAccount = (newFormAccount) => {
        if (newFormAccount)
            setFormAccount(newFormAccount);
    }

    const isEdit = selectedAccount !== undefined;

    const sendRequestToUpdate = () => {
        try {
            updateAccount(selectedAccount.id, {
                name: formAccount.name,
                description: formAccount.description,
                balance: formAccount.balance
            });
        }catch(e) {
            console.error(e);
        }
    }
    
    const sendRequesToAdd = () => {
        try {
            postAccount({
                ... formAccount,
                uid: user.uid,
                owner: user.displayName
            });
        }catch(e) {
            console.error(e);
        }
    }

    const onSubmit = () => {
        if (isEdit) {
            new Promise((resolve) => {
                sendRequestToUpdate();
                resolve();
            })
            .then(() => closeForm())
        } else {
            new Promise((resolve) => {
                sendRequesToAdd();
                resolve();
            })
            .then(() => closeForm())
        }
    };

    return (
        <div className="App">
            <h1>{isEdit ? 'Edit Account' : 'Add Account'}</h1>
            <BaseForm initialValues={emptyAccount}
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
                        value: formAccount.name
                    },
                    {
                        interface: 'input',
                        type: 'text',
                        label: 'Descripción de la cuenta',
                        name: 'description',
                        onChange: (e) => { updateFormAccount({
                            ...formAccount,
                            description: e.target.value
                        })},
                        value: formAccount.description
                    },
                    {
                        interface: 'input',
                        type: 'number',
                        label: 'Monto inicial',
                        name: 'balance',
                        onChange: (e) => { updateFormAccount({
                            ...formAccount,
                            balance: e.target.value
                        })},
                        onBlur: () => { },
                        value: formAccount.balance
                    }
                ]} />
            <h1>Account to add</h1>
            <code>{JSON.stringify(formAccount)}</code>
        </div>
    );
}

AccountForm.propTypes = {
    closeForm: PropTypes.func.isRequired,
    selectedAccount: PropTypes.object
}

export default AccountForm;