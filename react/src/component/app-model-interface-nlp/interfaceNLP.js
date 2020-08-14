import React from 'react'
import styles from './interfaceNLP.module.css'
import InterFaceBodyNLP from './interfaceBodyNLP'

function InterfaceNLP(props) {
    const {modelName, modelID} = props
    return (
        <div className = {styles.root_class}>
            <div className = {styles.Test_testRoot__2j43F}>
                <InterFaceBodyNLP modelId = {modelID} modelName = {modelName} />
            </div>   
        </div>
    )
}

export default InterfaceNLP