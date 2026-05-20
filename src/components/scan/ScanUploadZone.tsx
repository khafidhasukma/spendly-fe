import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface ScanUploadZoneProps {
  onFileSelect: (file: File) => void;
}

const ScanUploadZone = ({ onFileSelect }: ScanUploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex h-full cursor-pointer flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed p-10 transition-colors sm:p-14 lg:p-16 ${
        dragOver
          ? 'border-primary bg-primary/5'
          : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-primary/5'
      }`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Upload className="h-7 w-7 text-primary" />
      </div>

      <p className="mt-5 text-base font-semibold text-foreground">Upload your receipt</p>
      <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
        Drag and drop your receipt image here, or click to browse. Supported formats: JPG, PNG, HEIC, WEBP.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default ScanUploadZone;
