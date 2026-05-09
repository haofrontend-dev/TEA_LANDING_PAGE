export const loadSequenceImages = async (folderPath, frameCount) => {
  const promises = [];

  for (let i = 1; i <= frameCount; i++) {
    const frameNumber = String(i).padStart(4, '0');
    // ezgif names: 0001.jpg, 0002.jpg or frame_001.jpg
    const src = `${folderPath}/${frameNumber}.jpg`;
    
    promises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ img, index: i });
        img.onerror = () => {
          // Try alternative naming pattern `frame_001.jpg`
          const fallbackSrc = `${folderPath}/frame_${String(i).padStart(3, '0')}.jpg`;
          const img2 = new Image();
          img2.onload = () => resolve({ img: img2, index: i });
          img2.onerror = () => {
            // Try `ezgif-frame-001.jpg` pattern
            const fallbackSrc2 = `${folderPath}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
            const img3 = new Image();
            img3.onload = () => resolve({ img: img3, index: i });
            img3.onerror = () => {
              // If all fail, create a synthetic frame (mock)
              const canvas = document.createElement('canvas');
              canvas.width = 1920;
              canvas.height = 1080;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#1a1410'; 
              ctx.fillRect(0, 0, 1920, 1080);
              
              // Add a luxury grid pattern
              ctx.strokeStyle = '#c8874a22';
              ctx.lineWidth = 1;
              for(let x = 0; x < 1920; x += 100) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1080); ctx.stroke();
              }
              for(let y = 0; y < 1080; y += 100) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1920, y); ctx.stroke();
              }

              ctx.fillStyle = '#c8874a';
              ctx.font = 'bold 80px "Cormorant Garamond"';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(`${folderPath} - FRAME ${i}`, 960, 500);
              
              const mockImg = new Image();
              mockImg.onload = () => resolve({ img: mockImg, index: i });
              mockImg.src = canvas.toDataURL('image/jpeg');
            };
            img3.src = fallbackSrc2;
          };
          img2.src = fallbackSrc;
        };
        img.src = src;
      })
    );
  }

  const loadedResults = await Promise.all(promises);
  loadedResults.sort((a, b) => a.index - b.index);
  return loadedResults.map(res => res.img);
};
