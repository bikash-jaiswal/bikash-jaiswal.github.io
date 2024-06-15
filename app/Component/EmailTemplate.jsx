const EmailTemplate = ({ firstName }) => {
    return (
      <div>
        <h1>Welcome, {firstName}!</h1>
        <p>Thank you for choosing our service.</p>
        <p>If you have any questions, feel free to contact us at support@example.com.</p>
        <p>Best regards,<br />The Example Team</p>
      </div>
    );
  };
  
  export default EmailTemplate;