const url = "https://exam-one.eltprod.no/wp-json/wp/v2/posts?_embed";

const posts = document.querySelector(".carousel");

async function JacketsApiFunction() {
  try{const response = await fetch(url);
    const results = await response.json();

    posts.innerHTML = "";
    console.log(results)
    for(let i = 0; i < results.length; i++) {
      posts.innerHTML += `<div class="import-posts">
                                <img src="${results[i]._embedded.wp.featuredmedia.source_url}">
                                  `;

    }
    console.log(results[i]._embedded['wp:featuredmedia'])
  }catch (error) {
    console.log("error")
  }

}

JacketsApiFunction()
