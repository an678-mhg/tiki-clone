import { AxiosError } from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setUser } from "../../../../redux/slices/AuthSlice";
import { editUserInfo } from "../../../../services/user";
import { uploadImg } from "../../../../utils/upload";
import LoadingButton from "../../../LoadingButton";

const radioData = ["Nam", "Nữ", "Khác"];

export interface FilePreview extends File {
  preview: string;
}

const FormInfomation = () => {
  const [avatar, setAvatar] = useState<FilePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user?.email);
      setValue("gender", user.gender);
      setValue("phone", user.phone);
    }
  }, [user]);

  const submitForm = async (values: any) => {
    if (
      user?.username === values.username &&
      user?.email === values.email &&
      user?.phone === values.phone &&
      user?.gender === values.gender &&
      avatar === null
    ) {
      return;
    }

    setLoading(true);
    try {
      let imageUrl;
      if (avatar) {
        imageUrl = await uploadImg(avatar);
      }
      const response = await editUserInfo({ ...values, avatar: imageUrl });
      if (response.success) {
        dispatch(setUser(imageUrl ? { ...values, avatar: imageUrl } : values));
        toast.success("Cập nhật thành công!");
        setAvatar(null);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
    setLoading(false);
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0] as FilePreview;

    if (!file) return;

    if (!file.type.startsWith("image")) {
      return toast.error("Chỉ chấp nhận file hình ảnh!");
    }

    if (file.size / 1000000 > 1) {
      return toast.error("File của bạn không được vượt quá 1MB!");
    }

    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  useEffect(() => {
    return () => {
      avatar?.preview && URL.revokeObjectURL(avatar?.preview);
    };
  }, [avatar?.preview]);

  return (
    <div className="flex">
      <div className="px-5 pb-2 flex-1 mr-[50px] overflow-hidden">
        <div className="mt-[30px]">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="text-sm text-gray-500 w-full mb-[30px]">
              <label className="inline-block text-right mb-3">
                Tên người dùng
              </label>
              <div>
                <input
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Trường này là bắt buộc!",
                    },
                  })}
                  className="text-black border border-gray-200 py-2 px-4 w-full"
                />
                {errors && errors?.username && (
                  <span className="mt-1 inline-block text-red-500 text-sm font-normal">
                    {errors?.username?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 w-full mb-[30px]">
              <label className="inline-block mb-3">Email</label>
              <div>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Trường này là bắt buộc!",
                    },
                  })}
                  className="text-black border border-gray-200 py-2 px-4 w-full"
                />
                {errors && errors?.email && (
                  <span className="mt-1 inline-block text-red-500 text-sm font-normal">
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 w-full mb-[30px]">
              <label className="inline-block mb-3">Số điện thoại</label>
              <div>
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Trường này là bắt buộc!",
                    },
                  })}
                  className="text-black border border-gray-200 py-2 px-4 w-full"
                />
                {errors && errors?.phone && (
                  <span className="mt-1 inline-block text-red-500 text-sm font-normal">
                    {errors?.phone?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500 w-full mb-[30px]">
              <label className="inline-block mb-3">Giới tính</label>
              <div className="flex justify-start">
                {radioData.map((item) => (
                  <div key={item} className="flex items-center mr-4">
                    <input
                      {...register("gender", {
                        required: {
                          value: true,
                          message: "Trường này là bắt buộc!",
                        },
                      })}
                      id={item}
                      value={item}
                      type="radio"
                      className="border border-gray-200 py-2 px-4 w-full"
                    />
                    <label
                      htmlFor={item}
                      className="text-black inline-block ml-2"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              {errors && errors?.gender && (
                <span className="mt-1 inline-block text-red-500 text-sm font-normal">
                  {errors?.gender?.message}
                </span>
              )}
            </div>
            <div>
              <LoadingButton
                loading={loading}
                className="bg-blue-500 text-white px-6 text-sm py-2 w-full"
              >
                Lưu
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[281px] border-l border-gray-200 mt-[30px]">
        <div className="flex items-center justify-center flex-col">
          <div className="w-[100px] h-[100px] my-[18px]">
            <LazyLoadImage
              effect="opacity"
              src={avatar?.preview || user?.avatar}
              className="rounded-full"
            />
          </div>
          <button className="text-sm font-normal border border-gray-200">
            <input
              onChange={handleChangeAvatar}
              type="file"
              hidden
              id="avatar"
            />
            <label className="block w-full h-full px-6 py-2" htmlFor="avatar">
              {" "}
              Chọn ảnh
            </label>
          </button>
          <p className="text-sm text-gray-500 mt-[18px]">
            Dụng lượng file tối đa 1 MB
            <span className="block">Định dạng:.JPEG, .PNG</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormInfomation;
