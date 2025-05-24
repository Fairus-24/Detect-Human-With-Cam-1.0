# Detect Human With Cam 1.0

**JavaScript/TypeScript Face Detection & Recognition API berbasis TensorFlow.js untuk browser dan Node.js.**

## Fitur

- **Deteksi Wajah** dengan berbagai model pre-trained
- **Pengenalan Wajah**
- **Deteksi Landmark Wajah (68 titik)**
- **Deteksi Ekspresi Wajah**
- **Estimasi Usia & Gender**
- **Dukungan penuh untuk Browser & Node.js**

## Preview

<img src="https://user-images.githubusercontent.com/31125521/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif" alt="faceapi preview" width="400"/>

## Komposisi Bahasa

- TypeScript: 78.8%
- HTML: 16.8%
- JavaScript: 4.1%
- CSS: 0.3%

## Cara Menjalankan

### Browser

1. Clone repo ini:
   ```bash
   git clone https://github.com/Fairus-24/Detect-Human-With-Cam-1.0.git
   ```
2. Masuk ke direktori contoh browser:
   ```bash
   cd face\ api.js/examples/examples-browser
   npm install
   npm start
   ```
3. Akses di http://localhost:3000/

### Node.js

1. Masuk ke direktori contoh nodejs:
   ```bash
   cd face\ api.js/examples/examples-nodejs
   npm install
   ```
2. Jalankan contoh:
   ```bash
   ts-node faceDetection.ts
   ```
   atau
   ```bash
   tsc faceDetection.ts
   node faceDetection.js
   ```

## Contoh Penggunaan API

```javascript
// Load semua model FaceAPI
await Promise.all([
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]);
```

## Dokumentasi

- Library utama yang digunakan: [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- Untuk detail penggunaan dan contoh kode lain, cek file `face api.js/README.md` pada repo ini.

## Informasi Repo

- **Owner:** [Fairus-24](https://github.com/Fairus-24)
- **Public** (terbuka untuk umum)
- **Default Branch:** `main`
- **Dibuat:** 18 November 2024
- **Diperbarui terakhir:** 19 November 2024

## License

Saat ini, repository belum memiliki file lisensi. Silakan tambahkan jika diperlukan.
