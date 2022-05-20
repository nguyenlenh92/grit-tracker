import React from 'react'
import { Button } from '@mantine/core'
import "../NavBar.Style.css"
import { useState, useEffect } from 'react'
import { Modal } from '@mantine/core'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Profile from './Profile'

type Props = {
}

const Authentication = (props: Props) => {
    const [logged, setLogged] = useState(false)
    const [openedLogin, setOpenedLogin] = useState(false)
    const [openedRegister, setOpenedRegister] = useState(false)
    const [openedProfile, setOpenedProfile] = useState(false)
    const [username, setUsername] = useState("user")

    useEffect(() => {
        var currentLoggedInLS = window.localStorage.getItem('logged')
        var current_username = window.localStorage.getItem('username')
        if (current_username){
            setUsername(current_username)
        }
        if (currentLoggedInLS === 'true'){
            setLogged(true)
        }
        else if (currentLoggedInLS === 'false'){
            setLogged(false)
        }
    }, [setLogged])

    const Logout = () => {
        setLogged(false)
        setUsername("")
        window.localStorage.setItem('username', '')
        window.localStorage.setItem('logged', 'false')
        window.location.reload();
    }

    const closeLoginForm = () => {
        setOpenedLogin(false)
    }

    const closeRegisterForm = () => {
        setOpenedRegister(false)
    }

    const changeProfileState = () => {
        setOpenedProfile(true)
    }

    return (
        <div>

            { logged && 
                <div>
                    <Button onClick={() => {Logout()}} variant="white" className="NavBarLink" >
                        Log out
                    </Button>

                    <Button onClick={() => changeProfileState()} variant="white" className="NavBarLink">
                        Welcome, {username}
                    </Button>
                </div>
            }
            
            { !logged &&
                <div>
                    <Button onClick={() => {setOpenedRegister(true)}}variant="white" className="NavBarLink" >
                        Register
                    </Button>

                    <Button onClick={() => {setOpenedLogin(true)}}variant="white" className="NavBarLink">
                        Login
                    </Button>
                </div>
            }

            {openedLogin &&
                <Modal
                opened={openedLogin}
                onClose={() => setOpenedLogin(false)}
                centered
                title="Login here"
                >
                    <LoginForm setLogged={setLogged} closeLoginForm={closeLoginForm} setUsername={setUsername}/>
                </Modal>
            }

            {
                openedRegister &&
                <Modal
                    opened={openedRegister}
                    onClose={() => setOpenedRegister(false)}
                    centered
                    title="Register new account"
                >
                    <RegisterForm closeRegisterForm={closeRegisterForm} />
                </Modal>
            }
            {
                openedProfile &&
                <Profile opened={openedProfile} opened_callbackfn={setOpenedProfile}></Profile>

            }
        </div>
    )
}
export default Authentication;