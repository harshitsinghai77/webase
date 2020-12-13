import React from "react";
import styles from "./interface.module.css";
import { storage } from "./firebase-config";
import { Spin } from "antd";
import { Upload, message, Button, Icon } from "antd";
import { getCurrentUser } from "../../libs/storage/tokenStorage";
import ImageGrid from "./imageGrid";
import uuid from "uuidv4";

function InterfaceBody(props) {
  const { modelId, modelName } = props;
  const userID = getCurrentUser();

  const [imageUrl, setImageUrl] = React.useState();
  const [newUploadImage, setNewUploadImage] = React.useState({});
  const [jsonResponse, setJsonResponse] = React.useState();
  const [spinner, setSpinner] = React.useState(false);

  const getFlaskURL = {
    "5d7f76b3a61a193b005adaf4": "predict-nsfw",
    "5d95fd5785cb7c3c1cd087d5": "genderClassification",
    "5da9a2c70c07093acc5679e4": "imageColorization",
    "5daf780086abaf7140ed49dd": "removeBackground",
    "5dba1192f30d1a1a7482ab4f": "faceAging",
    "5dbab5c0b4323e54386993bc": "realEstate",
    "5dbfb657edbad56574a2f0fd": "deepFashion",
    "5dc07dc351dcd931d40bb676": "textExtraction",
    "5dc0fa3408b2c974242e470d": "neural-style-transfer",
  };

  const setImageUrlFunc = (url) => {
    setImageUrl(url);
    setSpinner(true);
    window.axiosInstance
      .post(
        `${process.env.REACT_APP_FLASK_APP_BASE_URL}/${getFlaskURL[modelId]}`,
        { imageUrl: url }
      )
      .then((res) => {
        setSpinner(false);
        setJsonResponse(res.data);
      })
      .catch((err) => {
        setSpinner(false);
        alert("Error while uploading image");
      });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      message.error("You can only upload image file!");
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
    }
    return isImage && isLt5M;
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = await storage.ref();
    const fileName = uuid() + file.name;
    const imgFile = storageRef.child(`WeBase/${fileName}`);
    try {
      const image = await imgFile.put(file, metadata);
      storage
        .ref("WeBase")
        .child(fileName)
        .getDownloadURL()
        .then((url) => {
          const dataObj = {
            userID: userID,
            currentModelName: modelName,
            currentModelID: modelId,
            imageName: file.name,
            imageURL: url,
          };
          window.axiosInstance
            .post("model/upload-image", dataObj)
            .then((data) => {
              setNewUploadImage({ imageURL: url, imageName: file.name });
              onSuccess(null, image);
            })
            .catch((err) => {
              alert("Error while uploading image");
            });
        });
    } catch (e) {
      onError(e);
    }
  };

  const imageProperties = {
    name: "imageName",
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const checkString = (str) => {
    if (typeof str !== "string") return false;
    return true;
  };

  const isBase64 = (str) => {
    if (!checkString(str)) return false;
    if (!str || str === "" || str.trim() === "") return false;
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  };

  const ImageHolder = ({ data }) => (
    <div className={styles.Test_previewContainer__3ZS6L}>
      {" "}
      <img
        src={`data:image/jpg;base64,${data}`}
        className={styles.Test_preview__3AvJR}
      />{" "}
    </div>
  );
  const ImageHolder2 = ({ data }) => (
    <div className={styles.Test_previewContainer__3ZS6L}>
      {" "}
      <img
        onError={null}
        src={data}
        className={styles.Test_preview__3AvJR}
      />{" "}
    </div>
  );

  return (
    <div className={styles.Test_grid2__3nZyM}>
      <div className={styles.Test_leftCol__1XSvT}>
        <div
          style={{
            overflow: "auto",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            height: "100%",
            background: "rgb(249, 249, 249)",
          }}
        >
          <div
            className={styles.Analyze_imageGridRoot__XgStN}
            style={{ filter: "blur(0px)" }}
          >
            <div className={styles.Analyze_imageGrid__1_hgM}>
              <ImageGrid
                modelId={modelId}
                userID={userID}
                setImageUrlFromChild={setImageUrlFunc}
                newUploadImage={newUploadImage}
              />
            </div>
          </div>
        </div>

        <Upload
          style={{ padding: "100px" }}
          showUploadList={false}
          {...imageProperties}
          beforeUpload={beforeUpload}
          customRequest={customUpload}
        >
          <Button className={styles.Test_fileInput__RJ0Qr}>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      </div>
      <div className={styles.Test_rightCol__2W8HC}>
        <div className={styles.Test_previewContainer__3ZS6L}>
          <img src={imageUrl} alt="" className={styles.Test_preview__3AvJR} />
        </div>

        {/* {isBase64(jsonResponse) && <ImageHolder data = {jsonResponse} /> || checkString(jsonResponse) && <ImageHolder2 data = {jsonResponse} />} */}
        <div
          style={{
            borderRadius: "6px",
            border: "1px solid rgb(222, 222, 222)",
            overflowY: "auto",
            overflowX: "hidden",
            display: "grid; grid-template-rows: auto 1fr",
            paddingTop: "8px",
          }}
        >
          <div
            style={{
              color: "#2b2b2b",
              fontWeight: "300",
              padding: "10px 0px",
              margin: "10px 24px",
              borderBottom: "1px solid rgb(189, 189, 189)",
            }}
          >
            JSON RESPONSE
          </div>
          <div style={{ position: "relative", padding: "0px 24px" }}>
            <pre style={{ margin: "0px" }}>
              {(spinner && <Spin spinning={spinner} />) ||
                (isBase64(jsonResponse) && (
                  <ImageHolder data={jsonResponse} />
                )) ||
                (checkString(jsonResponse) && (
                  <ImageHolder2 data={jsonResponse} />
                )) ||
                JSON.stringify(jsonResponse, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterfaceBody;
