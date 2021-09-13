import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'react-router-dom';

const Page404: React.FC = () => {
  return (
    <Container>
      <div>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </div>
    </Container>
  );
};

const Container = styled('div')`
  height: '100%';
  display: 'grid';
  align-items: 'center';
  justify-content: 'center';
`;

export default Page404;
