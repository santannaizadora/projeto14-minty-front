import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";
import axios from 'axios';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import TokenContext from '../../../contexts/TokenContext';
import toastConfig from "../../../assets/toastify/toastConfig";

export default function LoginForm() {

    const { setToken } = useContext(TokenContext);
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (formData) => {
        setIsSubmitting(true);
        axios.post(`${process.env.REACT_APP_API_URL}login`, formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                setIsSubmitting(false);
                navigate('/store');
            }
            )
            .catch(err => {
                toast.error(err.response.data, toastConfig);
                setIsSubmitting(false);
            }
            )
    }


    const errorMessage = ({ messages }) =>
        messages && Object.entries(messages).map(([type, message]) => (
            <Error className='error-message' key={type}>{message}</Error>
        ))

    const emailInput = {
        required: "O campo e-mail é obrigatório",
        pattern: {
            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
            message: "Insira um e-mail válido"
        }
    }

    const passwordInput = {
        required: "O campo senha é obrigatório",
        minLength: {
            value: 6,
            message: "A senha deve ter no mínimo 6 caracteres"
        }
    }


    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Input
                    {...register("email", emailInput)}
                    type="text"
                    placeholder="E-mail"
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={errorMessage}
                />
                <Input
                    {...register("password", passwordInput)}
                    type="password"
                    placeholder="Senha"
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={errorMessage}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ?
                        <ThreeDots color="#FFF" height={50} width={50} />
                        :
                        'Entrar'
                    }
                </Button>
            </Form>
        </>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 326px;
    height: 46px;    
    background: #28A428;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 25px;
    opacity: ${props => !props.disabled ? 1 : 0.5};
    margin-top: 25px;
    font-family: var(--main-font), sans-serif;
`
const Input = styled.input`
    width: 326px;
    height: 58px;
    background:  ${props => !props.disabled ? '#FFFFFF' : '#F2F2F2'};
    border: none;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 15px;
    font-size: 24px;
    font-family: var(--main-font), sans-serif;
    outline: none;

    ::placeholder{
        color: black;

    }
`
const Error = styled.p`
    color: #FFF;
    font-size: 14px;
    padding-bottom: 10px;
`