import React, { useState } from "react";
import Loading from "../../components/loading";
import Tabs from "../../components/cardShop/Tabs";
import RightSidebar from "../sidebar/right";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(false);





  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="card custom-card margin-top-5">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="card-body">
             
             <Tabs />
            
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card custom-card margin-top-5 ">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
