import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { defaultBackend } from '@/api/api';

interface DrawingProps {
  imageSrc: string;
  onClose: () => void;
}

const DrawingComponent: React.FC<DrawingProps> = ({ imageSrc, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawnImage, setDrawnImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<File | null>(null);

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
    const fileName = "drawn_image.png";
    const file = blobToFile(blob, fileName);
    setEditedImage(file);
  };

  useEffect(() => {
    if (editedImage) {
      console.log("Edited image:", editedImage);
    }
  }, [editedImage]);

  async function onClickUpload() {
    try {
      saveImage();
      const formData = new FormData();
      if (editedImage) {
        formData.append("files", editedImage);
        console.log("Form data:", formData.get("files"));
        await axios.post(`${defaultBackend}image/test`, formData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
    img.setAttribute('crossorigin', 'anonymous');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      context.lineCap = 'round';
      context.lineWidth = 5;
      context.strokeStyle = 'black';

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      saveImage();
    });
    canvas.addEventListener('mouseout', () => {
      isDrawing = false;
      saveImage();
    });

    const saveImage = () => {
      setDrawnImage(canvas.toDataURL());
    };

    return () => {
      canvas.removeEventListener('mousedown', () => { });
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', () => { });
      canvas.removeEventListener('mouseout', () => { });
    };
  }, [imageSrc]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={onClose}>Close</button>
      {drawnImage && <img src={drawnImage} alt="Drawn Image" />}
      <button onClick={onClickUpload}>Upload</button>
    </div>
  );
};

export default DrawingComponent;