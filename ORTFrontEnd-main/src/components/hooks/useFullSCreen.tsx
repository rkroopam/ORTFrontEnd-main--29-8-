import { useCallback, useState } from 'react';

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [errorF, setError] = useState<string | null>(null);

  const enterFullScreen = useCallback(() => {
    const elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
      setError(null);
    } catch (err) {
      setError('Failed to enter full-screen mode. Please try again.');
    }
  }, []);

  const exitFullScreen = useCallback(() => {
    const doc = document as Document & {
      mozCancelFullScreen?: () => Promise<void>;
      webkitExitFullscreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
    };

    try {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { // Firefox
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { // Chrome, Safari and Opera
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { // IE/Edge
        doc.msExitFullscreen();
      }
      setIsFullScreen(false);
      setError(null);
    } catch (err) {
      setError('Failed to exit full-screen mode. Please try again.');
    }
  }, []);

  return { isFullScreen, enterFullScreen, exitFullScreen, errorF };
};

export default useFullScreen;
