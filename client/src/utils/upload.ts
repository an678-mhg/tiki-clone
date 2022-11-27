import axios from "axios";
import { FilePreview } from "../components/Profile/Main/Information/FormInfomation";

export const uploadImg = async (file: FilePreview) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_UPLOAD_KEY as string
  );

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_CLOUDINARY as string,
      formData
    );
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
