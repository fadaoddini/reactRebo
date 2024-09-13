import React from 'react';
import axios from 'axios';
import Config from '../../../config/config';
import nopic from '../../../assets/images/nopic.png';
import style from '../../../pages/transport/transportList/TransportList.module.css';

const TransportActive = ({ transportReqsActive }) => {

  return (
    <div className={style.custom_dir}>
      <h6 className={style.tbazar}>آگهی های فعال من</h6>
      <div>
        {transportReqsActive.length > 0 ? (
          transportReqsActive.map((transport) => (
            <div key={transport.id} className={style.boxCardSingle}>
              <div className={style.boxCardInner}>
                <img
                  src={
                    transport.image
                      ? `${Config.baseUrl}${transport.image}`
                      : nopic
                  }
                  alt="Transport"
                  className={style.productImage}
                />
                <div className={style.productDetails}>
                 
                 <div className={style.title2}>
                  {transport.my_transport.car_name} .
                 (
                    ظرفیت :
                   <span className={style.productPrice}>
                     {transport.my_transport.capacity}
                   </span>
                   تن
                 )
                 </div>
                 <div className={style.title2}>
                   قیمت :
                   <span className={style.productPrice}>
                     {transport.price}
                   </span>
                   ریال
                 </div>
                 <div className={style.title2}>
                   مبدا :
                   <span className={style.productPrice}>
                     {transport.origin}
                   </span> -
                   مقصد :
                   <span className={style.productPrice}>
                     {transport.destination}
                   </span>
                 </div>
                
                 <div
                   className={`${style.productBadge} ${
                     transport.status ? style.active : style.inactive
                   }`}
                 >
                   {transport.status ? 'فعال' : 'غیرفعال'}
                 </div>
               </div>
              </div>
              
            </div>
          ))
        ) : (
          <div>حمل و نقلی پیدا نشد</div>
        )}
      </div>
    </div>
  );
};

export default TransportActive;
