import React from 'react';
import axios from 'axios';
import Config from '../../../config/config';
import nopic from '../../../assets/images/nopic.png';
import style from '../../../pages/transport/transportList/TransportList.module.css';

const TransportNotPay = ({ transportReq, handlePaymentClick, setTransportReq }) => {
  const jwtToken = sessionStorage.getItem('accessToken');

  // تابع حذف درخواست
  
  const handleDeleteClick = async (transportId) => {
    try {
      await axios.delete(
        `${Config.baseUrl}/transport/delete_transport_req_api/`,
        {
          data: { transport_req_id: transportId },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      
      // استفاده از تابعی که از حالت فعلی لیست مطلع است
      setTransportReq((prevTransportReq) =>
        prevTransportReq.filter((transport) => transport.id !== transportId)
      );
  
      alert('حمل و نقل با موفقیت حذف شد');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  

  return (
    <div className={style.custom_dir}>
      <h6 className={style.tbazar}>آگهی های پرداخت نشده من</h6>
      <div>
        {transportReq.length > 0 ? (
          transportReq.map((transport) => (
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
              <div className={style.buttonContainer}>
                <button
                  className={style.payButton}
                  onClick={() => handlePaymentClick(transport.id)}
                >
                  پرداخت
                </button>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDeleteClick(transport.id)}
                >
                  حذف
                </button>
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

export default TransportNotPay;
