import React, { useState, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import SettingsUsernameModal from './SettingsUsernameModal';
import SettingsEmailModal from './SettingsEmailModal';
import dbAPI from '../../modules/dbAPI';
import './Settings.css';

const SettingsCard = (props) => {

    const activeUserId = parseInt(sessionStorage.getItem("userId"));

    const [userInfo, setUserInfo] = useState({});

    const [usernameModalIsOpen, setUsernameModalIsOpen] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [usernameFormIsValid, setUsernameFormIsValid] = useState(false, () => usernameFormIsValid);

    const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailFormIsValid, setEmailFormIsValid] = useState(false, () => emailFormIsValid);
   

    const [values, setValues] = useState({
        "id": activeUserId,
        "username": "",
        "email": "",
        "password": "",
        "isActive": true,
        "first_name": "",
        "last_name": ""
    });

    const getUser = () => {
        return dbAPI.fetchObjectById("users", activeUserId).then((data) => {
            setValues(data);
            setUserInfo(data)
        })
    };

    useEffect(() => {
        getUser();
    }, []);

    const toggleUsernameModal = () => {
        setUsernameModalIsOpen(!usernameModalIsOpen);
    };

    const toggleEmailModal = () => {
        setEmailModalIsOpen(!emailModalIsOpen);
    };

    const handleUsernameFormSubmit = () => {
        if (setUsernameFormIsValid) {
            dbAPI.putObjectByResource("users", values).then(() => {
                getUser();
                toggleUsernameModal();
            })
        }
    }

    const handleEmailFormSubmit = () => {
        if (setEmailFormIsValid) {
            dbAPI.putObjectByResource("users", values).then(() => {
                getUser();
                toggleEmailModal();
            })
        }
    }

    const handleFieldChange = evt => {
        const changeValue = { ...values };
        const fieldId = evt.target.id;
        let fieldValue = evt.target.value;
        changeValue[fieldId] = fieldValue;
        setValues(changeValue)
        if (fieldId === "username") {
            setUsernameError(false)
            setUsernameFormIsValid(true)
            dbAPI.getUsers().then(users => {
                users.map(user => {
                    if (fieldValue === user.username) {
                        setUsernameFormIsValid(false);
                        setUsernameError({
                            content: "Username already taken!",
                            pointing: "below"
                        })
                    }
                });
            })
        } else if (fieldId === "email") {
            setEmailError(false)
            setEmailFormIsValid(true)
            dbAPI.getUsers().then(users => {
                users.map(user => {
                    if (fieldValue === user.email) {
                        setEmailFormIsValid(false);
                        setEmailError({
                            content: "Email already taken!",
                            pointing: "below"
                        })
                    }
                });
            })
        }
    }

    const cancelSettingsUsername = () => {
        setValues({
            "id": activeUserId,
            "username": values.username,
            "email": values.email,
            "password": values.password,
            "isActive": true,
            "first_name": values.first_name,
            "last_name": values.last_name
        });
        setUsernameError(false);
        toggleUsernameModal();
    }

    const cancelSettingsEmail = () => {
        setValues({
            "id": activeUserId,
            "username": values.username,
            "email": values.email,
            "password": values.password,
            "isActive": true,
            "first_name": values.first_name,
            "last_name": values.last_name
        });
        setEmailError(false);
        toggleEmailModal();
    }

    return (
        <>
            <div className="settings">
                <Card
                    key={userInfo.id}
                    user={props.user}
                    className="settings-container">
                    <Card.Content className="settings-content">
                        <Image src={require("./profile-icon.png")} />
                        <Card.Header className="settings-username">Username: {userInfo.username}</Card.Header>
                        <Button size="tiny"
                            onClick={toggleUsernameModal}
                        >Change Username</Button>
                        <Card.Header className="settings-email">Email: {userInfo.email}</Card.Header>
                        <Button size="tiny" onClick={toggleEmailModal}>Change Email</Button>
                        <Card.Header className="settings-password">Password:</Card.Header>
                        <Button size="tiny">Change Password</Button>
                    </Card.Content>
                </Card>
            </div>
            <div className="settings-modal-container">
                <SettingsUsernameModal
                    usernameModalIsOpen={usernameModalIsOpen}
                    updateSettingsUsername={handleUsernameFormSubmit}
                    usernameError={usernameError}
                    handleFieldChange={handleFieldChange}
                    values={values}
                    cancelSettingsUsername={cancelSettingsUsername}
                    userInfo={userInfo}
                />
            </div>
            <div className="settings-modal-container">
                <SettingsEmailModal
                    emailModalIsOpen={emailModalIsOpen}
                    updateSettingsEmail={handleEmailFormSubmit}
                    emailError={emailError}
                    handleFieldChange={handleFieldChange}
                    values={values}
                    cancelSettingsEmail={cancelSettingsEmail}
                    userInfo={userInfo}
                />
            </div>
        </>
    )
}

export default SettingsCard;

