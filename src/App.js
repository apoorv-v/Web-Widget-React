import "./App.css";
import React, { useEffect, useState } from "react";
import check from "../src/assets/check.gif";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Dots } from "react-activity";
import Widget from "./assets/main";

import { Bounce, Sentry } from "react-activity";

function App() {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      setLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  


  useEffect(() => {
    console.log(file);
  }, [file]);
  
  const handleUpload = (event) => {
    
      setLoading(true);
      setFile(event.target.files[0]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

  };

  const submitHandler = () => {
    if(file){
      setComplete(true);
    }
  }

  const getFileData = () => {
    if (file) {
      let name = file.name;
      name = name.slice(0, name.length - 4);
      return (
        <div>

        <div className="detailsText">
          File:{" "}
          {name.length > 10
            ? name.slice(0, 13).trim() + "...txt"
            : name + ".txt"} 
        </div>
        <div className="detailsText">
          Size: {file.size + " KB"}
        </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  if (loading) {
    return (
      <div className="App">
        <Bounce size="20" color="rgb(218, 199, 196);" speed="2" />
      </div>
    );
  } 
  else if(isComplete){
    return (
      <div className="App">
      <h1>DONE! ✔</h1>
    </div>
    )
  }
  else {
    return (
      <div className="App">
        <h3 className="title">Pan Card Verification</h3>
        <div className="content2">
          <div className="buttonss">
            {
              file ? 
              <label
              for="file-upload"
              className={file ? "custom-file-upload2" : "custom-file-upload"}
              onClick = {submitHandler}
            >
              {file ? "➡" : "Upload"}
            </label> 
            :
            <label
              for="file-upload"
              className={file ? "custom-file-upload2" : "custom-file-upload"}
            >
              {file ? "➡" : "Upload"}
              <input id="file-upload" type="file" onChange={handleUpload} />
            </label>

            }
            
            {file ? (
              <label for="file-upload" className="custom-file-upload2 reload">
                ⟳
                <input id="file-upload" type="file" onChange={handleUpload} />
              </label>
              
            ) : (
              <div />
            )}
          </div>
          {getFileData()}
        </div>
      </div>
    );
  }
}

export default App;
