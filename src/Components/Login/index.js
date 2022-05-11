import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from './LoginForm';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
            <Container>
            <LogoText>Minty</LogoText>
            <LoginForm
                key='loginForm'
                isSubmitting={isSubmitting}
                formData={formData}
                setFormData={setFormData}
                setIsSubmitting={setIsSubmitting}
            />
            <Logon>
                <Link to="/signUp">
                    Primeira vez? Cadastre-se!
                </Link>
            </Logon>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const LogoText = styled.p`
font-family: 'Permanent Marker', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #28A428;
    font-size: 40px;
    margin-bottom: 50px;
`
const Logon = styled.p`
    padding-top: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    text-align: center;
    
    a{
        color: #FFFFFF;
        text-decoration: none;
    }
`