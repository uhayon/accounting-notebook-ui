import React from 'react';
import { Alert, Button } from 'reactstrap';

const GlobalPosition = ({ netBalance, refreshData }) => {
  return (
    <Alert color='primary' style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '1.2em'}}>
      {`Net Balance: ${netBalance}`}
      <Button color='secondary' onClick={refreshData}><i className="fas fa-redo-alt"></i></Button>
    </Alert>
  )
}

export default GlobalPosition;