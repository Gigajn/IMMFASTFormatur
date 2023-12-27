// Fungsi untuk menangani logika pemilihan
    function pilih(cardNumber) {
      // Menampilkan tombol "Batalkan" setelah memilih
      document.getElementById('btn-batalkan-' + cardNumber).style.display = 'inline-block';
      // Menyembunyikan tombol "Pilih" setelah memilih
      document.getElementById('btn-pilih-' + cardNumber).style.display = 'none';
    }

    // Fungsi untuk menangani logika pembatalan
    function batalkan(cardNumber) {
      // Menampilkan tombol "Pilih" setelah membatalkan
      document.getElementById('btn-pilih-' + cardNumber).style.display = 'inline-block';
      // Menyembunyikan tombol "Batalkan" setelah membatalkan
      document.getElementById('btn-batalkan-' + cardNumber).style.display = 'none';
    }