//****************************************
// Website scripts
//****************************************
'use strict';

/** 
* Handle Ghost Search
*/ 
const handleSearch = () => {
  const searchForms = document.querySelectorAll('.js-search-form');
  if (searchForms) {
    searchForms.forEach(form => {
      const action = form.getAttribute('action');

      form.addEventListener('submit', (e) => {
        const inputValue = form.querySelector('input').value;
        const query = `${action}?s=${inputValue}`;
        form.setAttribute('action', query);
        e.preventDefault();
        window.location = `${query}`;
      }, false);
    })
  }
}

/** 
* Handle Load More
*/
const handleLoadMore = () => {
  // init
  const loadMoreBtn = document.querySelector('.js-load-more');

  if (loadMoreBtn && themeGlobal.lastPage) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('btn--disabled');
  }

  // event
  if (loadMoreBtn) {
    loadMoreBtn.onclick = (event) => {
      loadMorePosts(event.srcElement);
    }
  }
}

/** 
* Handle Image Gallery
*/
const handleImageGallery = () => {
  const images = document.querySelectorAll('.kg-image-card img, .kg-gallery-card img');
  const galleryImages = document.querySelectorAll('.kg-gallery-image img');

  // Gallery style
  galleryImages.forEach(image => {
    image.setAttribute('alt', 'Gallery Image');
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = `${ratio} 1 0%`;
  })

  // Lighbox function
  if (themeSettings.enableImageLightbox) {
    images.forEach(image => {
      const link = image.parentNode.nodeName === 'A' ? image.parentNode.getAttribute('href') : '';
      var lightboxWrapper = link ? image.parentNode : document.createElement('a');

      lightboxWrapper.setAttribute('data-no-swup', '');
      lightboxWrapper.setAttribute('data-fslightbox', '');
      lightboxWrapper.setAttribute('href', image.src);
      lightboxWrapper.setAttribute('aria-label', 'Click for Lightbox');

      if (link) {
        var linkButton = document.createElement('a');
        linkButton.innerHTML = `<i class="icon icon-link icon--sm"><svg class="icon__svg"><use xlink:href="/assets/icons/icon-sprite.svg#link"></use></svg></i>`
        linkButton.setAttribute('class', 'image-link');
        linkButton.setAttribute('href', link);
        linkButton.setAttribute('target', '_blank');
        linkButton.setAttribute('rel', 'noreferrer noopener');
        lightboxWrapper.parentNode.insertBefore(linkButton, lightboxWrapper.parentNode.firstChild);
      } else {
        image.parentNode.insertBefore(lightboxWrapper, image.parentNode.firstChild);
        lightboxWrapper.appendChild(image);
      }
    });

    refreshFsLightbox();
  };
}

/** 
* Handle Menu
*/
const handleMenu = () => {
  // menu
  const menu = document.querySelector('.js-menu');
  if (!menu) return; 
  
  // menu open
  const menuOpenBtn = document.querySelector('.js-menu-open');
  if (menuOpenBtn) {
    menuOpenBtn.onclick = (event) => {
      document.body.setAttribute('data-menu', 'open');
      menuCloseBtn.focus();
    }
  }

  // menu close
  const menuCloseBtn = document.querySelector('.js-menu-close');
  if (menuCloseBtn) {
    menuCloseBtn.onclick = (event) => {
      document.body.setAttribute('data-menu', 'closed');
      menuOpenBtn.focus();
    }
  }

  // Click event outside menu and not menu open button
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.js-menu') && !event.target.closest('.js-menu-open, .js-member-btn, .js-exclude')) {
      if(document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        // document.activeElement.blur();
      }
      document.body.setAttribute('data-menu', 'closed');
    }
  });
}

/** 
* Handle Theme Toggle
*/
const handleThemeToggle = () => {
  // theme
  const themeToggleBtn = document.querySelectorAll('.js-theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.forEach(btn => {
      btn.onclick = (event) => {
        toggleTheme();
      }
    });
  }
}

