export const setCookie  =  (name: string, value: string, minutes: number) => {
  const date = new Date();
  const expirationDate = new Date(date.getTime() + minutes * 60000); // Add minutes to current time

  // Set the cookie
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;

  // Store creation and expiration times in local storage
  localStorage.setItem(`${name}_created`, date.toISOString());
  localStorage.setItem(`${name}_expires`, expirationDate.toISOString());
};

export const getCookieWithDetails = (name: string): {
  value: string | undefined,
  createdAt: Date | undefined,
  expiresAt: Date | undefined
} => {
  const cookieNameEQ = `${name}=`;
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.indexOf(cookieNameEQ) === 0) {
      const value = cookie.substring(cookieNameEQ.length);
      const createdAtStr = localStorage.getItem(`${name}_created`);
      const expiresAtStr = localStorage.getItem(`${name}_expires`);
      const createdAt = createdAtStr ? new Date(createdAtStr) : undefined;
      const expiresAt = expiresAtStr ? new Date(expiresAtStr) : undefined;

      return { value, createdAt, expiresAt };
    }
  }

  return { value: undefined, createdAt: undefined, expiresAt: undefined };
};


  export const calculateElapsedTimeInHHMM = (): string => {
    const { createdAt } = getCookieWithDetails('username');
  
    if (!createdAt) {
      return 'Creation time not available';
    }
  
    const now = new Date();
    console.log("Created At:", createdAt);
    console.log("Current Time:", now);
  
    const elapsedMs = now.getTime() - createdAt.getTime();
    console.log("Elapsed Time in ms:", elapsedMs);
  
    if (elapsedMs < 0) {
      return 'Creation time is in the future';
    }
  
    const totalMinutes = Math.floor(elapsedMs / 60000); // Convert ms to total minutes
    const hours = Math.floor(totalMinutes / 60); // Convert total minutes to hours
    const minutes = totalMinutes % 60; // Remaining minutes after hours
  
    // Format hours and minutes to ensure two-digit format
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  };
  


  export  const handlePlayAudio = (text:any, audioEnded:any) => {
    

    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      console.log("Hello------------------------")
      speech.onend = function(event) {
        console.log('Speech has finished.');
        audioEnded(true);
       
        // You can perform any action here after the speech ends
    };
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
  
    }
  };