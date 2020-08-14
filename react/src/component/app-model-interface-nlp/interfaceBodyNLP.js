import React from 'react';
import styles from './interfaceNLP.module.css';
import { Spin } from 'antd';
import { Input, Button } from 'antd';

function InterfaceBodyNLP(props) {
    
    const {modelId} =  props 
    const [text, setText] = React.useState('')
    const [jsonResponse, setJsonResponse] = React.useState()
    const [spinner, setSpinner] = React.useState(false)

    const getFlaskURL = {
      '5dba499299e61b4bb45f14cf': 'sentimentAnalysis',
      '5dba606fd0b5c25bbc32b243': 'textSummarization'
    }

    const onChange = ({ target: { value } }) => {
      setText(value);
    };

    const onHandleClick = () => {
      setSpinner(true);
      window.axiosInstance.post(`http://10.12.14.60:5000/${getFlaskURL[modelId]}`, {text: text})
      .then((res) => {
        setSpinner(false)
        setJsonResponse(res.data)
      })
      .catch((err) => {
        setSpinner(false)
        alert("Some error occured")
      });
    }

    return (
      <div className= {styles.Test_grid2__3nZyM}>
          <div className={styles.Test_leftCol__1XSvT}>
            <div style={{overflow: 'auto', display: 'grid', paddingLeft: '10px' ,gridTemplateRows: 'auto 1fr', height: '100%', background: 'rgb(249, 249, 249)'}}>
              <Input.TextArea
                  onChange={onChange}
                  placeholder="Input text here"
                  rows = {20}
              />
            </div>   
            <div style = {{display: 'flex', justifyContent: 'center'}}>
              <Button onClick = {onHandleClick} style = {{width: '50%'}} type="primary" >
                  Submit!
              </Button>
            </div>
          </div>
          <div className = {styles.Test_rightCol__2W8HC}>
              <div style={{borderRadius: '6px', border: '1px solid rgb(222, 222, 222)', wordWrap: 'break-word', display: 'grid; grid-template-rows: auto 1fr', paddingTop: '8px'}}>
                  <div style={{color: '#2b2b2b', fontWeight: '300', padding: '10px 0px', margin: '10px 24px', borderBottom: '1px solid rgb(189, 189, 189)'}}>
                      JSON RESPONSE
                  </div>
                  <div style={{position: 'relative', padding: '0px 24px'}}>
                    <pre style={{margin: '0px'}}>
                        {spinner && <Spin spinning = {spinner} /> || JSON.stringify(jsonResponse)}
                    </pre>
                  </div>
              </div>
              
          </div>
      </div>
    )
}

export default InterfaceBodyNLP