/** 
* Handle User Menu
*/
const handleUserMenu = () => {
  const memberBtn = document.querySelector('.js-member-btn');
  let isMemberFocus = false;
  if (memberBtn) {
    memberBtn.onfocus = (event) => {
      isMemberFocus=true;
      event.currentTarget.nextElementSibling.classList.add('is-active');
    }

    memberBtn.onblur = (event) => {
      isMemberFocus=false;
      event.currentTarget.nextElementSibling.classList.remove('is-active');
    }

    memberBtn.onclick = (event) => {
      !isMemberFocus ? event.currentTarget.nextElementSibling.classList.toggle('is-active')
                     : isMemberFocus = false;
    }
  }
}

/** 
* Handle Scroll Top
*/
const handleScrollTop = () => {
  const scrollTopBtn = document.querySelector('.js-scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.onclick = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}


/** 
* Handle Floating Header
*/
const handleFloatingHeader = () => {

  const header = document.querySelector('.js-header');

  if (header && header.getAttribute('data-header') === 'floating') {
    var options = {
      offset : 100,
      tolerance : 0,
      classes : {
        initial : "is-floating",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      }
    };

    const headroom = new Headroom(header, options);
    headroom.init();
  }
}

/** 
* Handle Notifications
*/
const handleNotificationClose = () => {
  const notifyCloseBtns = document.querySelectorAll('.js-notify-close');
  notifyCloseBtns.forEach(closeBtn => {
    closeBtn.onclick = (event) => {
      const toRemove = event.currentTarget.getAttribute('data-class');
      if (toRemove) {
        document.body.classList.remove(toRemove);
        if (window.location.search) {
          clearURI();
        }
      } else {
        event.currentTarget.closest('form').classList.remove('success', 'error');
      }
    }
  });
}

/** 
* Handle Slider
*/
const handleSlider = () => {
  const sliderContainer = document.querySelector('.js-featured-feed');

  if (sliderContainer) {
    const slider = tns({
      container: sliderContainer,
      items: 1,
      slideBy: 1,
      loop: true,
      autoplay: false,
      gutter: 0,
      nav: false,
      controls: true,
      prevButton: document.querySelector('.js-featured-prev'),
      nextButton: document.querySelector('.js-featured-next'),
      // responsive: {
      //   0: {
      //     items: 1,
      //   },
      //   768: {
      //     items: 2,
      //   },
      //   992: {
      //     items: 3,
      //   }
      // }
    });
  }
}

/** 
* Handle External links
*/
const handleExternalLinks = () => {
  if (themeSettings.openLinksInNewTab) {
    const domain = location.host.replace('www.', '');
    const postLinks = document.querySelectorAll('.content a');
  
    postLinks.forEach((link) => {
      if(!link.href.includes(domain)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noreferrer noopener');
      }
    })
  }
}

/**
* Handle Keyboard events
*/
const handleKeyboardEvents = () => {
  // Key press event handling
  window.onkeydown = (evt) => {
    const sourceClass = evt.srcElement.className;

    switch(evt.key) {
      case 'Escape':
        removeClass('.js-menu', 'is-active');
        removeClass('.js-menu-toggle', 'is-active');
        removeClass('.js-search', 'is-active');
        document.activeElement.blur();
        document.body.setAttribute('data-menu', 'closed');
        break;
      default:
        break;// nothing to do
    }
  }
}

/**
* Handle Keyboard events
*/
const handleProgressBar = () => {
  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    window.addEventListener('scroll', (event) => {
      // Progressbar
      var scrollTop = document.querySelector('.post')["scrollTop"] ||
                      document.documentElement["scrollTop"] || 
                      document.body["scrollTop"];
  
      var scrollBottom = ( document.querySelector('.post')["scrollHeight"] ||
                          document.documentElement["scrollHeight"] ||
                          document.body["scrollHeight"] -
                          document.documentElement.scrollHeight);
  
      scrollPercent = Math.round(scrollTop / scrollBottom * 100) + "%";
      progressBar.style.setProperty("--scroll", scrollPercent);
    }, false);
  }
}

/** 
* Toggle Scheme
* @param
*/ 
const toggleTheme = () => {
  const currentTheme =  document.documentElement.getAttribute('data-color-scheme');
  switch(currentTheme) {
    case 'system':
      setTheme('dark');
      break;
    case 'dark':
      setTheme('light');
      break;
    case 'light':
      setTheme('system');
      break;
    default:
      setTheme('system');
  }
}

/** 
* Set Theme
* @param: sTheme
*/ 
const setTheme = (sTheme) => {
  document.documentElement.setAttribute('data-color-scheme', sTheme);
  localStorage.setItem('PREFERRED_COLOR_SCHEME', sTheme);
}

/** 
* Toggle Class
* @param: el_class
* @param: target_class
*/ 
const toggleClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.toggle(target_class);
}

