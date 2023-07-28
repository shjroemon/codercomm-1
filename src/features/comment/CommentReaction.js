import React, { useState } from "react";

import { IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

import { useDispatch } from "react-redux";
import { sendCommentReaction, deleteComment } from "./commentSlice";
import useAuth from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function CommentReaction({ comment, postId }) {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;

  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };

  const handleDelete = () => {
    dispatch(deleteComment({ commentId: comment._id, postId }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography variant="h6" mr={1}>
        {comment?.reactions?.like}
      </Typography>

      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownAltRoundedIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography variant="h6">{comment?.reactions?.dislike}</Typography>
      {userId === comment.author._id && (
        <IconButton
          onClick={() => {
            setOpenDialog(true);
          }}
          sx={{ color: "primary.main" }}
        >
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              handleDelete();
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CommentReaction;
