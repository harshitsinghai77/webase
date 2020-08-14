import React from 'react';
import { Link } from '@reach/router';
import { Button, Form, Input, Typography } from 'antd';
import style from './login.module.css';
import logo from './assests/weBase.png';
import { ParamsContext } from '../../Context';
import { loginUser } from '../actions/login-action';
import { saveToken, setCurrentUser } from '../../libs/storage/tokenStorage';

const FormItem = Form.Item;


function LoginForm(props) {
  const [loading, setLoading] = React.useState(false);
  const { navigate } = React.useContext(ParamsContext);
  const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        loginUser(values)
          .then((res) => {
            console.log(res)
            setLoading(false);
            saveToken(res.data.token);
            setCurrentUser(res.data.id);
            navigate(`/create-new-project/${res.data.id}`, { replace: true });
          })
          .catch((e) => {
            setLoading(false);
          })
       }
    });
  }

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit} className={style.form}>
        <img className={style.logo} alt="logo" src={logo} />
        <Typography.Title className={style.header_reset_pass} level={3}>Welcome To WeBase</Typography.Title>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!'},
              { required: true, message: 'Please enter your E-mail!',},
            ]
          })(
            <Input size="large" placeholder="Email" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter your Password!' }],
          })(
            <Input size="large" type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          <Button
            loading={loading}
            block
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            LOG IN
          </Button>
          <div className={style.links}>
            <Link to="/forgot-password" href="">Forgot password</Link>
            <Link to="/register" href="">Don't have an account? Signup here</Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
}
export default Form.create({ name: 'login' })(LoginForm);
