import axios from "axios";
import { useState } from "react";

interface Props {
  onUploadCompleted: (fileUrl: string) => void;
  onUploading?: (uploadProgress: number) => void;
}

const uploadFile = async (
  file: File,
  onUploadProgress?: (uploadProgress: number) => void,
  configId?: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  configId && formData.append("configId", configId);

  try {
    const res = await axios.post("/api/upload", formData, {
      onUploadProgress(ProgressEvent: ProgressEventInit) {
        const t = Math.round(
          (ProgressEvent.loaded! * 100) / ProgressEvent.total!
        );
        onUploadProgress && onUploadProgress(t);
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////////////////

export default function useUploadCloud({
  onUploadCompleted,
  onUploading,
}: Props) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const startUpload = async (files: File[], configId?: string) => {
    const [file] = files;
    setIsUploading(true);
    const r = await uploadFile(file, onUploading, configId);

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
