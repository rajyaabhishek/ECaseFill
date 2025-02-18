import React, { useState } from 'react';
import { storage, db ,auth} from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const userId = auth.currentUser.uid;
      const storageRef = ref(storage, `cases/${userId}/${file.name}`);
      
      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save file metadata to Firestore
      await setDoc(doc(db, 'cases', userId), {
        fileName: file.name,
        fileURL: downloadURL,
        uploadDate: new Date(),
        status: 'pending'
      });

      alert('File uploaded successfully!');
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Case Files</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
        />
        <button 
          type="submit"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload; 