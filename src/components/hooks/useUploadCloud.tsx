import axios from "axios";
import { useState } from "react";

interface Props {
  onUploadCompleted: (fileUrl: string) => void;
  onUploading?: (uploadProgress: number) => void;
}

const uploadFile = async (
  file: File,
  onUploadProgress: (uploadProgress: number) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("/api/upload", formData, {
    onUploadProgress(ProgressEvent: ProgressEventInit) {
      const t = Math.round(
        (ProgressEvent.loaded! * 100) / ProgressEvent.total!
      );
      onUploadProgress(t);
    },
  });

  return res.data;
};

/////////////////////////////////////////////////

export default function useUploadCloud({
  onUploadCompleted,
  onUploading,
}: Props) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const startUpload = async (files: File[]) => {
    const [file] = files;
    setIsUploading(true);
    const r = await uploadFile(file, onUploading!);

    if (r) {
      onUploadCompleted(r.configId);
    }
    setIsUploading(false);
  };

  return {
    startUpload,
    isUploading,
  };
}
