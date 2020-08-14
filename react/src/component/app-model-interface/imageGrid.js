import React from 'react';
import styles from './interface.module.css';

function GridImages(props) {

    const [images, setImage] = React.useState([]);
    
    const {userID, modelId,newUploadImage} = props

    React.useEffect(() => {
        window.axiosInstance.get('model/upload-image', {
          params: {
            userID: userID,
            currentModelID: modelId
          }
        }).then((res) => {
          const {status, result} = res.data
          if(status){
            setImage(result)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }, []);

    const ImageExists = (url) => images.some(el => (el.imageURL === url)); 
    
    if('imageURL' in newUploadImage && !ImageExists(newUploadImage.imageURL)){
      setImage([...images.slice(0, 0), newUploadImage, ...images.slice(0, images.length)]);
    }
    
    const handleClick = (url) => {
        props.setImageUrlFromChild(url)
    }

    const GridImages = () => {
        const renderImages = images && images.map((values,key) => (
            <div id="prediction-0" key = {key} onClick = {() => handleClick(values.imageURL)} className={styles.Analyze_canvasRoot__29UVR}>
                <div className={styles.ImageGrid_box1__3DRHn}>
                    <img src={values.imageURL} alt={values.imageName} className={styles.ImageGrid_thumbnail__1o8Mb} />
                </div>
            </div>
        ))
        return renderImages || <h1>Loading images</h1>
    }
    
    return (
        <GridImages />
    )
}

export default GridImages