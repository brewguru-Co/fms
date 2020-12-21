import React from 'react';

const AuthContent = ({ title, children }) => (
  <>
    <div>{title}</div>
    {children}
  </>
);

export default AuthContent;
