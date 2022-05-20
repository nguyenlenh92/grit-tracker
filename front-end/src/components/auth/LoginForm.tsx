import { TextInput, Button, Group, Box, PasswordInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import axios from 'axios'
import ErrorMsg from './ErrorMsg'

type Props = {
    closeLoginForm: VoidFunction,
    setLogged: React.Dispatch<React.SetStateAction<boolean>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

interface FormValue {
    username: string,
    password: string
}

function LoginForm({ closeLoginForm, setLogged, setUsername }: Props) {

    const [errorMsg, setErrorMsg] = useState(false)

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const Login = (values: FormValue) => {
        axios.post(`/authenticate`, {
            'username': values.username,
            'password': values.password
        })
        // TODO: MAKE SURE NON EXISTING USERNAME RAISES ERROR TOO!!!!
        .then((response) => {
            if (response.data.message.isValid) {
                window.localStorage.setItem("logged", "true")
                window.localStorage.setItem("username", values.username)
                setLogged(true)
                closeLoginForm()
                setErrorMsg(false)
                setUsername(values.username)
                window.location.reload();
            }
            else {
                setErrorMsg(true)
            }
        })
    }

    return (
        <div>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => Login(values))}>
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

                    {
                        errorMsg &&
                        <ErrorMsg>You have entered the wrong credentials, please try again</ErrorMsg>

                    }

                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    )
}

export default LoginForm