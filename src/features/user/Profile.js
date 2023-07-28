import React from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import useAuth from "../../hooks/useAuth";

import ProfileScorecard from "./ProfileScorecard";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";
import CreatePost from "../post/CreatePost";
import PostList from "../post/PostList";

function Profile({ profile }) {
  const { user } = useAuth();

  return (
    <Grid spacing={3} container>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id && <CreatePost />}
          <PostList userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
