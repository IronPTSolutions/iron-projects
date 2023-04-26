import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import CohortForm from '../components/cohorts/cohort-form/CohortForm';

function CreateCohortPage() {
  return (
    <PageLayout title="Create new cohort">
      <CohortForm />
    </PageLayout>
  )
}

export default CreateCohortPage;