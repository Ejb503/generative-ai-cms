import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import "@/app/globals.css";

let Quill = null;
if (typeof window !== "undefined") {
  Quill = require("quill").default;
}

type QuillInstance = typeof Quill | null;

export const useQuill = (
  selector: string,
  options: any,
  setContentChanged: React.Dispatch<React.SetStateAction<boolean>>
): QuillInstance => {
  const [quill, setQuillInstance] = useState<QuillInstance>(null);

  useEffect(() => {
    if (Quill !== null) {
      const quillInstance = new Quill(selector, options);
      quillInstance.on("text-change", () => setContentChanged(true));
      setQuillInstance(quillInstance);
    }
  }, [selector, options]);

  return quill;
};
