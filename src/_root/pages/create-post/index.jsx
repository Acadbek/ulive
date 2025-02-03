import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextEffect } from "@/components/ui/text-effect";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import FileUploader from "../../../components/shared/UploadFile";

const CreatePost = () => {
  const [fileUrl, setFileUrl] = React.useState();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Form>
      <TextEffect
        className="text-2xl  mb-4 ml-10 font-semibold"
        per="char"
        preset="fade"
      >
        Create post
      </TextEffect>
      <Input
        className="h-[80px] !text-[20px] placeholder:text-md"
        placeholder="Post title"
      />

      <FileUploader />

      <Input
        className="h-[60px] mt-4 !text-[20px] placeholder:text-md"
        placeholder="Post title"
      />
    </Form>
  );
};

export default CreatePost;
