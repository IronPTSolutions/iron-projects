import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import cohortsService from '../../../services/cohorts';
import moment from 'moment';

function CohortsNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    async function fetchCohorts() {
      try {
        const cohorts = await cohortsService.list();
        if (!location.search && cohorts.length > 0) {
          const lastCohort = cohorts[0];
          navigate({
            pathname: "/projects",
            search: createSearchParams({
              cohort: lastCohort.id
            }).toString()
          });
        } else {
          setCohorts(cohorts);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchCohorts();
  }, [location, navigate]);

  const renderNavLinkClassName = (to) => {
    const currentPath = `${location.pathname}${location.search}`;
    const baseClasses = 'list-group-item list-group-item-action';
    return () => to === currentPath ? `${baseClasses} active` : baseClasses;
  }

  return (
    <div className="list-group">
      {cohorts.map((cohort) => {
        const to = `/projects?cohort=${cohort.id}`;
        return (
          <NavLink key={cohort.id} to={`/projects?cohort=${cohort.id}`} className={renderNavLinkClassName(to)}>
            {cohort.location} - {moment(cohort.start).format('YY-MM')}
          </NavLink>
        )
      })}
    </div>
  )
}

export default CohortsNav