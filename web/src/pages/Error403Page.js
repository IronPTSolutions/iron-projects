import React from 'react';
import PageLayout from '../components/layout/PageLayout';

function Error403Page() {
  return (
    <PageLayout title="Forbidden access">
      <h1>403</h1>
      <p>You are not allowed to enter in this area</p>
    </PageLayout>
  )
}

export default Error403Page