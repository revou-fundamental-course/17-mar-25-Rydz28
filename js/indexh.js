// File: indexh.js
// Deskripsi: Script untuk menghitung luas dan keliling persegi dengan visualisasi dan efek animasi
document.addEventListener('DOMContentLoaded', function() {

    // Elemen form dan input
    const squareForm = document.getElementById('squareForm');
    const sideLengthInput = document.getElementById('sideLength');
    const errorMessage = document.getElementById('error-message');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultsContainer = document.getElementById('results');
    const areaResult = document.getElementById('area-result');
    const perimeterResult = document.getElementById('perimeter-result');
    
    // Elemen visualisasi persegi
    const squareVisual = document.getElementById('square-visual');
    const dimensionLabel = document.getElementById('dimension-label');
    
    // Mengelola validasi input realtime
    sideLengthInput.addEventListener('input', function() {
        validateInput();
    });
    
    // Fungsi validasi input
    function validateInput() {
        const inputWrapper = sideLengthInput.closest('.input-wrapper');
        const value = sideLengthInput.value.trim();
        
        // Reset state validasi
        inputWrapper.classList.remove('valid', 'invalid');
        errorMessage.textContent = '';
        
        // Validasi input kosong
        if (value === '') {
            return;
        }
        
        // Validasi hanya angka positif
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            inputWrapper.classList.add('invalid');
            errorMessage.textContent = 'Masukkan angka positif lebih dari 0';
            return false;
        }
        
        // Input valid
        inputWrapper.classList.add('valid');
        return true;
    }
    
    // Mengelola submit form
    squareForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi sebelum perhitungan
        if (!validateInput()) {
            return;
        }
        
        // Animasi loading
        calculateBtn.classList.add('loading');
        
        // Simulasi waktu perhitungan
        setTimeout(() => {
            calculateResults();
            calculateBtn.classList.remove('loading');
        }, 800);
    });
    
    // Fungsi untuk menghitung hasil
    function calculateResults() {
        const sideLength = parseFloat(sideLengthInput.value);
        
        // Hitung luas dan keliling
        const area = sideLength * sideLength;
        const perimeter = 4 * sideLength;
        
        // Tampilkan hasil dengan animasi typing
        showResults(area, perimeter);
        
        // Visualisasikan persegi
        updateSquareVisualization(sideLength);
    }
    
    // Fungsi untuk menampilkan hasil dengan animasi
    function showResults(area, perimeter) {
        // Tampilkan hasil dengan animasi
        resultsContainer.classList.add('visible');
        
        // Animasi hasil dengan efek typing
        animateValue(areaResult, area.toFixed(2) + ' cm²');
        setTimeout(() => {
            animateValue(perimeterResult, perimeter.toFixed(2) + ' cm');
        }, 300);
    }
    
    // Fungsi untuk animasi typing efek pada hasil
    function animateValue(element, value) {
        let i = 0;
        element.textContent = '';
        
        const typing = setInterval(() => {
            element.textContent += value[i];
            i++;
            if (i >= value.length) {
                clearInterval(typing);
            }
        }, 50);
    }
    
    // Fungsi untuk memperbarui visualisasi persegi
    function updateSquareVisualization(sideLength) {
        // Ukuran maksimum visualisasi dalam pixel
        const maxSize = 120;
        
        // Menentukan ukuran visualisasi yang sesuai
        // Menggunakan skala logaritmik untuk menampilkan persegi dengan ukuran wajar
        let visualSize = Math.min(maxSize, 20 * Math.log10(sideLength * 10));
        
        // Memastikan visualisasi tidak terlalu kecil
        visualSize = Math.max(30, visualSize);
        
        // Reset animasi dengan menghapus dan menambahkan kembali class visible
        squareVisual.classList.remove('visible');
        
        setTimeout(() => {
            // Perbarui ukuran persegi
            squareVisual.style.width = `${visualSize}px`;
            squareVisual.style.height = `${visualSize}px`;
            
            // Tampilkan label ukuran
            dimensionLabel.textContent = `${sideLength} cm`;
            
            // Animasikan perubahan
            squareVisual.classList.add('visible');
            
            // Tambahkan efek skala saat persegi ditampilkan
            squareVisual.animate([
                { transform: 'scale(0.5)', opacity: 0.5 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fill: 'forwards'
            });
        }, 100);
    }
    
    // Fungsi untuk reset kalkulator
    function resetCalculator() {
        // Reset input dan status validasi
        sideLengthInput.value = '';
        sideLengthInput.closest('.input-wrapper').classList.remove('valid', 'invalid');
        errorMessage.textContent = '';
        
        // Sembunyikan hasil
        resultsContainer.classList.remove('visible');
        setTimeout(() => {
            areaResult.textContent = '-';
            perimeterResult.textContent = '-';
        }, 500);
        
        // Reset visualisasi persegi
        squareVisual.classList.remove('visible');
        setTimeout(() => {
            squareVisual.style.width = '0';
            squareVisual.style.height = '0';
            dimensionLabel.textContent = '0 cm';
        }, 300);
        
        // Tambahkan efek animasi pada tombol reset
        resetBtn.classList.add('animated');
        setTimeout(() => {
            resetBtn.classList.remove('animated');
        }, 500);
        
        // Fokus pada input sisi
        setTimeout(() => {
            sideLengthInput.focus();
        }, 100);
    }
    
    // Event listener untuk tombol reset
    resetBtn.addEventListener('click', resetCalculator);
});
