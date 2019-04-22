import React from 'react';
import { Container } from 'reactstrap';
import Movement from './Movement';

const MovementsHistory = ({ movements }) => {
  return (
    <Container>
      {
        movements.map(movement => <Movement key={movement.id} movementData={movement} />)
      }
    </Container>
  )
};

export default MovementsHistory;