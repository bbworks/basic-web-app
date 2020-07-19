(function () {
  //Create public API singleton
  window.page = {};

  //Create hepler functions
  const returnFilteredItemByClassName = function(parent, filterClassName) {
    return new Array(...parent).filter(item=>{return item.classList.contains(filterClassName);})[0];
  };

  const returnDateString = function(dateString) {
    const date = new Date(dateString);
    const month = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };

  //Declare private functions
  const getPost = function(postNumber, postDate, postHeading, postBody, postImage, authorName, authorImage) {
    const continueReadingCharacterLimit = 200;
    const continueReadingButtonText = "Continue Reading";
    let bodyHTML;

    if (!(postBody.length > continueReadingCharacterLimit)) {
      bodyHTML = postBody;
    }
    else {
      //const seeMore = "See More";
      //const seeMoreButton = `<i class="post-body-see-more-button" onclick="page.seeMore(${postNumber});">${seeMore}</i>`;
      const moreSpan = `<span class="post-body-more">${postBody.substring(continueReadingCharacterLimit)}</span>`;
      const dots = "...";
      const dotsSpan = `<span class="post-body-dots">${dots}</span>`;
      bodyHTML = `${postBody.substring(0, continueReadingCharacterLimit-1)}${dotsSpan}${moreSpan}`;
    }

    const html =
      `<section id="post-${postNumber}" class="post-section">\r\n` +
      `\t<span class="post-heading">${postHeading}</span\r\n` +
      `\t><img class="post-image" src="${postImage}" /\r\n` +
      `\t><div class="post-author-container">\r\n` +
      `\t\t<img class="post-author-photo" src="${authorImage}" /\r\n` +
      `\t\t><span class="post-author-name">${authorName}</span>\r\n` +
      `\t</div\r\n` +
      `\t><span class="post-date">${returnDateString(postDate)}</span\r\n` +
      `\t><p class="post-body">${bodyHTML}</p\r\n` +
      `\t><a class="post-continue-reading-button" href="/posts/${postNumber}">${continueReadingButtonText}</a>\r\n` +
      `</section>`;
    return html;
  };

  const renderPosts = function() {
    const mainContent = document.getElementById("content");
    mainContent.innerHTML = "";

    fetch("http://localhost:3000/api/posts")
      .then(result => {
  		return result.json();
    	})
    	.then(posts => {
        window.test = posts;
    		for(let i = 0; i < posts.length; i++) {
          const post = posts[i];
          mainContent.innerHTML += getPost(post.post_id, post.post_date, post.heading, post.body, post.post_photo_url, post.first_name+" "+post.last_name, post.user_photo_url);
          if (i < posts.length-1) {
            mainContent.innerHTML += '<hr class="content-hr"/>'
          }
        }
    	})
      .catch(exception => {
          throw exception
      });
  };

  window.addEventListener("load", (event) => {
    renderPosts();
  });

  window.page.seeMore = function(postNumber) {
    const post = document.getElementById(`post-${postNumber}`);
    const body = returnFilteredItemByClassName(post.children, "post-body");
    const dots = returnFilteredItemByClassName(body.children, "post-body-dots");
    const seeMoreButton = returnFilteredItemByClassName(body.children, "post-body-see-more-button");
    const bodyMore = returnFilteredItemByClassName(body.children, "post-body-more");
    const seeMore = !(dots.style.display === "none");

    if (seeMore) {
      dots.style.display = "none";
      seeMoreButton.innerText = "See less";
      bodyMore.style.display = "inline";
    }
    else {
      dots.style.display = "inline";
      seeMoreButton.innerText = "See more";
      bodyMore.style.display = "none";
    }
  };
})();
