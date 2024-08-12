import React from "react";

import { Row,Col } from "react-bootstrap";
import '../../../common/styles/styles.css'
import { numberWithCommas } from "../../../common/utils/utils";
import useComponentVisibility from "../hooks/useComponentVisibility";
const Counter:React.FC = ()=>{
const assetTotal= 300000000
const clientTotal = 60000
const clientIncrement = 1000
const { componentRef, clientCount, assetCount } = useComponentVisibility(clientTotal, clientIncrement,assetTotal, assetTotal/(clientTotal/clientIncrement))

    return<div ref={componentRef} className="mb-4">
      <Row className='background-secondary'>
        <Col className='element py-4' sm={12} lg={6}>
          <h2 className='text-center heavy-font'> {clientCount< 60000 ? clientCount : numberWithCommas(clientCount)}+</h2><h3 className='text-center'>investors worldwide</h3>
        </Col>
        <Col  className='py-4 'sm={12} lg={6}>
          <h2 className='text-center heavy-font'>${assetCount < 300000000 ? assetCount : numberWithCommas(assetCount)}+</h2><h3 className='text-center'> under management</h3>
        </Col>
      </Row>
    </div>
}
export default Counter