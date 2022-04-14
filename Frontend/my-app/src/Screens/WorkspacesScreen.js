import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Unauthorized from '../Components/Unauthorized';
import { Table } from 'react-bootstrap';

export default function WorkspacesScreen(){

    const history = useHistory();
    const token = localStorage.getItem("token");

    return(
        <Unauthorized/>
    )
}