const urlDetails = "https://exam-one.eltprod.no/wp-json/wp/v2/posts";
const urlComments = "https://exam-one.eltprod.no/wp-json/wp/v2/comments?post=";
const modal = document.querySelector(".modal");
const spesifications = document.querySelector(".details");
const pageTitle = document.querySelector("title");
const commentsWrapper = document.querySelector(".commentsWrapper");
const sendComment = document.querySelector("#comment");
const h2Comments = document.querySelector(".h2_comments");
const sendButton = document.querySelector(".button_contact");
const sendLoader = document.querySelector(".sendLoader");
const form = document.querySelector("form");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");



/* Fetch and display blogpost */

const specs = urlDetails + "/" + id + "?_embed";
const comments = urlComments + id + "&per_page=100";

async function blogSpecs() {
  try {const response = await fetch(specs);
       const resultsSpec = await response.json();

      const pictures = resultsSpec._embedded['wp:featuredmedia'][0].source_url;
      const title = resultsSpec.title.rendered;
      const content = resultsSpec.content.rendered;
      const blogAuthor = resultsSpec._embedded.author[0].name;


      spesifications.innerHTML = "";

      spesifications.innerHTML += `<div class="details-container">
                                    <button onclick="history.back()"><< Go Back</button>
                                    <h1>${title}</h1>
                                    <p class="post_author">Written by: ${blogAuthor}</p
                                    ${content}
                                  </div>
                                  `;
      pageTitle.innerHTML = `Blogpost | ${title}`;
      modal.innerHTML += `<div class="close"><i class="fas fa-times"></i></div>
                          <div class="modalContent">
                            <img src="${pictures}" class="modalImg">
                            <p>${title}</p>
                          </div>`                          ;

                        const blogImages = document.querySelector(".details-container img");
                        blogImages.addEventListener('click', function(){
                          modal.style.display = "flex";
                        });
                        commentsFetch()
      }catch (error) {
        spesifications.innerHTML = `<p class="api_error">We cant seem to connect to the API. This is probably a part of shredders evil plan!</p>`;
        commentsWrapper.style.display = "none";
        sendComment.style.display = "none";
        h2Comments.style.display = "none";
    }
   }

blogSpecs()

/* Fetch and display comments */


async function commentsFetch() {
  try {const commentsGet = await fetch(comments);
    const commentsSpecs = await commentsGet.json();

    const numberOfComments = commentsSpecs.length;



    commentsWrapper.innerHTML = "";
    

    for(let i = 0; i < commentsSpecs.length; i++) {
      const commentRendered = commentsSpecs[i].content.rendered;
      let authorName = commentsSpecs[i].author_name;
      if (commentsSpecs[i].author_name === "") {
        commentsWrapper.innerHTML += `<div class="comments"><p class="author_name">Author: TurtleLover69</p> ${commentRendered}</div>`
        h2Comments.innerHTML = `<h2>Comments (${numberOfComments}):</h2>`
      } else {
        h2Comments.innerHTML = `<h2>Comments (${numberOfComments}):</h2>`
        commentsWrapper.innerHTML += `<div class="comments"><p class="author_name">Author: ${authorName}</p>${commentRendered}</div>`
      }

      
    }
    if(commentsSpecs.length === 0) {
      h2Comments.innerHTML = `<h2>Comments (${numberOfComments}):</h2>`
      commentsWrapper.innerHTML = `<p class="nocomments">No comments</p>`
    }

  }catch(error) {
    commentsWrapper.innerHTML = `<p class="api_error">The comment section does not seem to connect to the API. This is probably a part of shredders evil plan!</p>`;
    sendComment.style.display = "none";
    h2Comments.style.display = "none";
  }

}


/* Send comments */

const textComment = document.getElementById("your-comment");

function sendCommentFunction(form) {

  form.action = `https://exam-one.eltprod.no/wp-json/wp/v2/comments?post=${id}&content=${textComment.value}`;
  console.log("success");
  setTimeout(function(){
    window.location.reload();
  }, 4000);
  sendButton.style.display = "none";
  sendLoader.style.display = "block";
}

textComment.addEventListener("submit", sendCommentFunction);


/* Modal */

const background = document.querySelector(".details-blog");

modal.addEventListener('click', function(){
  if (event.target.closest(".modalImg")) return
  modal.style.display = "none";
});

