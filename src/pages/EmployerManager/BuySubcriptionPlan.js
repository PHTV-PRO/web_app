import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from '../../util/settings/config';
import "./BuySubcriptionPlan.css"


import { getCurrentUserAction } from '../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { buyScriptionPlan,getSubscriptionPlanListAction } from '../../redux/actions/SubscriptionPlanAction';

import { history } from '../../App';
import dayjs from 'dayjs';
import { now } from 'moment/moment';



const BuySubcriptionPlan = () => {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    // let { subscriptionPlanByAccount } = useSelector(state => state.SubscriptionPlanReducer);
    let {arrSubscriptionPlan} = useSelector(state => state.SubscriptionPlanReducer);
    console.log("check goi:", arrSubscriptionPlan.data);

    const [isModalOpen, setIsModalOpen] = useState(false);


    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        if (TOKEN != null) {
            dispatch(getCurrentUserAction(accessToken))
            dispatch(getCompanyAndJobByTokenAction(accessToken))
            dispatch(getSubscriptionPlanListAction())
        }
    }, [dispatch]);

    if (userLogin && (userLogin?.role !== 'EMPLOYER')) {
        history.replace('/')
    }

    const [selectedPackage, setSelectedPackage] = useState();
    const [getPrice, setPrice] = useState(0);
    const handlePackageChange = (event) => {
      setSelectedPackage(event.target.value);
      arrSubscriptionPlan?.data.map((data)=>{
        if(data.id==event.target.value)
        setPrice(data.price)
      })
    };
    const handleSubmit = ()=>{
        if(getPrice!=0){
            dispatch(buyScriptionPlan(selectedPackage,getPrice))
        }
    }

   
    return (
        <div >
            <div className=''>
                <div className="">
                    <h1 className='text-center text-lg'>Please choose one subcription plan</h1>
                    <div className="package-options ml-10 row justify-center">
                            {(arrSubscriptionPlan?.data)?.map((pk) => (
                                <div className='col-5 p-3  '>
                                    <div className="flex row">   
                                            <div className={pk.price>=5?(pk.price>=10?"card3 cardLeft":"card2 cardLeft"):"card1 cardLeft"}>
                                                <h1><input
                                                type="radio"
                                                name="package"
                                                value={pk.id}
                                                checked={selectedPackage == pk.id}
                                                onChange={handlePackageChange}
                                                className='w-10'
                                                />Code: <span className='font-bold'>{pk.name}</span></h1>
                                                 <div className="name">
                                                    <span>Description</span>
                                                    <h2>
                                                    {pk.description}
                                                    </h2>
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-5">
                                                        <div className="title">
                                                            <span>Expiry</span>
                                                            <h2>{pk.expiry} days</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="title">
                                                            <span>Price</span>
                                                            <h2>{pk.price} $</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                        
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="package-description">
                    <div className="package-options">
                        {(arrSubscriptionPlan?.data)?.map((packageName) => (
                        <>
                        
                        {packageName.id==selectedPackage?<> <hr/> <h2 className='text-center text-lg'>Your choose</h2>
                         <div className='col-5 p-3  mx-auto'>
                                    <div className=" row ml-2">   
                                            <div className="card4 cardLeft">
                                            
                                                <h1>Code: <span className='font-bold'>{packageName.name}</span></h1>
                                                 <div className="name">
                                                    <span>Description</span>
                                                    <h2>
                                                    {packageName.description}
                                                    </h2>
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-5">
                                                        <div className="title">
                                                            <span>Expiry</span>
                                                            <h2>{packageName.expiry} days</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="title">
                                                            <span>Price</span>
                                                            <h2>{packageName.price} $</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-5">
                                                        <div className="title">
                                                            <span>Available job openings</span>
                                                            <h2>{packageName.expiry} Jobs</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-5">
                                                        <div className="title">
                                                            <span>Start date</span>
                                                            <h2>{(dayjs(new Date())).format('DD-MM-YYYY')} days</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="title">
                                                            <span>End Date</span>
                                                            <h2>{(dayjs(new Date()).add(packageName.expiry,'day')).format('DD-MM-YYYY')} $</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                    </div>
                                </div> 
                                 <div className='' style={{marginLeft:"48%"}}> <Button  type="primary" danger onClick={handleSubmit} >BUY</Button></div></>:""}
                        </>
                        ))}
                    </div>
                    </div>
                    </div>
            </div>

           
        </div>
    );
};

export default BuySubcriptionPlan;