const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";
const modal = document.querySelector(".modal");
const spesifications = document.querySelector(".details");
const pageTitle = document.querySelector("title");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


console.log(id);


const specs = urlDetails + "/" + id + "?_embed";

console.log(specs);

async function blogSpecs() {
  try {const response = await fetch(specs);
       const resultsSpec = await response.json();

      console.log(resultsSpec)
      const pictures = resultsSpec._embedded['wp:featuredmedia'][0].source_url;
      const title = resultsSpec.title.rendered;
      const paragraph = resultsSpec.excerpt.rendered;
      // const comments = resultsSpec._embedded['replies'][0][0].content.rendered;

      spesifications.innerHTML = "";

      spesifications.innerHTML += `<div class="details-container">
                                    <button onclick="history.back()"><< Go Back</button>
                                    <h1>${title}</h1>
                                    <div class="product-image">
                                      <img src="${pictures}" class="product-thumb" alt="kommer">
                                    </div>
                                    <p>${paragraph}</p>
                                  </div>
                                  `;
      pageTitle.innerHTML = `Blogpost | ${title}`;
      modal.innerHTML += `<div class="close"><i class="fas fa-times"></i></div>
                          <div class="modalContent">
                            <img src="${pictures}" class="modalImg">
                            <p>${title}</p>
                          </div>
`
                          
                          ;

                        const blogImages = document.querySelector(".product-image");

                        
                        blogImages.addEventListener('click', function(){
                          modal.style.display = "flex";
                        });
                        

                        
      }catch (error) {
        spesifications.innerHTML = `<p class="api_error">We cant seem to connect to the API. This is probably a part of shredders evil plan!</p>`;
    }
   }

blogSpecs()

const background = document.querySelector(".details-blog");

modal.addEventListener('click', function(){
  if (event.target.closest(".modalImg")) return
  modal.style.display = "none";
});

