function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function initReviews() {
  const starRating = document.getElementById("starRating");
  const ratingInput = document.getElementById("reviewRating");
  const reviewForm = document.getElementById("reviewForm");
  const reviewsGrid = document.getElementById("reviewsGrid");

  if (!reviewForm || !reviewsGrid || !ratingInput) return;

  // Star rating system
  let selectedRating = 0;

  const updateStars = (stars) => {
    stars.forEach((s, index) => {
      if (index < selectedRating) {
        s.classList.add("active");
        s.style.color = "var(--text-color)";
      } else {
        s.classList.remove("active");
        s.style.color = document.body.classList.contains("dark-mode")
          ? "#444"
          : "#ddd";
      }
    });
  };

  if (starRating) {
    const stars = starRating.querySelectorAll(".star");

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        selectedRating = parseInt(star.dataset.rating, 10);
        ratingInput.value = String(selectedRating);
        updateStars(stars);
      });

      star.addEventListener("mouseenter", () => {
        const hoverRating = parseInt(star.dataset.rating, 10);
        stars.forEach((s, index) => {
          if (index < hoverRating) {
            s.style.color = "var(--text-color)";
          } else {
            s.style.color =
              selectedRating > index ? "var(--text-color)" : "#ddd";
          }
        });
      });
    });

    starRating.addEventListener("mouseleave", () => updateStars(stars));
    updateStars(stars);
  }

  // Review persistence + rendering
  const MAX_REVIEWS = 50;
  let reviews = JSON.parse(localStorage.getItem("footerReviews") || "[]");

  if (reviews.length > MAX_REVIEWS) {
    reviews = reviews.slice(-MAX_REVIEWS);
    localStorage.setItem("footerReviews", JSON.stringify(reviews));
  }

  function renderReviews() {
    if (reviews.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="review-card" style="grid-column: 1 / -1;">
          <div class="review-avatar">?</div>
          <div class="review-comment">No reviews yet. Be the first to share your experience!</div>
        </div>
      `;
      return;
    }

    reviewsGrid.innerHTML = reviews
      .slice()
      .reverse()
      .map(
        (r, index) => `
          <div class="review-card" style="animation-delay: ${index * 0.1}s;">
            <div class="review-quote">"</div>
            <div class="review-avatar">${getInitials(r.name)}</div>
            <div class="review-comment">"${escapeHtml(r.comment)}"</div>
            <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(
              5 - r.rating
            )}</div>
            <div class="review-name">${escapeHtml(r.name)}</div>
            <div class="review-role">ToonWorld User</div>
          </div>
        `
      )
      .join("");
  }

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewerName")?.value.trim();
    const rating = parseInt(
      document.getElementById("reviewRating")?.value,
      10
    );
    const comment = document.getElementById("reviewComment")?.value.trim();

    if (!name || !rating || !comment) {
      alert("Please fill in all fields including star rating");
      return;
    }

    if (name.length > 50) {
      alert("Name is too long (max 50 characters)");
      return;
    }

    if (comment.length > 200) {
      alert("Comment is too long (max 200 characters)");
      return;
    }

    reviews.push({ name, rating, comment });
    if (reviews.length > MAX_REVIEWS) {
      reviews = reviews.slice(-MAX_REVIEWS);
    }

    localStorage.setItem("footerReviews", JSON.stringify(reviews));
    renderReviews();
    reviewForm.reset();
    selectedRating = 0;
    ratingInput.value = "";

    if (starRating) {
      starRating.querySelectorAll(".star").forEach((s) => {
        s.classList.remove("active");
        s.style.color = document.body.classList.contains("dark-mode")
          ? "#444"
          : "#ddd";
      });
    }

    const submitBtn = reviewForm.querySelector(".submit-btn");
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "✓ Submitted!";
      submitBtn.style.background = "var(--text-color)";
      submitBtn.style.color = "var(--bg-color)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "var(--button-bg)";
        submitBtn.style.color = "var(--button-text)";
      }, 2000);
    }

    reviewsGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  renderReviews();
}

