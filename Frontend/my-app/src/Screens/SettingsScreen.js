import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import {useTranslation} from 'react-i18next';

export default function LoginScreen() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {t, i18n} = useTranslation();
    function handleLang(lang) {
        i18n.changeLanguage(lang);
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        let path = "/login"
        history.push(path)
    };

    return(
        <div>
            <main>
                <div>
                    <h3><Link to={`/users`}>{t('Users')}</Link> (admin only)</h3>
                    <h3><Link to={`/analytics`}>User Analytics</Link> (admin only)</h3>
                </div>
                <div>
                    <br/><br/><br/><br/>
                    <button variant="outlined" onClick={()=>handleLang("ro")}> Romana </button><button variant="outlined" onClick={()=>handleLang("en")}> English </button>
                    <br/><br/><br/><br/>
                    <button onClick={logout}> {t('Logout')} </button>
                </div>
            </main>
        </div>
    )
}