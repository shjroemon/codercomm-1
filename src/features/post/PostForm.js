import React, { useCallback } from "react";
import { Box, Card, alpha, Stack, Button } from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import { ClosedCaptionDisabledOutlined } from "@mui/icons-material";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

function PostForm({ submit, post = defaultValues }) {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { ...post },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          { shouldDirty: true }
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      await submit(data, post);
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            gap={1}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>

            {isDirty && (
              <Button
                type="button"
                onClick={() => reset()}
                variant="contained"
                size="small"
              >
                Cancel
              </Button>
            )}
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
