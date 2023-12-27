document.addEventListener("DOMContentLoaded", function () {
    const voteButton = document.getElementById("voteButton");
    const modal = document.getElementById("myModal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");
    const batalButton = document.getElementById("batalButton");
    const yakinButton = document.getElementById("yakinButton");

    voteButton.addEventListener("click", function () {
        // Example: Replace this with your logic for checking the number of votes
        const numberOfVotes = 13;

        if (numberOfVotes < 13) {
            modalContent.innerHTML = "Anda belum memilih 13 formatur. Silakan pilih lebih banyak.";
        } else {
            modalContent.innerHTML = "Apakah Anda yakin telah memilih dengan benar?";
            batalButton.style.display = "inline-block";
            yakinButton.style.display = "inline-block";
        }

        modal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    batalButton.addEventListener("click", function () {
        modalContent.innerHTML = "Pemilihan formatur dibatalkan.";
        batalButton.style.display = "none";
        yakinButton.style.display = "none";
    });

    yakinButton.addEventListener("click", function () {
        modalContent.innerHTML = "Terima kasih! Anda telah berpartisipasi dalam memilih formatur PK IMM FAST Periode 2024/2025.";
        batalButton.style.display = "none";
        yakinButton.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
