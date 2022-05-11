import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";

import axios from 'axios';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import TokenContext from '../../../contexts/TokenContext';


export default function LoginForm(props) {
    const { isSubmitting, setIsSubmitting, formData, setFormData } = props;
    const { setToken } = useContext(TokenContext);
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    

    const navigate = useNavigate();
    const onSubmit = () => {
        setIsSubmitting(true);
        axios.post('http://localhost:5000/login', formData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
                setIsSubmitting(false);
                setFormData({
                    email: '',
                    password: ''
                });
                navigate('/store');
            }
            )
            .catch(err => {
                toast.error(err.response.data, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsSubmitting(false);
            }
            )
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Input
                    {...register("email", {
                        required: "O campo e-mail é obrigatório",
                        pattern: {
                            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                            message: "Insira um e-mail válido"
                        }
                    })}
                    value={formData.email}
                    type="text"
                    placeholder="E-mail"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Input
                    {...register("password", {
                        required: "O campo senha é obrigatório",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter no mínimo 6 caracteres"
                        }
                    })}
                    value={formData.password}
                    type="password"
                    placeholder="Senha"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
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
    width: 303px;
    height: 45px;    
    background: #28A428;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 25px;
    opacity: ${props => !props.disabled ? 1 : 0.5};
    margin-top: 25px;
    font-family: 'Truculenta', sans-serif;
`
const Input = styled.input`
    width: 303px;
    height: 45px;
    background:  ${props => !props.disabled ? '#FFFFFF' : '#F2F2F2'};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 15px;
    font-size: 24px;
    font-family: 'Truculenta', sans-serif;
`
const Error = styled.p`
    color: #FFF;
    font-size: 14px;
    padding-bottom: 10px;
`