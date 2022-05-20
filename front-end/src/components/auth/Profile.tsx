import { 
    Modal,
    Box,
    Group,
    Button,
    TextInput} from '@mantine/core'

import ErrorMsg from './ErrorMsg'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
    opened_callbackfn: React.Dispatch<React.SetStateAction<boolean>>,
    opened: boolean,
}

const Profile = (props: Props) => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [username, setUsername] = useState(window.localStorage.getItem('username') || '')
    const [degree, setDegree] = useState('')

    useEffect(() => {
        axios.get(`/user/${username}`)
        .then((res) => {
            setDegree(res.data.message.degree)
        })
    }, [username])
    
    const form = useForm({
        initialValues: {
            username: username,
            degree: degree
        }
    })

    const modifyProfile = (values: {username: string, degree: string}) => {
        axios.put(`/user/${username}`, {
            username: values.username,
            degree: values.degree
        })
        .then((res) => {
            console.log(res)
            // TODO: MAKE SURE ERROR IS LOGGED ONTO THE SCREEN CORRECTLY
            if (res.data.message == null){
                setErrorMsg(true)
            }
            else {
                setDegree(values.degree)
            }
        })


    }
    return (
        <div>
            <Modal
            centered
            title="Profile"
            opened={props.opened}
            onClose={() => {props.opened_callbackfn(false)}}>
                <Box sx={{ maxWidth: 300 }} mx="auto">
                    <form onSubmit={form.onSubmit((values) => {modifyProfile(values)})}>
                        <TextInput
                            label="Username"
                            placeholder={username}
                            disabled
                            {...form.getInputProps('username')}
                        />

                        <TextInput
                            label="Degree"
                            placeholder={degree}
                            {...form.getInputProps('degree')}
                        />
                        {
                            errorMsg &&
                            <div>
                                <ErrorMsg>There was an issue while modifying your profile.</ErrorMsg>
                            </div>
                        }

                        <Group position="right" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Profile