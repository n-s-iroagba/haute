
import React from "react";
import { Card, Image } from "react-bootstrap";
import { ManagerCardProps } from "../types/props";
import'../styles/styles.css'




export const ManagerCard: React.FC<ManagerCardProps> = ({
  percentageYield,
  image,
  firstName,
  lastName,
  minimumInvestmentAmount,
  duration,
  button,
  qualification,
  deleteButton,
}) => {



 
  let imageUrl = '';

  // Check if 'image' is a Buffer before converting to Blob
  if (image && image.data && Array.isArray(image.data)) {
    const blob = new Blob([new Uint8Array(image.data)], { type: 'image/jpeg' });
    imageUrl = URL.createObjectURL(blob);
  } else {
    console.error("Invalid image data format.");
  }

  return (

    <Card bg="light" text="black" style={{width:'auto'}}>
      <Card.Header className="background-secondary py-2 d-flex flex-column justify-content-center align-items-center">
        <Card.Title className="text-center">{percentageYield}%</Card.Title>
        <Card.Title className="text-center">RETURN ON INVESTMENT</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-center">
          <Image style={{ width: '200px', height: '200px' }} src={imageUrl} alt="Card Image" roundedCircle />
        </div>
        <Card.Title className=" text-center w-100">{firstName + ' ' + lastName}</Card.Title>
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="w-100 ">
            <Card.Text className='text-center mb-1'>{qualification}</Card.Text>
            <Card.Text className='d-flex  align-items-center mb-0'><span className=' card-label-width-wide' >Minimum Deposit:</span> <span >${minimumInvestmentAmount}</span></Card.Text>
            <Card.Text className='d-flex align-items-center mb-0'><span className='card-label-width-wide ' >Investment Period:</span> <span >{duration + ' '} weeks</span></Card.Text>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center mtle-2"><div className="w-75">{button}</div></div>
        {deleteButton && <div className="w-100 py-3 d-flex justify-content-center"><div className="w-75">{deleteButton}</div></div>}
      </Card.Body>
    </Card>

  );
};


export default ManagerCard;