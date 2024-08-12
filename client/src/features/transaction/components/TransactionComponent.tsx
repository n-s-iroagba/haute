import React from "react";
import { Col, Row } from "react-bootstrap";
import { formatStartDate } from "../../investment/utils/utils";
import { numberWithCommas } from "../../../common/utils/utils";
import { TransactionDto } from "../../../../../common/transactionType";

const TransactionComponent: React.FC<{ transaction: TransactionDto }> = ({
  transaction,
}) => {
  const transactionDate = new Date(transaction.date);
  const isoDateString = transactionDate.toISOString();

  const formattedAmount = numberWithCommas(transaction.amount);
  const truncatedAmount =
    formattedAmount.length > 5
      ? formattedAmount.slice(0, 5) + "..."
      : formattedAmount;
  return (
    <div className="mx-2 border transaction border-white px-2 py-2 mb-2">
      <Row className=" d-flex justify-content-between align-items-center ">
        <Col xs={3} className="text-center">
          <div className='mb-0'>{transaction.type}</div>
          <small className='smallest-font'>(*{transaction.narration})</small>
        </Col>
        <Col xs={3} className="text-center">
        {transaction.type === "Debit" || transaction.narration === 'Promo bonus imbursement' ? "To" : "From"}

        </Col>
        <Col xs={3} className="text-center">
          <small>{transaction.participatingAccount}</small>
        </Col>
        <Col
          xs={3}
          className={`text-center ${transaction.type === "Debit" ? "text-danger  " : " "}`}
        >
          <div>
            {transaction.type === "Debit"
              ? `-${truncatedAmount}`
              : `+${truncatedAmount}`}
          </div>
          <small className="text-light smallest-font">{formatStartDate(isoDateString)}</small>
        </Col>
      </Row>
      <Row className="d-flex transaction-small">
        <Col xs={9}>
          
        </Col>

        <Col>
        
        </Col>
      </Row>
    </div>
  );
};

export default TransactionComponent;
