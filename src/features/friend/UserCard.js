import React from "react";
import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";

import { Avatar, Box, Card, Link, Typography } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import { Link as RouterLink } from "react-router-dom";

function UserCard({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const { _id: targetUserId, name, avatarUrl, email, friendship } = profile;
  // rename _id to targetUserId

  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
          component={RouterLink}
          to={`/user/${targetUserId}`}
        >
          {name}
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailRoundedIcon sx={{ width: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>
      </Box>
      {actionButton}
    </Card>
  );
}

export default UserCard;
