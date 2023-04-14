import React from 'react';
import StudentsForm from '../components/students/students-form/StudentsForm';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.svg';

function RegisterPage() {
  return (
    <PageLayout title="Signup as student" >
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="max-auto mb-3 text-center">
            <img src={logo} alt="Iron Projects" className="img-fluid" style={{ maxHeight: '130px' }} />
          </div>
          <StudentsForm />
          <hr />
          <p className='m-0 text-muted'>Already registered? just <Link to="/login">Login!</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}

export default RegisterPage