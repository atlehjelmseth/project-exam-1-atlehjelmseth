const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";
const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";


const posts = document.querySelector(".carousel");


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const urlPost = url + "/" + id;

console.log(urlPost)

async function postRestApi() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";
    console.log(results)
    
    for(let i = 0; i < results.length; i++) {
      if (i === 9) { break; }
      const pictures = results[i]._embedded['wp:featuredmedia'][0].source_url;
      const title = results[i].title.rendered;
      const paragraph = results[i].excerpt.rendered;
      posts.innerHTML += `
                            <div class="company-card">
                             <div class="product-image">
                             <img src="${pictures}" class="product-thumb" alt="fortum logo">
                            </div>
                            ${paragraph}
                            <a href="" class="button_carousel">Read more</a>
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