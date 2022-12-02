const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";
const modal = document.querySelector(".modal");
const spesifications = document.querySelector(".details");
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
      const id = resultsSpec.id;

      spesifications.innerHTML = "";

      spesifications.innerHTML += `
                                  <div class="details-container">
                                  <button onclick="history.back()"><< Go Back</button>
                                    <h1>${title}</h1>
                                      <div class="product-image">
                                        <img src="${pictures}" class="product-thumb" alt="kommer">
                                      </div>
                                    <p>${paragraph}</p>
                                  </div>
                                  `;
      modal.innerHTML += `<div class="close"><i class="fas fa-times"></i></div>
      <div class="modalContent">
        <img src="${pictures}" class="modalImg">
        <p>${title}</p>
      </div>`
      
                        ;

                        const blogImages = document.querySelector(".product-image")
                        blogImages.addEventListener('click', function(){
                          modal.style.display = "flex";
                        });
                        
                        modal.addEventListener('click', function(){
                          modal.style.display = "none";
                        });
      }catch (error) {
        spesifications.innerHTML = "Unable to connect to the API";
    }
   }

blogSpecs()



// modalFunction()


// spesifications.ready(function() {
//   console.log('Document is ready.') 
// })