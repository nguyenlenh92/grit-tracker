import React, { useState } from 'react'
import {useForm} from '@mantine/form'
import {
    Box,
    TextInput,
    PasswordInput,
    Group,
    Button  
} from '@mantine/core'
import ErrorMsg from './ErrorMsg'
import axios from 'axios'

type Props = {
    closeRegisterForm: VoidFunction
}

interface FormValue {
    username: string,
    password: string,
    confirmPassword: string,
}

const RegisterForm = (props: Props) => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [error, setError] = useState<any>("ERROR, TRY AGAIN")

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            // TODO: MAKE SURE PASSWORD HAS REQUIREMENTS
            confirmPassword: (password, values) => (password !== values.password ? 'Passwords did not match' : null)
        },
    });

    const Register = (values: FormValue) => {
        try {
            axios.post('/register', {
                username: values.username,
                password: values.password
            })
            .then((res) => {
                props.closeRegisterForm()
            })
            .catch(error => {
                setErrorMsg(true)
                console.error(error)
                setError("Unable to register, try again")
            })

            // TO DO: VALIDATE NEW ACCOUNT CREATED IS VALID
            // I.E. NO DUPLICATE NAME
            
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <div>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => (Register(values)))}>
                    <TextInput
                        required
                        label="Username"
                        placeholder="username"
                        {...form.getInputProps('username')}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        {...form.getInputProps('password')}
                    />

                    <PasswordInput
                        required
                        label="Re-enter password"
                        {...form.getInputProps('confirmPassword')}
                    />                   

                    {
                        // TODO: DISPLAY MEANINGFUL ERROR MESSAGE
                        errorMsg &&
                        <ErrorMsg>{error}</ErrorMsg>

                    }

                    <Group position="right" mt="md">
                        <Button type="submit">Register</Button>
                    </Group>
                </form>
            </Box>
        </div>
    )
}

export default RegisterForm