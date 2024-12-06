import React, { Fragment, useContext, useEffect } from 'react'
import { useUser } from '../../features/authentication/userUser';
import { useNavigate } from 'react-router';
import FullPage from '../../ui/FullPage';
import Spinner from '../../ui/Spinner';
import { AuthContext } from '../../context/GlobalContext';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  children: React.ReactNode;
}
const LayoutApp: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isFetching } = useUser();
  // const queryClient = useQueryClient();

  // console.log(localStorage.getItem('access_token'), isAuthenticated, isPending, isFetching);

  useEffect(() => {
    if(!isAuthenticated && !isFetching) {
      navigate('/login');
    }

  }, [isAuthenticated, isFetching]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner size={50} />
      </FullPage>
    )
  }

  console.log(isAuthenticated);

  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}

export default LayoutApp;
