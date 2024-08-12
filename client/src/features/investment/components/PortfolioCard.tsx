import React from 'react';
import { Card } from 'react-bootstrap';
import '../../../common/styles/styles.css'


const PorfolioCard:React.FC<{title:string,mainText:string,subText?:string,primaryBackground?:boolean}> = ({title, mainText,subText,primaryBackground})=>{
  let textClassName = '';
  let backgroundClassName = '';

  if (primaryBackground) {
    textClassName = 'text-light';
    backgroundClassName = 'card-primary-background';
  }
  return(
    <div className='px-1'>
    <Card className={`${backgroundClassName} shade  round-card my-1 w-100`}>
      <Card.Body>
      <Card.Text ><small className={textClassName}>{title}</small></Card.Text>
      <Card.Title><h2 className={textClassName}>{mainText}</h2></Card.Title>
      <Card.Text><small className={textClassName}>{subText}</small></Card.Text>
      </Card.Body>

    </Card>
    </div>
  )
}
export default PorfolioCard
