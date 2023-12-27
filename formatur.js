document.addEventListener("DOMContentLoaded", function () {  
  let totalVotes = 0;

  async function fetchData() {
    try {
      const response = await fetch("https://pemilihan-git-main-gigajdn.vercel.app/formatur");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);  // Ubah log agar mencetak data yang diterima
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function createCardElement(data) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-duration", "2000");

    const img = document.createElement("img");
    img.src = "https://drive.google.com/uc?export=view&id=" + data.foto;
    img.alt = "foto";
    img.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "shadow");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = data.nama;

    const text = document.createElement("p");
    text.classList.add("card-text");
    text.textContent = data.angkatan;

    const pilihButton = document.createElement("button");
    pilihButton.classList.add("btn");
    pilihButton.textContent = "Pilih";
    pilihButton.addEventListener("click", function () {
      pilih(data._id);
    });
    pilihButton.id = `pilihButton-${data._id}`;

    const batalkanButton = document.createElement("button");
    batalkanButton.classList.add("btn-batalkan");
    batalkanButton.textContent = "Batalkan";
    batalkanButton.addEventListener("click", function () {
      batalkan(data._id);
    });
    batalkanButton.id = `batalkanButton-${data._id}`;

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(pilihButton);
    cardBody.appendChild(batalkanButton);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }

  async function renderCards() {
    const cardContainer = document.querySelector(".list-article");

    if (!cardContainer) {
      console.error("Element with class 'list-article' not found.");
      return;
    }

    // Mengosongkan elemen cardContainer sebelum menambahkan kartu-kartu baru
    cardContainer.innerHTML = "";

    const data = await fetchData();
    data.forEach((item) => {
      const card = createCardElement(item);
      cardContainer.appendChild(card);
    });
  }

  function pilih(id) {
    const nim = JSON.parse(localStorage.getItem("nim"));    
    if (totalVotes < 13) {
      // Pemeriksaan jumlah pemilihan maksimal
      console.log("Pilih kandidat dengan ID:", id);
      console.log("NIM yang memilih:", nim);
      totalVotes+=1;
      // Kirim data ke backend
      fetch("https://pemilihan-git-main-gigajdn.vercel.app/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, _id: id }),
      })
        .then((response) => {
          
          console.log("Total Votes:", totalVotes);
          // Menampilkan tombol "Batalkan" setelah memilih
          document.getElementById("batalkanButton-" + id).style.display =
            "inline-block";
          // Menyembunyikan tombol "Pilih" setelah memilih
          document.getElementById("pilihButton-" + id).style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Anda telah mencapai batas maksimal pemilihan (13 kali).");
    }
  }
  

    function batalkan(id) {
        const nim = JSON.parse(localStorage.getItem('nim'));
        // Cek apakah totalVotes sudah mencapai 13
        if (totalVotes === 13) {
            // Tampilkan pesan peringatan
            alert("Anda sudah mencapai batas maksimal pemilihan (13 votes). Tidak dapat membatalkan pilihan lebih lanjut.");
            return; // Hentikan fungsi jika sudah mencapai batas
        }
        console.log("Batalkan pilihan kandidat dengan ID:", id);
        console.log("NIM yang memilih:", nim);
        totalVotes-=1;

        // Send data to the backend
        fetch("https://pemilihan-git-main-gigajdn.vercel.app/delVote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  nim, 
                                _id: id }),
        })
        .then((response) => {            
            // Menampilkan tombol "Pilih" setelah membatalkan
            document.getElementById('pilihButton-' + id).style.display = 'inline-block';
            // Menyembunyikan tombol "Batalkan" setelah membatalkan
            document.getElementById('batalkanButton-' + id).style.display = 'none';
        })

        .catch((error) => {
            console.error("Error:", error);
        }); 
    }
  

  renderCards();
});
