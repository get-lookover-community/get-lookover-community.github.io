document.querySelector('.navtab[href="/articles"]').classList.add('active');
fetch('/data/article.json')
.then(res => res.json())
.then(e => {
    let header = document.querySelector('.page-header');
    let fragment = document.createDocumentFragment();
    let post = document.createElement('div');
    post.classList.add('posts');
    for (let i = 0; i < e.length; i++) {
        const inner_post = document.createElement('div');
        inner_post.id = e[i].id;
        inner_post.classList.add(`post-${i + 1}`, 'animate-bottom');
        inner_post.innerHTML = `
                <h3><a class="posts-link" href="/articles/${e[i].id}">${e[i].title}</a></h3>
                <p>${e[i].content}</p>
            `;
        post.append(inner_post);
    }
    fragment.append(post);
    header.after(fragment);
});
