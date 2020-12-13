import React from "react";
import styles from "./home.module.css";
import axios from "axios";
import { Link } from "@reach/router";

function Dashboard() {
  const [cnnModels, setCNNModels] = React.useState([]);
  //   const [nlpModels, setNLPModels] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([window.axiosInstance.get("/model/get-models-cnn")])
      .then((responseArr) => {
        //this will be executed only when all requests are complete
        setCNNModels(responseArr[0].data);
      })
      .catch((err) => console.log(err));
  }, []);

  const CNNModels = cnnModels.map((data, index) => {
    const { name, modelId, displayName, description, imgURL } = data;
    return (
      <div key={index} className={styles.jss267}>
        <Link
          className={styles.jss268}
          to={`/models/computer_vision/${name}/${modelId}`}
        >
          <p className={styles.jss274}>{displayName}</p>
          <p className={styles.jss275}>{description}</p>
          <img className={styles.jss276} src={imgURL} alt="" />
        </Link>
      </div>
    );
  });

  //   const NLPModels = nlpModels.map((data, index) => {
  //     return (
  //       <div key={index} className={styles.jss267}>
  //         <Link
  //           className={styles.jss268}
  //           to={`/models/nlp/${data.name}/${data.modelId}`}
  //         >
  //           <p className={styles.jss274}>{data.displayName}</p>
  //           <p className={styles.jss275}>{data.description}</p>
  //           <img className={styles.jss276} src={data.imgURL} alt="" />
  //         </Link>
  //       </div>
  //     );
  //   });

  return (
    <>
      <div style={{ padding: "30px 60px" }}>
        <p className={styles.modelTitle}>Use existing model</p>
        <div style={{ margin: "0px -8px" }}>
          <div className={styles.jss263}>{CNNModels}</div>
        </div>
      </div>
      {/* <div style={{ padding: "30px 60px" }}>
        <p className={styles.modelTitle}>Use existing NLP model</p>
        <div style={{ margin: "0px -8px" }}>
          <div className={styles.jss263}>{NLPModels}</div>
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;
