document.querySelector('.navtab[href="/"]').classList.add('active');

fetch('/data/article.json')
    .then(res => res.json())
    .then(e => {

        let header = document.querySelector('.page-header');
        let frag = document.createDocumentFragment();
        let post = document.createElement('div');
        post.classList.add('posts');
        frag.append(post);
        if (e.length > 3) {

            for (let i = 0; i < 3; i++) {
                const inner_post = document.createElement('div');
                inner_post.id = e[i].id;
                inner_post.classList.add(`post-${i + 1}`, 'animate-bottom');
                inner_post.innerHTML = `
                    <h3><a class="posts-link" href="/articles/${e[i].id}">${e[i].title}</a></h3>
                    <p>${e[i].content}</p>
                `;
                post.append(inner_post);
            }
        } else {
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
        }
        header.after(frag);
    });