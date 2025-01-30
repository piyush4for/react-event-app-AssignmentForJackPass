export const resizeMedia = async (file) => {
    // For videos, just return the file as is for now
    if (file.type.startsWith('video/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
  
    // For images, resize to 4:5
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      img.onload = () => {
        const aspectRatio = 4/5;
        let width = img.width;
        let height = width / aspectRatio;
        
        if (height > img.height) {
          height = img.height;
          width = height * aspectRatio;
        }
  
        canvas.width = width;
        canvas.height = height;
  
        // Center the image
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        ctx.drawImage(img, x, y, width, height);
  
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
  
      img.src = URL.createObjectURL(file);
    });
  };