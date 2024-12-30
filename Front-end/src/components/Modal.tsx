import React, { useState } from "react";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import { BsCloudUploadFill } from "react-icons/bs";

interface IModal {
  open: boolean;
  handleClose: () => void;
  handleFileUpload?: (event: any) => void;
  handleImageConfirm: () => void;
}

const Modal = ({
  open,
  handleClose,
  handleFileUpload,
  handleImageConfirm,
}: IModal) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleCloseModel = () => {
    handleClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      alert("Please upload a valid image file.");
    }
    if (handleFileUpload) {
      handleFileUpload(event);
    }
  };
  const handlePostBtn = () => {
    if (imageUrl) handleImageConfirm();
  };
  const handleBrowseBtnClick = () => {
    document.getElementById("hiddenFileInput")?.click();
  };

  return (
    <Dialog open={open} fullScreen>
      <div className="flex justify-between bg-[#4287f5] h-14 p-4">
        <h2 className="text-slate-100 text-xl font-bold">Upload Image</h2>
        <IconButton
          aria-label="close"
          onClick={handleCloseModel}
          className="bg-slate-100"
        >
          <IoCloseCircle className="text-slate-100" />
        </IconButton>
      </div>
      <div
        className={`dialog-content h-full flex flex-col items-center p-10 ${
          !imageUrl ? "justify-center" : "justify-between"
        }`}
      >
        {!imageUrl && (
          <button
            onClick={handleBrowseBtnClick}
            className="border bg-[#4287f5] text-slate-100 font-bold rounded-md flex gap-x-2 items-center p-4"
          >
            <BsCloudUploadFill className="text-xl" />
            <span>Browse From Computer</span>
            <input
              type="file"
              accept="image/*"
              id="hiddenFileInput"
              onChange={handleImageUpload}
              className="hidden"
            />
          </button>
        )}
        {imageUrl && (
          <>
            <img src={imageUrl} width={1000} height={750} />

            <button
              onClick={handlePostBtn}
              className="bg-[#4287f5] self-end p-4 text-slate-100 w-[7rem] rounded-md"
            >
              Post
            </button>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;
