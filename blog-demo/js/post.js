(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  const author = AUTHORS[post.author];

  document.title = `${post.title} — The Daily Loom`;
  document.getElementById('breadcrumbCategory').textContent = post.category;
  document.getElementById('breadcrumbTitle').textContent = post.title;

  document.getElementById('postHeroHead').innerHTML = `
    <span class="post-cat post-cat-inline">${post.category}</span>
    <h1>${post.title}</h1>
    <div class="post-hero-meta">
      <img src="${author.image}" alt="${post.author}">
      <div><strong>${post.author}</strong><span>${author.role}</span></div>
      <span class="dot">&middot;</span>
      <span>${post.date}</span>
      <span class="dot">&middot;</span>
      <span>${post.readTime}</span>
    </div>
  `;

  const heroImage = document.getElementById('postHeroImage');
  heroImage.src = post.image;
  heroImage.alt = post.title;

  // Render article body blocks, building a table of contents from h2 headings
  const contentEl = document.getElementById('postContent');
  const tocEl = document.getElementById('postToc');
  let headingIndex = 0;
  const tocItems = [];
  contentEl.innerHTML = post.content.map((block) => {
    if (block.type === 'h2') {
      headingIndex += 1;
      const slug = `section-${headingIndex}`;
      tocItems.push({ slug, text: block.text });
      return `<h2 id="${slug}">${block.text}</h2>`;
    }
    if (block.type === 'p') return `<p>${block.text}</p>`;
    if (block.type === 'quote') return `<blockquote>${block.text}</blockquote>`;
    if (block.type === 'list') return `<ul>${block.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    return '';
  }).join('');

  tocEl.innerHTML = tocItems.map((t) => `<li><a href="#${t.slug}">${t.text}</a></li>`).join('')
    || '<li><a href="#postContent">Full story</a></li>';

  // Tags
  document.getElementById('postTags').innerHTML = post.tags.map((t) => `<a href="index.html#latest" class="tag-pill">${t}</a>`).join('');

  // Author bio card
  document.getElementById('authorBioCard').innerHTML = `
    <img src="${author.image}" alt="${post.author}">
    <div>
      <h4>${post.author}</h4>
      <span>${author.role}</span>
      <p>${author.bio}</p>
    </div>
  `;

  // "More to read" mini list — 3 other posts, different from this one
  const others = POSTS.filter((p) => p.id !== post.id);
  const miniPicks = others.sort(() => 0.5 - Math.random()).slice(0, 3);
  document.getElementById('miniPostList').innerHTML = miniPicks.map((p) => `
    <li>
      <a href="post.html?id=${p.id}"><img src="${p.image}" alt="${p.title}"></a>
      <div>
        <h5><a href="post.html?id=${p.id}">${p.title}</a></h5>
        <span>${p.date}</span>
      </div>
    </li>
  `).join('');

  // Related posts — same category first, backfilled with others
  const sameCategory = others.filter((p) => p.category === post.category);
  const fillers = others.filter((p) => p.category !== post.category);
  const related = [...sameCategory, ...fillers].slice(0, 3);
  const relatedGrid = document.getElementById('relatedGrid');
  related.forEach((p, i) => {
    const relatedAuthor = AUTHORS[p.author];
    const card = document.createElement('article');
    card.className = `post-card reveal stagger-${i + 1}`;
    card.innerHTML = `
      <a href="post.html?id=${p.id}" class="post-media"><img src="${p.image}" alt="${p.title}"><span class="post-cat">${p.category}</span></a>
      <div class="post-body">
        <span class="post-date">${p.date}</span>
        <h3><a href="post.html?id=${p.id}">${p.title}</a></h3>
        <p>${p.excerpt}</p>
        <div class="post-footer"><div class="post-author"><img src="${relatedAuthor.image}" alt="${p.author}"> ${p.author}</div><a href="post.html?id=${p.id}" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a></div>
      </div>
    `;
    relatedGrid.appendChild(card);
    revealObserver.observe(card);
  });

  // Comment form — simulated submit, no backend
  const commentForm = document.getElementById('commentForm');
  const commentCount = document.getElementById('commentCount');
  let count = 3;
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!commentForm.checkValidity()) {
      commentForm.reportValidity();
      return;
    }
    const btn = commentForm.querySelector('button');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Posting...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      commentForm.reset();
      count += 1;
      commentCount.textContent = count;
      document.getElementById('commentSuccess').hidden = false;
    }, 700);
  });
})();
