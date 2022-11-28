const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";
const posts = document.querySelector(".blog");


async function blogApi() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";
    
    
    for(let i = 0; i < results.length; i++) {
      if (i === 10) { break; }
      const pictures = results[i]._embedded['wp:featuredmedia'][0].source_url;
      const title = results[i].title.rendered;
      const paragraph = results[i].excerpt.rendered;
      const id = results[i].id;



      posts.innerHTML += `
                            <div class="blog-container">
                             <div class="product-image">
                             <img src="${pictures}" class="product-thumb" alt="fortum logo">
                            </div>
                            <p class="blog-title">${title}</p>
                            <p>${paragraph}</p>
                            <a href="blogpost.html?id=${id}" class="button_blog">Read more</a>
                          </div>
                                  `;
                                  
    }

  }catch (error) {
    posts.innerHTML = "error";
    console.log("error")
  }

}

blogApi()


