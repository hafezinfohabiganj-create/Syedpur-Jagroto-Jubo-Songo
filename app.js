// ===============================
// Syedpur Jagroto Jubo Songo
// Firebase + Website
// ===============================

// Firebase SDK লোড
function loadFirebase() {
  return new Promise((resolve, reject) => {
    if (window.firebase) {
      resolve();
      return;
    }

    const scripts = [
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
    ];

    let loaded = 0;

    scripts.forEach(src => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        loaded++;
        if (loaded === scripts.length) resolve();
      };

      script.onerror = () => reject(new Error("Firebase load failed"));
      document.head.appendChild(script);
    });
  });
}


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrN5aBMhLMEeTOvjsydhUUCUkzRDBBT1Q",
  authDomain: "syedpur-jagroto-jubo-songo.firebaseapp.com",
  projectId: "syedpur-jagroto-jubo-songo",
  storageBucket: "syedpur-jagroto-jubo-songo.firebasestorage.app",
  messagingSenderId: "168072726413",
  appId: "1:168072726413:web:2d9d7b7492fdc6ff31dfc4",
  measurementId: "G-5Q2848LGVV"
};


// Firebase চালু
loadFirebase()
  .then(() => {

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    console.log("Firebase connected successfully");


    // ===============================
    // Mobile Menu
    // ===============================

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {
      menuBtn.addEventListener("click", () => {
        mainNav.style.display =
          mainNav.style.display === "flex" ? "none" : "flex";
      });

      document.querySelectorAll("#mainNav a").forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 760) {
            mainNav.style.display = "none";
          }
        });
      });
    }


    // ===============================
    // Member Registration
    // ===============================

    const memberForm = document.getElementById("memberForm");

    if (memberForm) {

      memberForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = document.getElementById("formMessage");

        const name =
          document.getElementById("name")?.value.trim() || "";

        const email =
          document.getElementById("email")?.value.trim() || "";

        const phone =
          document.getElementById("phone")?.value.trim() || "";


        if (!name || !phone) {
          if (message) {
            message.textContent =
              "নাম ও মোবাইল নম্বর অবশ্যই দিতে হবে।";
          }
          return;
        }


        try {

          await db.collection("members").add({
            name: name,
            Email: email,
            Phone: phone,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });


          if (message) {
            message.textContent =
              "আপনার সদস্য আবেদন সফলভাবে জমা হয়েছে।";
          }

          memberForm.reset();

        } catch (error) {

          console.error(error);

          if (message) {
            message.textContent =
              "তথ্য জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
          }
        }

      });
    }

  })
  .catch(error => {
    console.error("Firebase error:", error);
  });
