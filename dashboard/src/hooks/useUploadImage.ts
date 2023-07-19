import { helebbaApi } from "@/api";
import { useEffect, useState } from "react";

export const useUploadImage = () => {
  const [urls, setUrls] = useState<string[]>([]);

  const uploadImage = async (image: any) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await helebbaApi.post("/upload/image", formData);
      const newUrls: string[] = [...urls, data.url];
      setUrls(newUrls);
      localStorage.setItem("products-images", JSON.stringify(newUrls));
    } catch (error) {}
  };

  useEffect(() => {
    const storedImages = JSON.parse(
      localStorage.getItem("products-images") as string
    );
    if (storedImages) {
      setUrls([...storedImages]);
    }
  }, [urls]);

  return {
    uploadImage,
    urls,
    setUrls,
  };
};
