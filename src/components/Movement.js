import React, { useState } from 'react';
import { Collapse, Card, CardHeader, CardBody } from 'reactstrap';

const Movement = ({ movementData }) => {
  const { type, amount, effectiveDate } = movementData;
  const [expanded, setExpanded] = useState(false);

  const [date, time] = effectiveDate.split('T');
  const [effectiveTime] = time.split('.');
  return (
    <Card inverse color={type === 'debit' ? 'success' : 'danger'} style={{marginTop: '0.5em'}}>
      <CardHeader onClick={() => setExpanded(!expanded)}>{`${type}: ${amount}`}</CardHeader>
      <Collapse isOpen={expanded}>
        <CardBody>
          <p>{`Type: ${type}`}</p>
          <p>{`Amount: ${amount}`}</p>
          <p>{`Effective Date: ${date} ${effectiveTime}`}</p>
        </CardBody>
      </Collapse>
    </Card>
  );
}

export default Movement;