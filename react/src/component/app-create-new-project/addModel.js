import React from 'react'
import styles from './addModel.module.css';

function CreateNewModel() {
    
    return(
        <div style={{flex: "1 1 0%", overflow: "auto"}}>
            <main>
                <div className={styles.root}>
                    <h2 className={styles.pageHeader} style={{marginTop: "24px"}}>Enter names of the categories</h2>
                    <hr />
                    
                    <div className={styles.ModelForm_root__1FQzT}>
                        <div></div>
                        <form className={styles.ModelForm_categoryForm__32uIx}>
                            <input className={styles.ModelForm_labelInput__3jp9u} type="text" placeholder="Add categories here. For eg : dogs, cats" />
                            <button className={styles.ModelForm_labelAdd__14SIj} type="submit" style={{height: "100%", fontSize: "30px", padding: "0px"}}>+</button>
                        </form>
                        
                        <div className={styles.ModelForm_categories__1DCHn}>
                            <span className={styles.ModelForm_categoryWrapper__3qvMl}>
                                <span className={styles.ModelForm_categoryName__3ikpG}>dogs</span>
                                <span className={styles.ModelForm_remove__3Bnot}>x</span>
                            </span>
                        </div>

                        <div className={styles.flexCenter} style={{marginTop: "60px"}}>
                            <button className={styles.drzUyi}><span>Create Model</span></button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  )
}

export default CreateNewModel