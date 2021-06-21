import React from "react";
import "./App.css";
import statements from "./sample.json";
import TopNav from "./components/TopNav";
import Payment from "./components/Payment";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Button,
  Input,
  UncontrolledCollapse,
} from "reactstrap";

class App extends React.Component {
  state = {
    statements,
    paymentConfirmed: "",
    search: "",
  };

  // Takes the user input from the search bar
  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  // When the user clicks on the client they wish to view, this will populate the component
  handleButtonClick = (payee, e) => {
    e.preventDefault();
    this.setState({
      paymentConfirmed: payee,
    });
  };

  render() {
    // If there is a client selected, sends all relevant data for client and related remittance to create invoice
    let invoice;
    if (this.state.paymentConfirmed) {
      invoice = (
        <Payment
          // Our client information
          name={this.state.paymentConfirmed.Payee.Name}
          fax={this.state.paymentConfirmed.Payee.Fax}
          phone={this.state.paymentConfirmed.Payee.Phone}
          address={this.state.paymentConfirmed.Payee.Address.Address1}
          address2={this.state.paymentConfirmed.Payee.Address.Address2}
          city={this.state.paymentConfirmed.Payee.Address.City}
          provinceOrState={
            this.state.paymentConfirmed.Payee.Address.StateorProvince
          }
          postal={this.state.paymentConfirmed.Payee.Address.PostalCode}
          attention={this.state.paymentConfirmed.Payee.Attention}
          date={this.state.paymentConfirmed.Payee.SubmissionDate}
          // Client's payment information
          cardPAN={this.state.paymentConfirmed.Payment.PAN}
          cardCVV={this.state.paymentConfirmed.Payment.CVV}
          cardExp={this.state.paymentConfirmed.Payment.Exp}
          // Remittance information confirming payment
          remittance={this.state.paymentConfirmed.Remittance}
        />
      );
    }

    // Runs through all the data in the json, filtering them through the Payee Name onChange with each keystroke in the search bar
    let filteredSearch = this.state.statements.filter((payee) => {
      return (
        payee.Payee.Name.toUpperCase().indexOf(
          this.state.search.toUpperCase()
        ) !== -1
      );
    });

    return (
      <div className="App">
        {/* Navbar */}
        <TopNav />
        {/* Column on the left */}
        <Row id="row-height">
          <Col sm="3" className="bg-light">
            <Container>
              <InputGroup className="pb-2 pt-1">
                {/* Search Bar */}
                <Input
                  type="text"
                  // This is where it is made into all uppercase letters
                  value={this.state.search.toUpperCase()}
                  onChange={this.updateSearch.bind(this)}
                  placeholder="Start typing to find a client..."
                />
              </InputGroup>
              {/* Payees being displayed */}
              <ListGroup>
                <Button
                  color="primary"
                  id="toggler"
                  style={{ marginBottom: "1rem" }}
                >
                  See All Clients
                </Button>
                {/* Reactstrap toggle button that hides/shows the list of clients */}
                <UncontrolledCollapse toggler="toggler">
                  {filteredSearch.map((payee, index) => {
                    return (
                      <a href="/">
                        <ListGroupItem
                          action
                          key={index}
                          onClick={(e) => this.handleButtonClick(payee, e)}
                        >
                          <span>{payee.Payee.Name}</span>
                        </ListGroupItem>
                      </a>
                    );
                  })}
                </UncontrolledCollapse>
              </ListGroup>
            </Container>
          </Col>
          {/* Column on the right */}
          <Col sm="9" className="bg-secondary">
            {/* Payee's current invoice */}
            {invoice}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
