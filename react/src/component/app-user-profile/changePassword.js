import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import styles from './userProfile.module.css'
import { getCurrentUser } from '../../libs/storage/tokenStorage';

function ChangePassword(props) {

    const success = (successText) => {
        message.success(successText);
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
                const newobj = {
                    id: getCurrentUser(),
                    old_password: values.old_password,
                    new_password: values.new_password
                }
                window.axiosInstance.post('/profile/change-password', newobj)
                .then((res) => {
                    success(res.data.message)
                    props.form.resetFields();
                })
            }
        });
    };

    const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const validateToNextPassword = (rule, value, callback) => {
        if (value && !re.test(value)) {
          callback("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        }
        callback();
    };
  
    const { getFieldDecorator } = props.form;

    return (
        <div className = {styles.view}>
            <Typography.Title level={2} style = {{padding: '35px'}}>Change Password</Typography.Title>
            <Form onSubmit={handleSubmit} layout='vertical'>
                <Form.Item label="Existing Password">
                    {getFieldDecorator('old_password', {
                        rules: [{ required: true, message: 'Existing Password is required' }],
                        })(
                            <Input type="password" placeholder="Enter existing password" />
                    )}
                </Form.Item>
                <Form.Item label="New Password">
                    {getFieldDecorator('new_password', {
                        rules: [
                            {
                              required: true, 
                              message: 'New password is required',
                            },
                            {
                              validator: validateToNextPassword,
                            },
                        ]
                        })(
                            <Input type="password" placeholder="Enter new password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Update</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const UserProfileChangePassword = Form.create({ name: 'user_profile_change_password' })(ChangePassword);
export default UserProfileChangePassword