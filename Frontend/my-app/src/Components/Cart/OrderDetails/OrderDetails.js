import React from 'react'
import { useEffect } from 'react'
import { orderDetails } from '../../Helper/getOrderDetails';
import './OrderDetails.css'
import { useContext } from "react"
import AuthContext from '../../../Store/auth-context';
import { useState } from 'react';




const OrderDetails = () => {
  const [orderId, setOrderId] = useState(0);
  const cartCtx = useContext(AuthContext);
  const token = cartCtx.token;
  const [orderStatus, setOrderStatus] = useState({
    confirm:true,
    processing:false,
    checking:false,
    dispatched:false,
    delivered:false


  })
  const cb = (data) => {
    setOrderId(data[0].orderId)
    const status = data[0].status

    if(status === "confirm"){
      setOrderStatus( {confirm:true,
        processing:false,
        checking:false,
        dispatched:false,
        delivered:false})
        return
    }
    else if(status === "processing"){
      setOrderStatus({confirm:true,
        processing:true,
        checking:false,
        dispatched:false,
        delivered:false})
        return
    }
    else if(status === "checking"){
      setOrderStatus({confirm:true,
        processing:true,
        checking:true,
        dispatched:false,
        delivered:false})
        return
    }
    else if(status === "dispatched"){
      setOrderStatus({confirm:true,
        processing:true,
        checking:true,
        dispatched:true,
        delivered:false})
        return
    }
    else if(status === "delivered"){
    setOrderStatus({confirm:true,
      processing:true,
      checking:true,
      dispatched:true,
      delivered:true})
      return
  }






}


  useEffect(() => {
    //callback functon for getting order Status
     orderDetails(token, cb);

  }, [])
  

  //css for step is
  const stepCompleted = "step completed";
  




  return (
      <div className="main_container my-5">
    
     
      
            
        <div className="container padding-bottom-3x mb-1">
        <div className="card mb-3">
          <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span><span className="text-medium">{orderId}</span></div>
          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 text-white" style={{backgroundColor:"#8a2b0b"}}>
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> UPS Ground</div>
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> Checking Quality</div>
            <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Date:</span> APR 27, 2021</div>
          </div>
          <div className="card-body">
            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
              <div className= {orderStatus.confirm ? stepCompleted : 'step'}>
                <div className="step-icon-wrap">
                  <div className="step-icon"><i className="pe-7s-cart"></i></div>
                </div>
                <h4 className="step-title">Confirmed Order</h4>
              </div>
              <div className={orderStatus.processing ? stepCompleted : 'step'}>
                <div className="step-icon-wrap">
                  <div className="step-icon"><i className="pe-7s-config"></i></div>
                </div>
                <h4 className="step-title">Processing Order</h4>
              </div>
              <div className={orderStatus.checking ? stepCompleted : 'step'}>
                <div className="step-icon-wrap">
                  <div className="step-icon"><i className="pe-7s-medal"></i></div>
                </div>
                <h4 className="step-title">Quality Check</h4>
              </div>
              <div className={orderStatus.dispatched ? stepCompleted : 'step'}>
                <div className="step-icon-wrap">
                  <div className="step-icon"><i className="pe-7s-car"></i></div>
                </div>
                <h4 className="step-title">Product Dispatched</h4>
              </div>
              <div className={orderStatus.delivered ? stepCompleted : 'step'}>
                <div className="step-icon-wrap">
                  <div className="step-icon"><i className="pe-7s-home"></i></div>
                </div>
                <h4 className="step-title">Product Delivered</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          <div className="custom-control custom-checkbox mr-3">
            <input className="custom-control-input" type="checkbox" id="notify_me"  />
            <label className="custom-control-label" htmlFor="notify_me">Notify me when order is delivered</label>
          </div>
          <div className="text-left text-sm-right"></div>
        </div>
      </div>

      </div>
  )
}




export default OrderDetails;