// fetch.js

// Fungsi untuk mendapatkan data dari server
async function getData() {
  const url = "https://pemilihan-git-main-gigajdn.vercel.app/formatur";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Proses data yang diterima dari server
    console.log("Data from server:", data);

    // Misalnya, Anda ingin menampilkan data pada elemen dengan ID 'data-container'
    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = `<p>Data from server: ${JSON.stringify(data)}</p>`;
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("Error:", error);
  }
}

// Panggil fungsi getData() ketika halaman dimuat
document.addEventListener("DOMContentLoaded", getData);
