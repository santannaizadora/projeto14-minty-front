import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";

import TokenContext from '../../contexts/TokenContext';
import toastConfig from '../../assets/toastify/toastConfig';

export default function SignUp() {
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const navigate = useNavigate();
    const { token } = useContext(TokenContext);

    useEffect(() => {
        token !== '' && navigate('/store');
    }, []);

    const [disabled, setDisabled] = useState(false)

    function sendRgister(data) {
        setDisabled(true)
        const { password, confirmPassword } = data
        password === confirmPassword
            ? axios.post(`${process.env.REACT_APP_API_URL}signUp`, data)
                .then((response) => {
                    toast.success(response.data, toastConfig);
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response.data, toastConfig)
                    setDisabled(false);
                })
            : toast.warn("Senhas devem ser iguais", toastConfig);
        setDisabled(false);
    }



    const nameValidate = {
        required: "O nome é obrigatório",
        minLength: {
            value: 3,
            message: "Insira um nome com mais de 3 letras"
        }
    }

    const passwordValidate = {
        required: "O campo de senha é obrigatório",
        minLength: {
            value: 6,
            message: "Insira uma senha com mais de 6 caracteres"
        }
    }

    const emailValidate = {
        required: "O campo de email é obrigatório",
        pattern: {
            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
            message: "Insira um e-mail válido"
        }
    }

    function showError({ message }) {
        return <p>{message}</p>
    }
    return (
        <DivSignUp>
            <h1>MINTY</h1>
            <Form onSubmit={handleSubmit(sendRgister)}>
                <input type="text" placeholder='Nome' disabled={disabled} {...register("name", nameValidate)} />
                <ErrorMessage errors={errors} name="name" render={showError} />
                <input type="email" placeholder='Email' disabled={disabled}{...register("email", emailValidate)} />
                <ErrorMessage errors={errors} name="email" render={showError} />
                <input type="password" placeholder='Senha' disabled={disabled} {...register("password", passwordValidate)} />
                <ErrorMessage errors={errors} name="password" render={showError} />
                <input type="password" placeholder='Confirmação de senha' disabled={disabled} {...register("confirmPassword", passwordValidate)} />
                <ErrorMessage errors={errors} name="confirmPassword" render={showError} />
                <Button disabled={disabled}>
                    {disabled
                        ? <ThreeDots color="#FFF" width={40} />
                        : "Cadastrar"
                    }
                </Button>
                <Link to="/"><p>Ja tenho conta? Fazer login!</p></Link>
            </Form>
        </DivSignUp>
    )
}

const DivSignUp = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #121212;

    h1{
        font-family: var(--secondary-font);
        font-size: 40px;
        color: #28A428;
        margin-bottom: 42px;
    }

    a{
        text-decoration: none;
    }
`

const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;

    *{
        font-family: var(--main-font);
    }

    input{
        width: 326px;
        height: 58px;
        border-radius: 5px;
        background-color: white;
        outline: none;
        border: none;
        padding:0 10px;
        
        margin-bottom: 18px;
        color: black;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;

        ::placeholder{
            color: black;
        }
    }


    p{
        color: white;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
    }
`
const Button = styled.button` 
    width:326px;
    height: 46px;
    
    background-color: var(--secondary-color);
    border: none;
    outline: none;
    border-radius: 5px;
    opacity: ${props => !props.disabled ? 1 : 0.5};
 
    display:flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 18px;
    
    color: white;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
`