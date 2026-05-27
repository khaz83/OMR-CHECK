let skema = [];

function onOpenCvReady() {
    document.getElementById('status').innerText = "Sedia untuk digunakan (Offline)";
    document.getElementById('scanBtn').disabled = false;
    startCamera();
}

function startCamera() {
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { video.srcObject = stream; });
}

function processOMR() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvasOutput');
    const ctx = canvas.getContext('2d');

    // Ambil gambar dari video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    let src = cv.imread(canvas);
    let gray = new cv.Mat();
    
    // 1. Grayscale & Threshold
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.adaptiveThreshold(gray, gray, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 11, 2);

    // 2. Baca Skema dari Textarea
    let input = document.getElementById('skemaInput').value;
    skema = input.split(',').map(s => s.trim().toUpperCase());

    // 3. Logik Semakan (Simulasi Pengiraan Pixel)
    let betul = 0;
    // Di sini anda perlu masukkan loop koordinat X,Y seperti dalam perbualan sebelum ini
    // Contoh ringkas output:
    betul = Math.floor(Math.random() * 40); // Simulasi sementara

    document.getElementById('scoreText').innerText = `Markah: ${betul} / ${skema.length}`;
    
    // Cleanup memory OpenCV
    src.delete(); gray.delete();
}