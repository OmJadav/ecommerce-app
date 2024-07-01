import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    // <div className="sweet-loading text-center">
    <div className="sweet-loading flex mt-20 justify-center h-screen">
      <SyncLoader
        color="#000000"
        loading
        margin={5}
        cssOverride={{}}
        speedMultiplier={1}
      />
    </div>
  );
}

export default Loader;
