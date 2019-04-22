import React from 'react';
import { Container, Alert, Spinner } from 'reactstrap';
import MovementsHistory from './MovementsHistory';
import GlobalPosition from './GlobalPosition';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movements: [],
      searchingMovements: false,
      errorState: false,
      searchingGlobalPosition: false,
      netBalance: 0
    }
  }

  componentDidMount() {
    this.refreshData();
  }
  
  refreshData = () => {
    this.searchMovements();
    this.searchGlobalPosition();
  }

  searchGlobalPosition = () => {
    this.setState(prevState => ({
      ...prevState,
      searchingMovements: true
    }), () => {
      fetch('http://localhost:3000/globalStatus')
        .then(response => response.json())
        .then(({ netBalance }) => this.setGlobalPosition(netBalance))
        .catch(err => this.setGlobalPosition(0));
    })
  }

  setGlobalPosition = netBalance => {
    this.setState({ netBalance });
  }

  searchMovements = () => {
    this.setState(prevState => ({
      ...prevState,
      errorState: false,
      searchingMovements: true
    }), () => {
      fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(movements => this.setMovements(movements))
        .catch(err => this.setMovements());
    })
  }

  setMovements = movements => {
    this.setState({
      errorState: !movements,
      searchingMovements: false,
      movements: movements ? movements : []
    });
  }

  render() {
    const { movements, searchingMovements, errorState, netBalance, searchingGlobalPosition } = this.state;
    return (
      <Container>
        {
          searchingGlobalPosition ?
          <Spinner style={{ width: '3rem', height: '3rem' }} /> :
          <GlobalPosition netBalance={netBalance} refreshData={this.refreshData} />
        }
        {
          searchingMovements ?
          <Spinner style={{ width: '3rem', height: '3rem' }} /> :
          (
            errorState ?
            <Alert color="danger">There was an error retrieving the movements history, please refresh.</Alert> :
            <MovementsHistory movements={movements} />
          )
        }
      </Container>
    )
  }
}

export default App;