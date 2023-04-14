import React from 'react'
import Header from '../header/Header'

import './PageLayout.css';

function PageLayout({ title, children }) {
  return (
    <div className='page-layout'>
      <Header title={title} />
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default PageLayout;