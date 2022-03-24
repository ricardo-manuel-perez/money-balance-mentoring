import React from 'react';
import { Formik } from "formik";
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";

const TextInput = ( props ) => {
    return (
        <div className="form-group">
            <TextField id="outlined-basic"
                fullWidth
                margin='normal'
                label={props.label}variant="outlined"
                type={props.type}
                name={props.name}
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value} />
        </div>
    )
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.any
}

const SelectInput = ( props ) => {
    return (
        <div className="form-group">
            <TextField
                id="outlined-select-currency"
                fullWidth
                margin='normal'
                select
                label={props.label}variant="outlined"
                type={props.type}
                name={props.name}
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value} 
                helperText={props.helperText}
                >
                {props.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.any,
    helperText: PropTypes.string,
    options: PropTypes.array
}

const CustomForm = ({ initialValues, onSubmit, formInputs, submitLabel }) => {
    return (
        <Formik
            initialValues={ initialValues }
            validate={(values) => { console.log(values) }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    onSubmit(values);
                    setSubmitting(false);
                }, 800);
            }}>
            {({
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    {
                        formInputs.map((inputForm, index) => {
                            switch(inputForm.type) {
                                case 'text':
                                    return <TextInput key={index}
                                        type={ inputForm.type }
                                        label= { inputForm.label }
                                        name= { inputForm.name }
                                        onChange= { inputForm.onChange }
                                        onBlur= { inputForm.onBlur }
                                        value= { inputForm.value } />;
                                case 'number':
                                    return <TextInput key={index}
                                        type={ inputForm.type }
                                        label= { inputForm.label }
                                        name= { inputForm.name }
                                        onChange= { inputForm.onChange }
                                        onBlur= { inputForm.onBlur }
                                        value= { inputForm.value } />;
                                case 'select':
                                    return <SelectInput key={index}
                                        type={ inputForm.type }
                                        label= { inputForm.label }
                                        name= { inputForm.name }
                                        onChange= { inputForm.onChange }
                                        onBlur= { inputForm.onBlur }
                                        value= { inputForm.value }
                                        helperText= { inputForm.helperText }
                                        options= { inputForm.options } />;
                                default: 
                                    return <span key={index}></span>;
                            }
                        })
                    }
                    <div className="form-group">
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            { submitLabel }
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

CustomForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formInputs: PropTypes.array.isRequired,
    submitLabel: PropTypes.string.isRequired,
    initialValues: PropTypes.object
}

export default CustomForm;
