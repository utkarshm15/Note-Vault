import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  otp : string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,otp
}) => (
  <div className='flex flex-col gap-2'>
    <h1>Welcome, {firstName}!</h1>
    <p>Thanks for joining Note Vault. To confirm your account, please enter the code below on our Sign up page.</p>
    <h3>{otp}</h3>
  </div>
);
