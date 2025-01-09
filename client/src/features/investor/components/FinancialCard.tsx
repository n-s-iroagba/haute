import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface FinancialCardProps {
  title: string;
  amount: number;
  percentage?: number;
  periodInDays?: number;
}

export function FinancialCard({ title, amount, periodInDays, percentage }: FinancialCardProps): JSX.Element {

  
  return (
    <Card className="shadow-sm h-100 w-100">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0">
        <span className="text-muted">{title}</span>
       {percentage && percentage > 0 && <FontAwesomeIcon icon={faArrowUp} className='text-success' /> }
      </Card.Header>
      <Card.Body>
        <h4 className="fw-bold text-dark">${amount.toLocaleString()}</h4>
        <p className='small mb-0 text-success'>
       {periodInDays &&`since ${periodInDays} days ago`}
        </p>
      </Card.Body>
    </Card>
  );
}
export default FinancialCard