import React from 'react';
import { Link } from '@reach/router';
import { Button, Form, Input, Typography } from 'antd';
import style from './login.module.css';
import logo from './assests/weBase.png';
import { ParamsContext } from '../../Context';
import { registerUser } from '../actions/login-action';
import { saveToken, setCurrentUser } from '../../libs/storage/tokenStorage';

const FormItem = Form.Item;


function RegisterForm(props) {
  const [loading, setLoading] = React.useState(false);
  const [confirmDirty, setConfirmDirty] = React.useState(false)
  const { navigate } = React.useContext(ParamsContext);
  const { getFieldDecorator } = props.form;
  const { form } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        registerUser(values)
          .then((res) => {
            setLoading(false);
            //saveToken(res.data.token);
            //setCurrentUser(res.data.id);
            navigate(`/email-verification/`, { replace: true });
          })
          .catch((e) => {
            setLoading(false);
          })
      }
    });
  }

  const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Inconsistent! password');
    }
    else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if (!re.test(value)) {
      callback("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    }
    callback();
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit} className={style.form}>
        <img className={style.logo} alt="logo" src={logo} />
        <Typography.Title className={style.header_reset_pass} level={3}>Welcome To WeBase</Typography.Title>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter your full name!' }],
          })(
            <Input size="large" placeholder="Your name" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please enter your email' }],
          })(
            <Input size="large" placeholder="Email" />,
          )}
        </FormItem>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please enter password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password size="large" placeholder="Password" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password size="large" placeholder="Confirm Password" onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <FormItem>
          <Button
            loading={loading}
            block
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
          <div className={style.links}>
            <Link to="/forgot-password" href="">Forgot password</Link>
            <Link to="/login" href="">Already have an account? Login here</Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
}
export default Form.create({ name: 'register' })(RegisterForm);
