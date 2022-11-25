const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";
const posts = document.querySelector(".carousel");


async function postRestApi() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";
    
    
    for(let i = 0; i < results.length; i++) {
      if (i === 9) { break; }
      const pictures = results[i]._embedded['wp:featuredmedia'][0].source_url;
      const title = results[i].title.rendered;
      const paragraph = results[i].excerpt.rendered;
      const id = results[i].id;

      posts.innerHTML += `
                            <div class="company-card">
                             <div class="product-image">
                             <img src="${pictures}" class="product-thumb" alt="fortum logo">
                            </div>
                            <p>${title}</p>
                            <a href="blogpost.html?id=${id}" class="button_carousel">Read more</a>
                          </div>
                                  `;
                                  
    }

  }catch (error) {
    posts.innerHTML = "error";
    console.log("error")
  }

}

postRestApi()

const productContainers = document.querySelectorAll(".company-container");
const nxtBtn = document.querySelectorAll(".nxt-btn");
const preBtn = document.querySelectorAll(".pre-btn");

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })
  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
})
