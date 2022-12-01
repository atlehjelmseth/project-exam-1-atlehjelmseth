const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";
const url_next = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?page=2&_embed";
const button = document.querySelector(".button_view_more");
const posts = document.querySelector(".blog");


async function blogApi() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";


    for(let i = 0; i < results.length; i++) {
      // if (i === 10) { break; }
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
    console.log("error");
  }

  try{const response2 = await fetch(url_next);
    const results2 = await response2.json();

    document.querySelector('.button_view_more').addEventListener("click", function(){
      for(let i = 0; i < results2.length; i++){

        console.log(results2);
        button.style.display = "none";
        
        const pictures2 = results2[i]._embedded['wp:featuredmedia'][0].source_url;
        const title2 = results2[i].title.rendered;
        const paragraph2 = results2[i].excerpt.rendered;
        const id2 = results2[i].id;
        posts.innerHTML += `
                            <div class="blog-container">
                             <div class="product-image">
                             <img src="${pictures2}" class="product-thumb" alt="fortum logo">
                            </div>
                            <p class="blog-title">${title2}</p>
                            <p>${paragraph2}</p>
                            <a href="blogpost.html?id=${id2}" class="button_blog">Read more</a>
                            </div>
                                   `;
      }
    })
  }catch {
    console.log("error");
  }

}

blogApi()



