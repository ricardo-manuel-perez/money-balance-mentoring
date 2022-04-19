import React from "react";
import { Switch } from "@mui/material";
import PropTypes from 'prop-types';
import { useAuth } from "../../utils/Auth/use-auth";

function ThemeSwitcher({mode, setMode}) {
  const auth = useAuth();
  const user = auth?.data;

  return user ? 
        <>
            <Switch checked={mode === 'light' ? false : true}
                onChange={() => {
                const selectedMode = mode === 'light' ? 'dark' : 'light';
                localStorage.setItem('mode', selectedMode);
                setMode(selectedMode);
                } } /> {'Tema: ' + (mode === 'light' ? 'claro' : 'oscuro')}
        </>
    : <></>
}

ThemeSwitcher.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']).isRequired,
    setMode: PropTypes.func.isRequired
}

export default ThemeSwitcher;