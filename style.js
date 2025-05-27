const images = [
  {
    center: "img/img1.png",
    tilted_left: "img/img1.png",
    tilted_right: "img/img1.png",
  },
  {
    center: "img/img2_center.png",
    tilted_left: "img/img2_tilted_left.png",
    tilted_right: "img/img2_tilted_left.png",
  },
  {
    center: "img/img3_center.png",
    tilted_left: "img/img3_tilted_left.png",
    tilted_right: "img/img3_tilted_right.png",
  },
  {
    center: "img/img4_center.png",
    tilted_left: "img/img4_tilted_left.png",
    tilted_right: "img/img4_tilted_right.png",
  },
  {
    center: "img/img5_center.png",
    tilted_left: "img/img5_tilted_left.png",
    tilted_right: "img/img5_tilted_right.png",
  },
  {
    center: "img/img6_center.png",
    tilted_left: "img/img6_tilted_left.png",
    tilted_right: "img/img6_tilted_right.png",
  },
  {
    center: "img/img7_center.png",
    tilted_left: "img/img7_tilted_left.png",
    tilted_right: "img/img7_tilted_right.png",
  },
  {
    center: "img/img8_center.png",
    tilted_left: "img/img8_tilted_left.png",
    tilted_right: "img/img8_tilted_right.png",
  },
  {
    center: "img/img9_center.png",
    tilted_left: "img/img9_tilted_left.png",
    tilted_right: "img/img9_tilted_right.png",
  },
  {
    center: "img/imgx_center.png",
    tilted_left: "img/imgx_tilted_left.png",
    tilted_right: "img/imgx_tilted_right.png",
  },
  {
    center: "img/img10_center.png",
    tilted_left: "img/img10_tilted_left.png",
    tilted_right: "img/img10_tilted_right.png",
  },

  {
    center: "img/img11_center.png",
    tilted_left: "img/img11_tilted_left.png",
    tilted_right: "img/img11_tilted_right.png",
  },
  {
    center: "img/img12_center.png",
    tilted_left: "img/img12_tilted_left.png",
    tilted_right: "img/img12_tilted_right.png",
  },
  {
    center: "img/img13_center.png",
    tilted_left: "img/img13_tilted_left.png",
    tilted_right: "img/img13_tilted_right.png",
  },
  {
    center: "img/img14_center.png",
    tilted_left: "img/img14_tilted_left.png",
    tilted_right: "img/img14_tilted_right.png",
  },
];

class PhysicalCarousel {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;

    this.leftCard = document.getElementById("card-left");
    this.centerCard = document.getElementById("card-center");
    this.rightCard = document.getElementById("card-right");

    this.prevBtn = document.getElementById("prev");
    this.nextBtn = document.getElementById("next");

