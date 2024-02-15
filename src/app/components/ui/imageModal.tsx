import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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
  onSave: (file: File) => void;
  editable: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  images = [],
  currentIndex,
  onPrev,
  onNext,
  onSave,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawnImage, setDrawnImage] = useState<string | null>(null);
  const [drawnImageEdited, setDrawnImageEdited] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const dataURLToBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const blobToFile = (blob: Blob, fileName: string): File => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const saveImage = () => {
    const canvas = canvasRef.current!;
    const imageDataURL = canvas.toDataURL();
    const blob = dataURLToBlob(imageDataURL);
    const fileName = `${images?.[currentIndex]?.id_image}Edited.png`;
    const file = blobToFile(blob, fileName);
    setDrawnImageEdited(file);
    onSave(file);
  };
  useEffect(() => {
    if (drawnImageEdited !== null && isSaving) {
      setIsSaving(false);
    }
  }, [drawnImageEdited, isSaving]);

  const handleSave = () => {
    setIsSaving(true);
    saveImage();
    handleBackdropClick();
  };
  useEffect(() => {
    if (canvasRef.current && isEditing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        };
        img.src = drawnImage ?? "";
        img.setAttribute("crossorigin", "anonymous");
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const draw = (e: MouseEvent) => {
          if (!isDrawing) return;

          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          const x = (e.clientX - rect.left) * scaleX;
          const y = (e.clientY - rect.top) * scaleY;

          context.lineCap = "round";
          const referenceCanvasWidth = 800;
          const inkSize = 5 * (canvas.width / referenceCanvasWidth);
          context.strokeStyle = "black";
          context.lineWidth = inkSize;

          context.beginPath();
          context.moveTo(lastX, lastY);
          context.lineTo(x, y);
          context.stroke();

          [lastX, lastY] = [x, y];
        };

        const startDrawing = (e: MouseEvent) => {
          isDrawing = true;
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          lastX = (e.clientX - rect.left) * scaleX;
          lastY = (e.clientY - rect.top) * scaleY;
        };

        const stopDrawing = () => {
          isDrawing = false;
          saveImage();
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);

        const saveImage = () => {
          setDrawnImage(canvas.toDataURL());
        };

        return () => {
          canvas.removeEventListener("mousedown", startDrawing);
          canvas.removeEventListener("mousemove", draw);
          canvas.removeEventListener("mouseup", stopDrawing);
          canvas.removeEventListener("mouseout", stopDrawing);
        };
      }
    }
  }, [drawnImage, isEditing]);

  const handleEditClick = () => {
    setDrawnImage(images?.[currentIndex]?.image_path);
    setIsEditing(true);
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(false);
    onClose();
  };

  const handleBackdropClick = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={handleBackdropClick}>
      <div>
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="bg-black bg-opacity-50 fixed inset-0"
            onClick={handleBackdropClick}
          ></div>
          <div className="relative max-w-full max-h-full">
            {isEditing ? (
              <div className="relative">
                {drawnImage && (
                  <img
                    src={drawnImage}
                    alt={`Image ${currentIndex + 1}`}
                    width={800}
                    height={600}
                  />
                )}
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ zIndex: 1 }}
                />
              </div>
            ) : (
              <img
                src={images?.[currentIndex]?.image_path}
                alt={`Image ${currentIndex + 1}`}
                width={800}
                height={600}
              />
            )}
          </div>
        </div>
        <div className="absolute z-50 w-full flex flex-row justify-between">
          <button
            className="mt-10 ml-10 text-white hover:bg-opacity-50 hover:bg-slate-200 hover:rounded-3xl"
            onClick={handleCloseButtonClick}
          >
            <div className="p-1">
              <Close />
            </div>
          </button>
          {editable ? (
            <div>
              {!isEditing ? (
                <button
                  className="mt-10 mr-10 text-white hover:bg-opacity-50 hover:bg-slate-200 hover:rounded-3xl"
                  onClick={handleEditClick}
                >
                  <div className="p-1">
                    <EditIcon />
                  </div>
                </button>
              ) : (
                <button
                  className="mt-10 mr-10 text-white hover:bg-opacity-50 hover:bg-slate-200 hover:rounded-3xl"
                  onClick={handleSave}
                >
                  <div className="p-1">
                    <SaveIcon />
                  </div>
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {!isEditing && (
          <div className="absolute w-full flex justify-between place-items-center h-full text-primaryBg ">
            <div className="bg-white rounded-3xl z-50 ml-10">
              <button onClick={onPrev} className="p-2">
                <ArrowBack />
              </button>
            </div>
            <div className="bg-white rounded-3xl z-50 mr-10">
              <button onClick={onNext} className="p-2">
                <ArrowForward />
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
