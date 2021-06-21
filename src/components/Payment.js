import React from "react";
import { Container, Row, Col, Table } from "reactstrap";

class Payment extends React.Component {
  render() {
    //This is the data being pulled from the provided json blob
    const {
      name,
      fax,
      phone,
      address,
      address2,
      city,
      stateOrProvince,
      postal,
      attention,
      date,
      cardPAN,
      cardCVV,
      cardExp,
    } = this.props;

    return (
      // The invoice component is being populated with the data from above
      <Container className="bg-white mt-5 border border-light rounded">
        <Row>
          <Col className="p-1 border border-dark rounded">
            <h2 className="p-3">REMITTANCE HISTORY OF {name}</h2>
          </Col>
        </Row>
        <Row className="pt-2">
          <Col sm="5">
            <div>{name}</div>
            <div>{address}</div>
            <div>{address2}</div>
            <div>
              {city}, {stateOrProvince} {postal}
            </div>
            <br></br>
            <div>
              Attention: <br></br>
              {attention}
            </div>
          </Col>
          <Col sm="2"></Col>
          <Col sm="5">
            <div>Phone: {phone}</div>
            <div>Fax: {fax}</div>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm="5">
            <div className="border">
              <h5>Remittance Invoice</h5>
              <h6>Date Submitted:</h6>
              <h6> {date}</h6>
            </div>
          </Col>
          <Col sm="2"></Col>
          <Col sm="5">
            <div className="border">
              <h5>Card On File:</h5>
              <h6>PAN: {cardPAN}</h6>
              <h6>
                CVV: {cardCVV} Exp: {cardExp}
              </h6>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>Payor Name</th>
                  <th>Payor ID</th>
                  <th>Invoice #</th>
                  <th>Description</th>
                  <th>Payment Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* List of all remittance the client has available  */}
                {this.props.remittance.map((payor, index) => {
                  return (
                    <tr key={index}>
                      <td>{payor.PayorName}</td>
                      <td>{payor.PayorId}</td>
                      <td>{payor.InvoiceNo}</td>
                      <td>{payor.Description}</td>
                      <td>{payor.Amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Payment;
