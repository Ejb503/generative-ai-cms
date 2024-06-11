import { useState, useEffect } from "react";
import Layout from "@/app/components/layout";
import { CREATE_CONTENT_API, SCAN_CONTENT_API } from "@/app/const/api";
import Link from "next/link";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");

  const fetchFolders = async () => {
    const response = await fetch(SCAN_CONTENT_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const folders = await response.json();
    setFolders(folders);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createFolder = async () => {
    await fetch(CREATE_CONTENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName }),
    });
    setFolderName("");
    await fetchFolders();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Content</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Load content</h2>
        <ul className="list-disc pl-5">
          {folders.map((folder) => (
            <li key={folder} className="mb-2">
              <Link
                href={`/edit/${folder}`}
                className="text-blue-500 hover:underline"
              >
                {folder}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">New Content</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        />
        <button
          onClick={createFolder}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Folder
        </button>
      </div>
    </Layout>
  );
}
