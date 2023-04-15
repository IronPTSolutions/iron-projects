import React from 'react'
import PageLayout from '../components/layout/PageLayout';
import StudentDetail from '../components/students/student-detail/StudentDetail';

function StudentPage() {
  return (
    <PageLayout title="About me">
      <StudentDetail />
    </PageLayout>
  )
}

export default StudentPage;