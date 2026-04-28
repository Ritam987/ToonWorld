function createLink(label, href) {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

export function renderCards({ cartoons, containerEl }) {
  if (!containerEl) return [];

  containerEl.innerHTML = "";

  const cards = cartoons.map((cartoon) => {
    const article = document.createElement("article");
    article.className = "card";
    article.dataset.cartoonId = cartoon.id;

    const img = document.createElement("img");
    img.src = cartoon.imageSrc;
    img.alt = cartoon.imageAlt || cartoon.title;
    img.loading = "lazy";
    img.decoding = "async";
    // Prevent layout shift (CLS): reserve image space.
    img.width = 280;
    img.height = 180;

    const h3 = document.createElement("h3");
    h3.textContent = cartoon.title;

    const p = document.createElement("p");
    p.textContent = cartoon.description;

    const links = document.createElement("div");
    links.className = "links";

    links.appendChild(createLink("Platform", cartoon.links.platform));
    links.appendChild(createLink("Episodes", cartoon.links.episodes));
    links.appendChild(createLink("Wikipedia", cartoon.links.wikipedia));

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(links);

    return article;
  });

  containerEl.append(...cards);
  return cards;
}

export function setupCardReveal(cards) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}

