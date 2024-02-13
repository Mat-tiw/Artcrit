import React from "react";
import { Modal, IconButton} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  images?: {
    id_image: number;
    image_path: string;
  }[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  images = [],
  currentIndex,
  onPrev,
  onNext,
}) => {
  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();

  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
      >
        <div className="">
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="bg-black bg-opacity-50 fixed inset-0"
            onClick={onClose}
          ></div>
          <div className="relative max-w-full max-h-full">
            <Image
              src={images?.[currentIndex]?.image_path}
              width={800}
              height={600}
              alt={`Image ${currentIndex + 1}`}
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-between">
              <IconButton onClick={onPrev}>
                <ArrowBack />
              </IconButton>
              <IconButton onClick={onNext}>
                <ArrowForward />
              </IconButton>
            </div>
          </div>
        </div>
      <button
        className="absolute z-50 mt-10 ml-10 text-white hover:bg-opacity-50 hover:bg-slate-200 hover:rounded-3xl"
        onClick={handleCloseButtonClick}
      >
        <div className="p-1">
        <CloseIcon />
        </div>
      </button>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
