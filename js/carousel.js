/* Fetch and display blogposts for slider/carousel */

const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";
const posts = document.querySelector(".carousel");


async function postRestApi() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";
    
    
    for(let i = 0; i < results.length; i++) {
      if (i === 9) { break; }
      const pictures = results[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      const title = results[i].title.rendered;
      const altText =  results[i]._embedded['wp:featuredmedia'][0].alt_text;
      const id = results[i].id;

      posts.innerHTML += `
                            <div class="slider-card">
                             <div class="product-image">
                             <img src="${pictures}" class="product-thumb" alt="${altText}">
                            </div>
                            <p>${title}</p>
                            <a href="blogpost.html?id=${id}" class="button_carousel">Read more</a>
                          </div>
                                  `;
                                  
    }

  }catch (error) {
    posts.innerHTML = `<p class="api_error">We cant seem to connect to the API. This is probably a part of shredders evil plan!</p>`;
    console.log("Error")
  }

}

postRestApi()

/* Slider - Carousel */

const productContainers = document.querySelectorAll(".slider-container");
const nextButton = document.querySelectorAll(".next-button");
const preButton = document.querySelectorAll(".pre-button");

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nextButton[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })
  preButton[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
})

