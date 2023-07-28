import React, { useEffect, useState } from "react";

import { Typography, Box, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";

import PostCard from "./PostCard";

import { styled } from "@mui/material/styles";
import UpdatePost from "./UpdatePost";

const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: theme.spacing(1),
  transform: "translate(-50%,-50%)",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

function PostList({ userId }) {
  const [postUpdated, setPostUpdated] = useState(null);
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);

  const hanldeUpdatePost = (post) => {
    setPostUpdated(post);
  };

  return (
    <>
      {posts.map((post) => (
        <PostCard
          handleUpdate={() => {
            hanldeUpdatePost(post);
          }}
          key={post._id}
          post={post}
        />
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {totalPosts ? (
          <LoadingButton
            onClick={() => {
              setPage((page) => page + 1);
            }}
            variant="outlined"
            size="small"
            loading={isLoading}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No post yet</Typography>
        )}
      </Box>
      <Modal
        open={!!postUpdated}
        onClose={() => {
          setPostUpdated(null);
        }}
      >
        <BoxStyled>
          <UpdatePost
            {...postUpdated}
            callback={() => {
              setPostUpdated(null);
            }}
          />
        </BoxStyled>
      </Modal>
    </>
  );
}

export default PostList;
