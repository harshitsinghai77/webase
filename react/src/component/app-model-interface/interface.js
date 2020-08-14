import React from 'react'
import styles from './interface.module.css'
import InterFaceHeader from './interfaceHeader'
import InterFaceBody from '././interfaceBody'

function Interface(props) {
    const {modelName, modelID} = props
    return (
        <div className = {styles.root_class}>
            <div className = {styles.Test_testRoot__2j43F}>
                <InterFaceHeader modelName = {modelName} />
                <hr style={{margin: '12px 0px'}} />
                <InterFaceBody modelId = {modelID} modelName = {modelName} />
            </div>   
        </div>
    )
}

export default Interface