    this.init();
  }

  init() {
    this.updateCards();
    this.bindEvents();
  }

  bindEvents() {
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());

    this.leftCard.addEventListener("click", () => this.prev());
    this.rightCard.addEventListener("click", () => this.next());

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  }

  getImageIndex(offset) {
    return (this.currentIndex + offset + images.length) % images.length;
  }

  updateCards() {
    const leftIndex = this.getImageIndex(-1);
    const centerIndex = this.getImageIndex(0);
    const rightIndex = this.getImageIndex(1);

    this.leftCard.style.backgroundImage = `url(${images[leftIndex].tilted_left})`;
    this.centerCard.style.backgroundImage = `url(${images[centerIndex].center})`;
    this.rightCard.style.backgroundImage = `url(${images[rightIndex].tilted_right})`;
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const nextIndex = this.getImageIndex(2);

    const tempCard = document.createElement("div");
    tempCard.className = "card";
    tempCard.style.cssText = `
            width: 439px;
            height: 870px;
            right: -500px;
            transform: perspective(1000px) rotateY(-30deg) scale(0.9);
            z-index: 1;
            opacity: 0;
            background-image: url(${images[nextIndex].tilted_right});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          `;
    this.leftCard.parentNode.appendChild(tempCard);

    setTimeout(() => {
      // Move left card off-screen
      this.leftCard.style.left = "-500px";
      this.leftCard.style.right = "auto";
      this.leftCard.style.opacity = "0";

      // Move center to left
      this.centerCard.style.left = "50px";
      this.centerCard.style.right = "auto";
      this.centerCard.style.width = "439px";
      this.centerCard.style.height = "870px";
      this.centerCard.style.transform =
        "perspective(1000px) rotateY(30deg) scale(0.9)";
      this.centerCard.style.zIndex = "1";
      this.centerCard.style.backgroundImage = `url(${
        images[this.currentIndex].tilted_left
      })`;
      this.centerCard.style.opacity = "0.8";

      // Move right card to center - keep using right positioning like prev does with left
      this.rightCard.style.right = "50%";
      this.rightCard.style.transform =
        "translateX(50%) perspective(1000px) rotateY(-30deg) scale(0.9)";

      // Move new card to right position
      tempCard.style.right = "50px";
      tempCard.style.opacity = "0.8";
    }, 50);

    // STEP 2: After the card has moved to center, adjust its size and remove tilt
    setTimeout(() => {
      this.rightCard.style.width = "890px";
      this.rightCard.style.height = "726px";
      this.rightCard.style.transform =
        "translateX(50%) perspective(1000px) rotateY(0deg) scale(1)";
      this.rightCard.style.zIndex = "3";

      const rightCardIndex = this.getImageIndex(1);
      this.rightCard.style.backgroundImage = `url(${images[rightCardIndex].center})`;
      this.rightCard.style.opacity = "1";
    }, 200);

    setTimeout(() => {
      this.leftCard.remove();

      this.leftCard = this.centerCard;
      this.centerCard = this.rightCard;
      this.rightCard = tempCard;

      this.currentIndex = this.getImageIndex(1);
      this.isAnimating = false;
    }, 850);
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const prevIndex = this.getImageIndex(-2);

    const tempCard = document.createElement("div");
    tempCard.className = "card";
    tempCard.style.cssText = `
            width: 439px;
            height: 870px;
            left: -500px;
            transform: perspective(1000px) rotateY(30deg) scale(0.9);
            z-index: 1;
            opacity: 0;
            background-image: url(${images[prevIndex].tilted_left});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          `;
    this.leftCard.parentNode.appendChild(tempCard);

    setTimeout(() => {
      // Move right card off-screen
      this.rightCard.style.right = "-500px";
      this.rightCard.style.left = "auto";
      this.rightCard.style.opacity = "0";

      // Move center card to right
      this.centerCard.style.left = "auto";
      this.centerCard.style.right = "50px";
      this.centerCard.style.width = "439px";
      this.centerCard.style.height = "870px";
      this.centerCard.style.transform =
        "perspective(1000px) rotateY(-30deg) scale(0.9)";
      this.centerCard.style.zIndex = "1";
      this.centerCard.style.backgroundImage = `url(${
        images[this.currentIndex].tilted_right
      })`;
      this.centerCard.style.opacity = "0.8";

      // Move left card to center - STEP 1: Move to center position while keeping tilt
      this.leftCard.style.right = "auto";
      this.leftCard.style.left = "50%";
      this.leftCard.style.transform =
        "translateX(-50%) perspective(1000px) rotateY(30deg) scale(0.9)";

      // Move new card to left position
      tempCard.style.left = "50px";
      tempCard.style.opacity = "0.8";
    }, 50);

    // STEP 2: After the card has moved to center, adjust its size and remove tilt
    setTimeout(() => {
      this.leftCard.style.width = "890px";
      this.leftCard.style.height = "726px";
      this.leftCard.style.transform =
        "translateX(-50%) perspective(1000px) rotateY(0deg) scale(1)";
      this.leftCard.style.zIndex = "3";

      const leftCardIndex = this.getImageIndex(-1);
      this.leftCard.style.backgroundImage = `url(${images[leftCardIndex].center})`;
      this.leftCard.style.opacity = "1";
    }, 200);

    setTimeout(() => {
      this.rightCard.remove();

      this.rightCard = this.centerCard;
      this.centerCard = this.leftCard;
      this.leftCard = tempCard;

      this.currentIndex = this.getImageIndex(-1);
      this.isAnimating = false;
    }, 850);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PhysicalCarousel();
});
