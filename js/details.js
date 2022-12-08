const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";
const urlComments = "https://exam-one.eltprod.no/wp-json/wp/v2/comments?post=";
const modal = document.querySelector(".modal");
const spesifications = document.querySelector(".details");
const pageTitle = document.querySelector("title");
const commentsWrapper = document.querySelector(".commentsWrapper");
const sendComment = document.querySelector("#comment");
const form = document.querySelector("form");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


console.log(id);


const specs = urlDetails + "/" + id + "?_embed";
const comments = urlComments + id + "&per_page=100";

console.log(specs);
console.log (comments);

async function blogSpecs() {
  try {const response = await fetch(specs);
       const resultsSpec = await response.json();

      console.log(resultsSpec)
      const pictures = resultsSpec._embedded['wp:featuredmedia'][0].source_url;
      const title = resultsSpec.title.rendered;
      const paragraph = resultsSpec.excerpt.rendered;

      spesifications.innerHTML = "";

      spesifications.innerHTML += `<div class="details-container">
                                    <button onclick="history.back()"><< Go Back</button>
                                    <h1>${title}</h1>
                                    <div class="product-image">
                                      <img src="${pictures}" class="product-thumb" alt="kommer">
                                    </div>
                                    <p>${paragraph}</p>
                                    <h2>Comments:</h2>
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

/* Fetch and display comments */


async function commentsFetch() {
  try {const commentsGet = await fetch(comments);
    const commentsSpecs = await commentsGet.json();

    console.log(commentsSpecs.length);



    commentsWrapper.innerHTML = "";

    for(let i = 0; i < commentsSpecs.length; i++) {
      const commentRendered = commentsSpecs[i].content.rendered;
      let authorName = commentsSpecs[i].author_name;
      if (commentsSpecs[i].author_name === "") {
        commentsWrapper.innerHTML += `<div class="comments"><p class="author_name">Author: TurtleLover69</p> ${commentRendered}</div>`
      } else {
        commentsWrapper.innerHTML += `<div class="comments"><p class="author_name">Author: ${authorName}</p> ${commentRendered}</div>`
      }

      
    }
    if(commentsSpecs.length === 0) {
      commentsWrapper.innerHTML = `<p class="nocomments">No comments</p>`
    }

  }catch(error) {
    console.log("error");
  }

}

commentsFetch()


/* Send comments */

const textComment = document.getElementById("your-comment");

function sendCommentFunction(form) {

  form.action = `https://exam-one.eltprod.no/wp-json/wp/v2/comments?post=${id}&content=${textComment.value}`;
  console.log("success");
  setTimeout(function(){
    window.location.reload();
  }, 4000);
}

textComment.addEventListener("submit", sendCommentFunction);


/* Modal */

const background = document.querySelector(".details-blog");

modal.addEventListener('click', function(){
  if (event.target.closest(".modalImg")) return
  modal.style.display = "none";
});

