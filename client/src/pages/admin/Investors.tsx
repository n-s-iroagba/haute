import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DeleteModal from "../../common/components/DeleteModal";

import MiniFooter from "../../common/components/MiniFooter";
// import { InvestorAndInvestment } from '../../../../common/compositeTypes';
import "../../common/styles/styles.css";
import InvestorsCard from "../../features/investor/components/InvestorsCard";
import { getInvestors } from "../../features/investor/helpers/investorHelpers";
import CreditInvestorModalWithId from "../../features/investment/components/CreditInvestorModalWithId";
import EmailModal from "../../features/investor/components/EmailModal";
import EditVerificationModal from "../../features/investor/components/EditVerificationModal";

const Investors = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [investorData, setInvestorData] = useState<any>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [idToBeCredited, setIdToBeCredited] = useState(0);
  const [showMailModal, setShowMailModal] = useState(false);
  const [editVerificationModalId, setEditVerificationId] = useState(0);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [mailId, setMailId] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const data: [] = await getInvestors();
        data && setInvestorData(data);
        console.log("investor", data);
      } catch (error) {
        console.error("Error fetching  data.investor data:", error);
      }
    };

    fetchInvestorData();
  }, []);
  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setIdToBeDeleted(id);
  };

  const handleAdd = (id: number, name: string) => {
    setShowAddModal(true);
    setIdToBeCredited(id);
    setName(name);
  };

  const handleMail = (id: number, name: string) => {
    setShowMailModal(true);
    setMailId(id);
    setName(name);
  };

  const handleVerification = (id: number) => {
    setEditVerificationId(id);
    setShowVerificationModal(true);
  };

  const handleClose = () => {
    setShowVerificationModal(false);
  };

  return (
    <div className="primary-background ">
      <div className=" full-height px-2">
        <h2 className="text-center text-light py-3">Your Investors</h2>
        <Row className="flex flex-column align-items-center gy-3">
          {investorData.length ? (
            investorData.map((data: any, index: number) => (
              <Col md={6}>
                <InvestorsCard
                  firstName={data.investor.firstName}
                  lastName={data.investor.lastName}
                  amount={data.investment.amount}
                  date={data.investment.investmentDate}
                  amountDeposited={data.investment.amountDeposited}
                  verificationFee={data.investor.verificationFee}
                  addInvestmentButton={
                    <button
                      className="button-styles button-width-narrow"
                      onClick={() =>
                        handleAdd(
                          data.investor.id,
                          `${data.investor.firstName} ${data.investor.lastName}`
                        )
                      }
                    >
                      Add Investor Funds
                    </button>
                  }
                  sendMailButton={
                    <button
                      className="button-styles button-width-narrow"
                      onClick={() =>
                        handleMail(
                          data.investor.id,
                          `${data.investor.firstName} ${data.investor.lastName}`
                        )
                      }
                    >
                      Send Email
                    </button>
                  }
                  verificationButton={
                    <button
                      className="button-styles button-width-narrow"
                      onClick={() => handleVerification(data.investor.id)}
                    >
                      Edit Verification Fee Data
                    </button>
                  }
                  deleteButton={
                    <button
                      className="red-button button-width-narrow"
                      onClick={() => handleDelete(data.investor.id)}
                    >
                      Delete
                    </button>
                  }
                />
              </Col>
            ))
          ) : (
            <h2 className="text-center text-light">No Investors...</h2>
          )}
        </Row>
        <DeleteModal
          id={idToBeDeleted}
          show={showDeleteModal}
          entity="investor"
        />
        <CreditInvestorModalWithId
          show={showAddModal}
          id={idToBeCredited}
          name={name}
        />
        <EmailModal show={showMailModal} id={mailId} name={name} />
        <EditVerificationModal
          show={showVerificationModal}
          handleClose={handleClose}
          id={editVerificationModalId}
        />
      </div>
      <MiniFooter primaryVariant />
    </div>
  );
};
export default Investors;
