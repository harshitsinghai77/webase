import React from 'react';
import styles from './userProfile.module.css'

function EmailVerification() {

    return (
        <div style = {{display: 'flex'}}>
            <div style = {{flex: '1 1 0%', overflow: 'auto'}}>
                <main>
                    <div className={styles.Login_loginContainer__3DnwY}>
                        <div className={styles.Login_background__1xzIL}>
                            <div>
                                <a href="http://localhost:3015/">
                                    <img src="https://webaselandingpage.netlify.com/static/media/weBase_logo.230470b4.png" alt="Nanonets" width="150" style={{display: "block"}} />
                                </a>
                            </div>
                        </div>
                        <div className={styles.Login_loginBox__3it1r}>
                            <img className={styles.Login_verificationimage__3AfsJ} src="https://cdn.nanonets.com/static/media/emailpng.bf542677.png" width="130px" />
                            <div className={styles.Login_title__HV0Kh}>Please check your Inbox</div>
                            <div className={styles.Login_text__2fEVf}>We’ve sent a message with a link to activate your account. Tap on the link in the email to proceed.</div>
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

export default EmailVerification