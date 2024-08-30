import { useState, useEffect } from "react";

const useAudioBlob = (audioPath: string) => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  // console.log("audio path",audioPath)

  const fetchAudioBlob = async (link?:any) => {
    try {
      const response = await fetch(link );
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setBlob(blob);
        setBlobUrl(blobUrl);
      } else {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioPath) {
      fetchAudioBlob();
    }
  }, [audioPath]);

  return { blob, blobUrl, loading, error };
};

export default useAudioBlob;
