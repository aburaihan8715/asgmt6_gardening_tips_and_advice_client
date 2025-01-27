import React from 'react';
import Container from './Container';

const Notification = () => {
  return (
    <Container>
      <div className="z-50 rounded bg-green-600 px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          &quot;To plant a garden is to believe in tomorrow.&quot; — Audrey
          Hepburn
        </p>
      </div>
    </Container>
  );
};

export default Notification;
