import React from 'react';
import { Form, Input, Button, Select, Typography, message, Spin } from 'antd';
import styles from './userProfile.module.css';
import { getCurrentUser } from '../../libs/storage/tokenStorage';
import localStorage from 'local-storage';

function Profile(props) {

    const userID = getCurrentUser();

    const [spin, setSpin] = React.useState(true)

    React.useState(() => {
        window.axiosInstance.get('/profile', {
            params: {
              id: userID,
            }
        }).then(res =>{
            const userdata = res.data[0]
            if(userdata){
                setSpin(false)
                props.form.setFieldsValue({
                    name: userdata.name,
                    email: userdata.email,
                    designation: userdata.designation,
                    aboutme: userdata.aboutme,
                    username: userdata.username,
                    gender: userdata.gender
                });
            }
        })
        .catch(err => console.log(err))
    }, [])

    const success = (successText) => {
        message.success(successText);
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
                if(values.name){
                    localStorage.set('name', values.name);
                }
                const newobj = {
                    id: userID,
                    name: values.name,
                    username: values.username, 
                    email: values.email, 
                    designation: values.designation, 
                    aboutme: values.aboutme, 
                    gender: values.gender,
                }
                window.axiosInstance.post('/profile', newobj)
                .then((res) => success(res.data.message))
            }
        });
    };

    const { getFieldDecorator } = props.form;

    return (
        <div className = {styles.view}>
            <Typography.Title level={2} style = {{padding: '35px'}}>Edit User Profile</Typography.Title>
            <Spin style = {{paddingLeft: '120px'}} spinning = {spin} size="large" />
            <Form onSubmit={handleSubmit} layout='vertical'>
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [{ message: 'Please enter your username!' }],
                        })(
                            <Input placeholder="Enter username here" />
                    )}
                </Form.Item>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ message: 'Please enter your name' }],
                        })(
                            <Input placeholder="Enter name here" />
                    )}
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid E-mail!'},],
                        })(
                            <Input placeholder="Change email" />
                    )}
                </Form.Item>
                <Form.Item label="Designation">
                    {getFieldDecorator('designation', {
                        rules: [{ message: 'Please tell us about designation' }],
                        })(
                            <Select placeholder="Select Designation">
                                <Select.Option value="Student">Student</Select.Option>
                                <Select.Option value="Professional">Professional</Select.Option>
                                <Select.Option value="Business">Business</Select.Option>
                                <Select.Option value="Freelance">Freelance</Select.Option>
                                <Select.Option value="good_for_nothing">I don't do anything</Select.Option>
                            </Select>
                    )}
                </Form.Item>
                <Form.Item label="About Me">
                    {getFieldDecorator('aboutme', {
                        rules: [{ message: 'Please tell us about yourself' }],
                        })(
                            <Input.TextArea rows={4} placeholder="Tell us about yourself" />
                    )}
                </Form.Item>
                <Form.Item label="Gender">
                    {getFieldDecorator('gender', {
                        rules: [{ message: 'Please enter your gender' }],
                        })(
                            <Select placeholder="Select gender">
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                                <Select.Option value="none">Others</Select.Option>
                            </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Update</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const UserProfile = Form.create({ name: 'user_profile' })(Profile);
export default UserProfile