/** 
* Add Class
* @param: el_class
* @param: target_class
*/ 
const addClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.add(target_class);
}

/** 
* Remove Class
* @param: el_class
* @param: target_class
*/ 
const removeClass = (el_class, target_class) => {
  const el = document.querySelector(el_class);
  if (el) el.classList.remove(target_class);
}

/** 
* Check if element in Viewport
* @param: el
*/ 
const isInViewport = (el) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return(
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

/** 
* Load more posts
* @param: button
*/ 
const loadMorePosts = (button) => {
  // next link
  const nextPage = document.querySelector('link[rel=next]');
  themeGlobal.nextPageLink = nextPage && !themeGlobal.nextPageLink ? nextPage.getAttribute('href') : themeGlobal.nextPageLink;

  // Update current page value
  if (themeGlobal.nextPageLink && !themeGlobal.lastPage) {
    button ? button.classList.add('is-loading') : '';

    // Fetch next page content
    fetch(themeGlobal.nextPageLink).then(res => res.text())
    .then(text => new DOMParser().parseFromString(text, 'text/html'))
    .then(doc => {
      // Get posts
      const posts = doc.querySelectorAll('.js-post-card');
      const postContainer = document.querySelector('.js-post-feed');
      const nextPage = doc.querySelector('link[rel=next]');

      // Add each post to the page
      posts.forEach(post => {
        postContainer.appendChild(post);
      });

      // Update themeGlobalS
      themeGlobal.currentPage = themeGlobal.currentPage + 1;
      themeGlobal.nextPageLink =  nextPage ? nextPage.getAttribute('href') : '';
      themeGlobal.nextPage = themeGlobal.nextPageLink ? themeGlobal.nextPage + 1 : NaN;
      themeGlobal.lastPage = themeGlobal.currentPage === themeGlobal.maxPages ? true : false;

      // Disable button on last page
      if (button && themeGlobal.lastPage) {
        button.disabled = true;
        button.classList.add('btn--disabled');
      }

      button ? button.classList.remove('is-loading') : '';
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
}

/** 
* Handle Post Card Tiers
*/ 
const handlePostCardTiers = () => {
  const elements = document.querySelectorAll('span[data-tiers]');

  elements.forEach(el => {
    let tiers = el.getAttribute('data-tiers').replaceAll('product:', '').split(',');
    el.innerText = tiers.join(", ");
  });
}


/** 
* DOM Loaded event
*/ 
const callback = () => {
  fitvids();
  handleSearch();
  handleLoadMore();
  handleImageGallery();
  handleMenu();
  handleUserMenu();
  handleThemeToggle();
  handleFloatingHeader();
  handleScrollTop();
  handleNotificationClose();
  handleSlider();
  handleExternalLinks();
  handleKeyboardEvents();
  handleProgressBar();
  handlePostCardTiers();
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener('DOMContentLoaded', callback);
}