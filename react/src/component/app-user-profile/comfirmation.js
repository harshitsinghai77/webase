import React from 'react';
import styles from './userProfile.module.css'

function Confirmation(props) {

    const [message, setMessage] = React.useState('Please wait while we verify your account')

    React.useEffect(() => {
        window.axiosInstance.post('/verification/confirmation', {
            token: props.token,
            email: props.email
        })
        .then((res) => {
            setMessage(res.data.message)
        })
    }, [])

    return (
        <div style = {{display: 'flex'}}>
            <div style = {{flex: '1 1 0%', overflow: 'auto'}}>
                <main>
                    <div className={styles.Login_loginContainer__3DnwY}>
                        <div className={styles.Login_background__1xzIL}>
                            <div>
                                <a href="https://nanonets.com">
                                    <img src="https://webaselandingpage.netlify.com/static/media/weBase_logo.230470b4.png" alt="Nanonets" width="150" style={{display: "block"}} />
                                </a>
                            </div>
                        </div>
                        <div className={styles.Login_loginBox__3it1r}>
                            <img className={styles.Login_verificationimage__3AfsJ} src="https://cdn.nanonets.com/static/media/emailpng.bf542677.png" width="130px" />
                            <div className={styles.Login_title__HV0Kh}>{message}</div>
                            <div >
                                <a className={styles.Login_backlink__1igi6} href="/login"><span style={{fontSize: "24px"}}> ←&nbsp;</span> 
                                    BACK TO LOGIN
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Confirmation