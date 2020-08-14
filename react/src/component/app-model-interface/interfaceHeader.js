import React from 'react'
import styles from './interface.module.css'

function InterfaceHeader(props) {
    return (
        <div className = {styles.Test_grid1__1MU2M}>
            <div><p><span>Model Name: </span><span>{props.modelName}</span></p></div>
            <div><p><span style={{fontWeight: 600, fontSize: "14px"}}>Accuracy:</span> 92%</p><p><span style = {{fontWeight: 300}}>Training:</span> Model hosted</p></div>
        </div> 
    )
}

export default InterfaceHeader