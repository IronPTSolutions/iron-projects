import React from 'react';
import StudentsLogin from '../components/students/students-login/StudentsLogin';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.svg';

function LoginPage() {
  return (
    <PageLayout title="Login to your account">
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <div className="max-auto mb-3 text-center">
            <img src={logo} alt="Iron Projects" className="img-fluid" style={{ maxHeight: '130px' }} />
          </div>
          <StudentsLogin />
          <hr />
          <p className='m-0 text-muted'>Don't have an account yet? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </PageLayout>
  )
}

export default LoginPage