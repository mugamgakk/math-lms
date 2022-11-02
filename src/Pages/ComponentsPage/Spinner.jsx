import React, {useState} from "react";

import FadeLoader from "react-spinners/FadeLoader";
// https://www.davidhu.io/react-spinners/

const override = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }

function Spinner() {
    let [loading, setLoading] = useState(true);
    return (
        <div className="sweet-loading">
            <button className="btn" onClick={() => setLoading(!loading)}>Toggle Loader</button>

            <FadeLoader color={"#ccc"} loading={loading} cssOverride={override} size={150} />
            <pre>
                {
                    `
                    import FadeLoader from "react-spinners/FadeLoader";
                    // https://www.davidhu.io/react-spinners/

                    let [loading, setLoading] = useState(true);

                    <FadeLoader color={"#ccc"} loading={loading} cssOverride={override} size={150} />

                        color : 색상

                        loading : 보여주고 안보여주기 (boolean)

                        cssOverride : css커스텀

                        size : 크기
                    `
                }
            </pre>
        </div>
    );
}

export default Spinner;
