import React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AppContext from "../Context/AppContext";


export default function Notifications() {
    const {currentUser} = React.useContext(AppContext);
  return (
    <Badge badgeContent={currentUser ? currentUser.messages : 0} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
