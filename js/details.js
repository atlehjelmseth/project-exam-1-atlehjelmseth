const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";

const spesifications = document.querySelector(".details");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);


const specs = urlDetails + "/" + id + "?_embed";

console.log(specs);

async function jacketSpecs() {
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
                                    <h1>${title}</h1>
                                      <div class="product-image">
                                        <img src="${pictures}" class="product-thumb" alt="fortum logo">
                                      </div>
                                    <p>${paragraph}</p>
                                  </div>
                                  `;


      }catch (error) {
        spesifications.innerHTML = "Unable to connect to the API";
    }
   }

   jacketSpecs()

   