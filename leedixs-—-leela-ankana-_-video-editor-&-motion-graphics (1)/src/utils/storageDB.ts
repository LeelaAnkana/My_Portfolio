/**
 * Persistent IndexedDB storage for local user-uploaded videos and profile photo.
 * Avoids localStorage 5MB quota limits and allows storing full video Blobs directly.
 */

const DB_NAME = 'LeedixsPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_blobs';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveMediaBlob(key: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(blob, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getMediaBlob(key: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteMediaBlob(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Generates a video thumbnail and duration from a File/Blob using an off-screen HTML5 video and canvas.
 */
export function extractVideoMeta(file: File | Blob): Promise<{ thumbnail: string; duration: string; rawDuration: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    video.muted = true;
    video.playsInline = true;

    // Timeout fallback after 4s
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve({
        thumbnail: '',
        duration: '0:30',
        rawDuration: 30,
      });
    }, 5000);

    video.onloadedmetadata = () => {
      // Seek to 0.5s or 20% of duration to get a good representative frame
      const seekTime = Math.min(1.0, video.duration / 2);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.82);
          
          const rawSecs = Math.floor(video.duration || 0);
          const mins = Math.floor(rawSecs / 60);
          const secs = rawSecs % 60;
          const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

          URL.revokeObjectURL(url);
          resolve({
            thumbnail,
            duration: formattedDuration,
            rawDuration: rawSecs,
          });
          return;
        }
      } catch (e) {
        console.warn('Canvas thumbnail capture warning', e);
      }

      URL.revokeObjectURL(url);
      resolve({
        thumbnail: '',
        duration: '0:30',
        rawDuration: 30,
      });
    };

    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
      resolve({
        thumbnail: '',
        duration: '0:30',
        rawDuration: 30,
      });
    };
  });
}
