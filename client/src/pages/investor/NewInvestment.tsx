import React from "react";
import NewInvestmentForm from "../../features/investment/components/NewInvestmentForm";
import Information from "../../common/components/Information";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import MiniFooter from "../../common/components/MiniFooter";
import '../../common/styles/styles.css'

const NewInvestment: React.FC<{ username: string, id: number }> = ({ username, id }) => {

    return (
        <div className='px-1 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items'>

                <Information center={true} text='Fill the form below to get started.' head='Create a portfolio' icon={faHandHoldingDollar} />
                <NewInvestmentForm username={username} id={id} />

            </div>
            <MiniFooter />
        </div>
    )
}
export default NewInvestment;