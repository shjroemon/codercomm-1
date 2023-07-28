import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getUser } from "../features/user/userSlice";

import { Card, Container } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import Profile from "../features/user/Profile";
import ProfileCover from "../features/user/ProfileCover";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;

  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ mb: 3, height: 200, position: "relative" }}>
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
