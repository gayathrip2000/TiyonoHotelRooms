import React, { useState } from 'react'
import CircleLoader from "react-spinners/CircleLoader";

function Loader() {
    let [loading, setLoading] = useState(true);


    return (
        <div>
            <div className="sweet-loading text-center">

                <CircleLoader
                    color="#000"
                    loading={loading}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loader