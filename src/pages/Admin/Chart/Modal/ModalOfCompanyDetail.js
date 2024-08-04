import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCompanyIdAction } from "../../../../redux/actions/CompanyAction";

const ModalOfCompanyDetail = (props) => {
    const id = props.idCompany;
    const dispatch = useDispatch();
    const { companyDetail } = useSelector(state => state.CompanyReducer)
    console.log(companyDetail);
    useEffect(() => {
        dispatch(getCompanyIdAction(id))
    }, [dispatch, id])

    return <div>
        <h2 className="text-lg text-gray-400 font-bold">Detail Company </h2>
        <div className="flex items-center">
            <h1 className="text-base text-gray-400 font-semibold">Name : </h1>
            <h2 className="text-sm italic text-black ml-2">{companyDetail?.name}</h2>
        </div>
        <div className="flex items-center">
            <h1 className="text-base text-gray-400 font-semibold">Link Webstite : </h1>
            <a className="text-sm italic text-black ml-2 mb-[6px]" href={companyDetail?.link_website}>{companyDetail?.link_website}</a>
        </div>
        <div className="flex">
            <h1 className="text-base text-gray-400 font-semibold">Introduction : </h1>
            <h2 className='text-sm italic text-black flex-1 ml-2 mt-1'
                dangerouslySetInnerHTML={{ __html: companyDetail?.introduction }}
            >
            </h2>
        </div>
        <div className="flex">
            <h1 className="text-base text-gray-400 font-semibold">Benefit : </h1>
            <h2 className='text-sm italic text-black flex-1 ml-2 mt-1'
                dangerouslySetInnerHTML={{ __html: companyDetail?.benefit }}
            >
            </h2>
        </div>
        <div className="flex items-center">
            <h1 className="text-base text-gray-400 font-semibold">National : </h1>
            <h2 className="text-sm italic text-black ml-2">{companyDetail?.nationnality}</h2>
        </div>
        <div className="flex items-center">
            <h1 className="text-base text-gray-400 font-semibold">Profession : </h1>
            <h2 className="text-sm italic text-black ml-2">{companyDetail?.profession}</h2>
        </div>
    </div>
}

export default ModalOfCompanyDetail