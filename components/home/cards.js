const API_KEY = '9b258781b31f46df940510b94e481f54';

const rowBtn = document.querySelector('.listStyleButtons__row');
const columnBtn = document.querySelector('.listStyleButtons__column');
let rowMode = true;

let cardList = document.querySelector('.cardList');

const insertImg = document.querySelector('.insertImg');
const modal = document.querySelector('.modal');
const overlayModal = document.querySelector('.overlay2');
const modalCross = document.querySelector('.modal__close');
const modalClose = document.querySelector('.mobileModalClose');
let modalOn = false;
let gameData = [];

let gamePage = 1;
const fullScrollLength = 1333;

const api = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=${gamePage}`
  );
  let data = await response.json();

  return data;
};

const apiById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  let data = await response.json();
  return data;
};

const getGameData = (gameData) => {
  let completeGameData;
  const promises = [];
  gameData.forEach((element) => {
    const gameId = element.id;
    const promise = fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        completeGameData = Object.assign(element, data);
        return completeGameData;
      });
    promises.push(promise);
  });

  return Promise.all(promises);
};

const apiVideo = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
  );
  let data = await response.json();
  return data;
};
const generateCard = async (element, index) => {
  if (rowMode) {
    return `<div class="cardList--Row__card" id = "${element.id}">
            <img
                class="card__img"
                src="${element.background_image}"
                alt=""
            />
            <h2 class="card__item card__info noMargin">
                <span class="info__title">${element.name}</span>
                <span class="info__number">#${
                  20 * (gamePage - 1) + index + 1
                }</span>
            </h2>
            <div class="card__item card__releaseDate">
                <p class="releaseDate__txt noMargin">Release date:</p>
                <p class="releaseDate__date noMargin">${element.released}</p>
                <div class="releaseDate__consoles">${generatePlatforms(
                  element.parent_platforms,
                  true
                )}</div>
            </div>
            <div class="card__item card__genres">
                <p class="genres__txt noMargin">Genres:</p>
                <p class="genres__list noMargin">${generateGenres(
                  element.genres
                )}</p>
            </div>
            </div>`;
  } else if (!rowMode) {
    return `<div class="cardList--Column__card" id = "${element.id}">
        <img
            class="card__img"
            src="${element.background_image}"
            alt=""
        />
        <h2 class="card__item card__info noMargin">
            <span class="info__title">${element.name}</span>
            <span class="info__number">#${
              20 * (gamePage - 1) + index + 1
            }</span>
        </h2>
        <div class="card__item card__releaseDate">
            <p class="releaseDate__txt noMargin">Release date:</p>
            <p class="releaseDate__date noMargin">${element.released}</p>
            <p class="genres__txt noMargin">Genres:</p>
            <p class="genres__list noMargin">${generateGenres(
              element.genres
            )}</p>
            <div class="releaseDate__consoles">${generatePlatforms(
              element.parent_platforms
            )}
            </div>
        </div>
		<p class="card__desc">${element.description_raw}</p>
    </div>`;
  }
};

const generateGenres = (genresList) => {
  let genresCard = '';
  genresList.forEach((element) => {
    genresCard += element.name + ', ';
  });
  genresCard = genresCard.slice(0, -2);
  return genresCard;
};

const generatePlatforms = (platforms, isCard) => {
  let platformsList = '';
  platforms.forEach((element) => {
    switch (element.platform.name) {
      case 'PC':
        platformsList += `<svg aria-label="PC" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } fill-rule="evenodd" clip-rule="evenodd" d="M20 9.16667H9.16667V1.53647L20 0V9.16667ZM8.33333 1.66667V9.16667H0V2.77865L8.33333 1.66667ZM8.33333 10H0V17.0992L8.33333 18.3333V10ZM9.16667 18.3262V10H20V20L9.16667 18.3262Z"/>
                </svg>`;
        break;
      case 'PlayStation':
        platformsList += `<svg aria-label="Playstation" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } d="M9.55176 9.53674e-06L9.55176 18.2774L13.3605 19.5885L13.3605 4.26319C13.3605 3.54103 13.6568 3.06155 14.1321 3.22645C14.7535 3.41372 14.8743 4.07895 14.8743 4.79307L14.8743 10.9138C17.245 12.1606 19.1115 10.9131 19.1115 7.62345C19.1115 4.26188 18.0172 2.76435 14.7973 1.56033C13.5273 1.10084 11.1735 0.325457 9.55176 9.53674e-06Z"/>
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } d="M14.3506 16.9129L20.1079 14.3203C20.7592 14.0148 20.8587 13.5998 20.3316 13.3817C19.7962 13.1596 18.8406 13.2232 18.1824 13.5222L14.3506 15.2325V12.5036L14.57 12.412C14.57 12.412 15.6792 11.9148 17.2392 11.7008C18.7962 11.4848 20.7057 11.7289 22.2065 12.4446C23.8971 13.1241 24.0866 14.1153 23.6589 14.8051C23.2249 15.4877 22.1728 15.9815 22.1728 15.9815L14.3506 19.5367"/>
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } d="M1.7099 17.2146C-0.0868735 16.6444 -0.386499 15.4395 0.433179 14.7435C1.18926 14.1079 2.47691 13.6295 2.47691 13.6295L7.79974 11.4675V13.9281L3.97289 15.4908C3.29503 15.767 3.1934 16.1557 3.73939 16.359C4.29514 16.5706 5.28141 16.5137 5.95966 16.2286L7.79974 15.4728V17.6695C7.68114 17.6921 7.54927 17.715 7.42892 17.7384C5.5943 18.0852 3.63971 17.9428 1.7099 17.2146Z"/>
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } fill-rule="evenodd" clip-rule="evenodd" d="M23.7661 19.4589C23.6149 19.6145 23.4164 19.7024 23.2027 19.7024C22.989 19.7024 22.784 19.6145 22.6326 19.4589C22.4831 19.3005 22.4004 19.0936 22.4004 18.8706C22.4004 18.4089 22.7591 18.0357 23.2027 18.0357C23.4164 18.0357 23.6149 18.1208 23.7661 18.2798C23.9156 18.4352 24 18.6456 24 18.8706C24 19.0936 23.9156 19.3005 23.7661 19.4589ZM22.5352 18.8707C22.5352 18.6808 22.6033 18.5067 22.7279 18.3776C22.8555 18.2458 23.0258 18.1747 23.2027 18.1747C23.3798 18.1747 23.5458 18.2458 23.6703 18.3776C23.7959 18.5067 23.8638 18.6808 23.8638 18.8707C23.8638 19.2511 23.567 19.5599 23.2027 19.5599C23.0258 19.5599 22.8555 19.4896 22.7279 19.3594C22.6033 19.2281 22.5352 19.0558 22.5352 18.8707ZM23.5677 19.2169C23.5748 19.2384 23.5835 19.2511 23.5958 19.2548L23.607 19.2614V19.3143H23.4334L23.4302 19.3036L23.4184 19.2717C23.4164 19.2548 23.4141 19.2328 23.4117 19.1957L23.404 19.0508C23.402 18.9993 23.3859 18.9694 23.3561 18.9496C23.334 18.9419 23.3039 18.9359 23.259 18.9359H23.018V19.3143H22.8599V18.3849H23.2745C23.3421 18.3849 23.399 18.3975 23.4426 18.4167C23.53 18.4596 23.5748 18.5368 23.5748 18.6455C23.5748 18.6988 23.5621 18.7487 23.5402 18.7856C23.5212 18.8116 23.4988 18.8353 23.4744 18.8585L23.4809 18.8633C23.4974 18.8754 23.5138 18.8874 23.5235 18.9051C23.5456 18.9305 23.5556 18.9731 23.5574 19.028L23.5614 19.1463C23.5621 19.1766 23.5644 19.2002 23.5677 19.2169ZM23.3807 18.7599C23.4063 18.7427 23.4184 18.7085 23.4184 18.6561C23.4184 18.6009 23.4001 18.5641 23.3642 18.5458C23.3421 18.5368 23.3146 18.5303 23.2779 18.5303H23.018V18.7914H23.2635C23.3123 18.7914 23.3511 18.7809 23.3807 18.7599Z"/>
                </svg>`;
        break;
      case 'Xbox':
        platformsList += `<svg aria-label="Xbox" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.9286 0 13.5238 0.616246 14.9762 1.65266C15 1.65266 15 1.68067 15 1.70868C15 1.73669 14.9762 1.73669 14.9524 1.73669C13.0952 1.2605 10.2857 3.13725 10.0238 3.33333H10H9.97619C9.71429 3.13725 6.90476 1.2605 5.04762 1.73669C5.02381 1.73669 5 1.73669 5 1.70868C5 1.68067 5 1.65266 5.02381 1.65266C6.47619 0.616246 8.07143 0 10 0ZM16.3903 17.5988C17.8903 16.0464 12.9308 10.5648 10.0035 8.33333C10.0035 8.33333 9.97935 8.33333 9.97935 8.35759C7.07626 10.5648 2.09261 16.0464 3.61674 17.5988C5.31021 19.1026 7.56011 20 10.0035 20C12.447 20 14.6727 19.1026 16.3903 17.5988ZM2.73973 3.38078C2.72831 3.38078 2.7226 3.38705 2.7169 3.39332C2.71119 3.39959 2.70548 3.40585 2.69406 3.40585C1.0274 5.2358 0 7.76763 0 10.5501C0 12.8313 0.707763 14.9621 1.87215 16.6416C1.87215 16.6667 1.89498 16.6667 1.91781 16.6667C1.94064 16.6667 1.94064 16.6416 1.91781 16.6165C1.21005 14.2351 4.79452 8.4946 6.64384 6.0881L6.66667 6.06303C6.66667 6.0501 6.66667 6.04384 6.66354 6.04081C6.6606 6.03796 6.6549 6.03796 6.64384 6.03796C3.83562 2.9797 2.89954 3.30558 2.73973 3.38078ZM13.3333 6.05268L13.3562 6.02759C16.1644 2.99144 17.1005 3.31764 17.2374 3.36782C17.2469 3.36782 17.2525 3.36782 17.2574 3.36962C17.2642 3.37215 17.2698 3.37825 17.2831 3.39291C18.9726 5.22464 20 7.75895 20 10.5442C20 12.8276 19.2922 14.9604 18.1279 16.6416C18.1279 16.6667 18.105 16.6667 18.0822 16.6667V16.6165C18.7671 14.2327 15.2055 8.48662 13.3562 6.07777C13.3333 6.07777 13.3333 6.05268 13.3333 6.05268Z"/>
                </svg>`;
        break;
      case 'Nintendo':
        platformsList += `<svg aria-label="Nintendo" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } fill-rule="evenodd" clip-rule="evenodd" d="M14.8842 20H11.8082C11.7298 20 11.667 19.9371 11.667 19.8585V0.125786C11.667 0.0628931 11.7141 0 11.7925 0H14.8842C17.7091 0 20.0003 2.2956 20.0003 5.12579V14.8742C20.0003 17.7044 17.7091 20 14.8842 20ZM17.6305 11.0063C17.6305 9.88994 16.7203 8.97799 15.6061 8.97799C14.4918 8.97799 13.5973 9.88994 13.5816 11.0063C13.5816 12.1226 14.4918 13.0346 15.6061 13.0346C16.7203 13.0346 17.6305 12.1226 17.6305 11.0063Z"/>
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } d="M3.33301 6.66667C3.33301 7.58333 4.08301 8.33333 4.99967 8.33333C5.91634 8.33333 6.66634 7.58333 6.66634 6.66667C6.66634 5.75 5.91634 5 4.99967 5C4.06912 5 3.33301 5.73611 3.33301 6.66667Z"/>
                <path class=${
                  isCard ? 'platformLogoCard' : 'platformLogoModal'
                } fill-rule="evenodd" clip-rule="evenodd" d="M5.31811 0H9.85318C9.93475 0 10 0.0628931 10 0.141509V19.8585C10 19.9371 9.93475 20 9.85318 20H5.31811C2.38173 20 0 17.7044 0 14.8742V5.12579C0 2.2956 2.38173 0 5.31811 0ZM5.31807 18.3963H8.33602V1.60382H5.31807C4.33928 1.60382 3.42574 1.98117 2.74058 2.64155C2.03912 3.30193 1.66391 4.18243 1.66391 5.12583V14.8743C1.66391 15.8177 2.05543 16.6982 2.74058 17.3585C3.42574 18.0346 4.33928 18.3963 5.31807 18.3963Z"/>
                </svg>`;
        break;
      default:
        break;
    }
  });
  return platformsList;
};

const generateDevelopers = (developerList) => {
  let developers = '';
  developerList.forEach((element) => {
    developers += element.name;
    if (element !== developerList[developerList.length - 1]) {
      developers += ', ';
    }
  });
  return developers;
};

const listPlatforms = (platforms) => {
  let platformsList = '';
  platforms.forEach((element) => {
    platformsList += element.platform.name;
    if (element !== platforms[platforms.length - 1]) {
      platformsList += ', ';
    }
    //TODO release date in the wrong format
  });
  return platformsList;
};
const closeModal = () => {
  insertImg.innerHTML = '';
  modal.innerHTML = '';
  modal.classList.toggle('hide');
  overlayModal.classList.toggle('hide');
  modalOn = false;
};
const openModal = async (game) => {
  //TODO q el website no se vaya tanto para la derecha, las chips no tienen los stilos ni la info bien kinda
  let promiseGame = await apiById(game.id);

  let website = promiseGame.website;

  let trailer = await apiVideo(game.id);
  let modalBg = `<img class="imgModal" src="${game.background_image}" alt="*" />`;
  insertImg.insertAdjacentHTML('beforeend', modalBg);
  let modalBody = `
        <button class="modal__close" onclick='closeModal()'>
            <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.585573 1.58644C0.960629 1.21148 1.46924 1.00083 1.99957 1.00083C2.5299 1.00083 3.03852 1.21148 3.41357 1.58644L13.9996 12.1729L24.5856 1.58644C24.7701 1.39541 24.9908 1.24303 25.2348 1.13821C25.4788 1.03339 25.7412 0.978213 26.0068 0.975906C26.2723 0.973598 26.5357 1.0242 26.7815 1.12477C27.0273 1.22534 27.2506 1.37385 27.4384 1.56164C27.6261 1.74944 27.7747 1.97275 27.8752 2.21856C27.9758 2.46436 28.0264 2.72774 28.0241 2.99331C28.0218 3.25888 27.9666 3.52133 27.8618 3.76535C27.757 4.00937 27.6046 4.23007 27.4136 4.41457L16.8276 15.0011L27.4136 25.5876C27.7779 25.9648 27.9795 26.47 27.9749 26.9945C27.9704 27.5189 27.76 28.0205 27.3892 28.3914C27.0184 28.7622 26.5168 28.9726 25.9924 28.9771C25.468 28.9817 24.9628 28.7801 24.5856 28.4157L13.9996 17.8292L3.41357 28.4157C3.03637 28.7801 2.53116 28.9817 2.00677 28.9771C1.48238 28.9726 0.980752 28.7622 0.609936 28.3914C0.23912 28.0205 0.0287811 27.5189 0.0242243 26.9945C0.0196674 26.47 0.221257 25.9648 0.585573 25.5876L11.1716 15.0011L0.585573 4.41457C0.210631 4.0395 0 3.53086 0 3.0005C0 2.47015 0.210631 1.96151 0.585573 1.58644Z"
                    fill="white"
                />
            </svg>
        </button>
        <div class="modal__body">
            <div class="body__logos">
                ${generatePlatforms(game.parent_platforms, false)}
            </div>
            <h2 class="body__title">${game.name}</h2>
            <div class="body__chips">
                <button class="chips__round">${game.released}</button>
                <button class="chips__round">top2021</button>
                <button class="chips__round">#9rpg</button>
            </div>
            <div class="body__info">
                <div class="info__first">
                    <p class="first__description">${game.description_raw}</p>
                    <div class="first__buttons">
                        <button class="buttons__wishlist">
                            <div>Add to Wishlist</div>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <mask
                                    id="path-1-outside-1_7130_139"
                                    maskUnits="userSpaceOnUse"
                                    x="3"
                                    y="3.49951"
                                    width="18"
                                    height="17"
                                    fill="black"
                                >
                                    <rect
                                        fill="white"
                                        x="3"
                                        y="3.49951"
                                        width="18"
                                        height="17"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10.4373 4.93396C11.0427 5.22094 11.5766 5.63927 12 6.15852C12.826 5.14552 14.09 4.49952 15.5 4.49952C17.976 4.49952 20 6.48952 20 8.96652C20 11.2175 18.733 13.3065 17.273 15.0105C15.792 16.7385 13.976 18.2285 12.614 19.2885C12.4385 19.4251 12.2224 19.4992 12 19.4992C11.7776 19.4992 11.5615 19.4251 11.386 19.2885C10.024 18.2285 8.208 16.7395 6.727 15.0105C5.267 13.3065 4 11.2175 4 8.96652C4 6.48952 6.024 4.49952 8.5 4.49952C9.17001 4.49857 9.83181 4.64698 10.4373 4.93396Z"
                                    />
                                </mask>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.4373 4.93396C11.0427 5.22094 11.5766 5.63927 12 6.15852C12.826 5.14552 14.09 4.49952 15.5 4.49952C17.976 4.49952 20 6.48952 20 8.96652C20 11.2175 18.733 13.3065 17.273 15.0105C15.792 16.7385 13.976 18.2285 12.614 19.2885C12.4385 19.4251 12.2224 19.4992 12 19.4992C11.7776 19.4992 11.5615 19.4251 11.386 19.2885C10.024 18.2285 8.208 16.7395 6.727 15.0105C5.267 13.3065 4 11.2175 4 8.96652C4 6.48952 6.024 4.49952 8.5 4.49952C9.17001 4.49857 9.83181 4.64698 10.4373 4.93396Z"
                                    fill="white"
                                />
                                <path
                                    d="M12 6.15852L11.225 6.7905L12 7.74088L12.775 6.79046L12 6.15852ZM10.4373 4.93396L10.8656 4.03033L10.4373 4.93396ZM17.273 15.0105L18.0323 15.6613L18.0324 15.6612L17.273 15.0105ZM12.614 19.2885L13.228 20.0778L13.2282 20.0777L12.614 19.2885ZM11.386 19.2885L10.7718 20.0777L10.772 20.0778L11.386 19.2885ZM6.727 15.0105L7.48647 14.36L7.48638 14.3599L6.727 15.0105ZM8.5 4.49952V5.49952L8.50142 5.49952L8.5 4.49952ZM12.775 5.52653C12.2576 4.8921 11.6053 4.38097 10.8656 4.03033L10.0089 5.83759C10.4801 6.06091 10.8955 6.38644 11.225 6.7905L12.775 5.52653ZM15.5 3.49952C13.7788 3.49952 12.2341 4.28904 11.225 5.52657L12.775 6.79046C13.4179 6.00199 14.4012 5.49952 15.5 5.49952V3.49952ZM21 8.96652C21 5.92752 18.5185 3.49952 15.5 3.49952V5.49952C17.4335 5.49952 19 7.05151 19 8.96652H21ZM18.0324 15.6612C19.5402 13.9014 21 11.5812 21 8.96652H19C19 10.8538 17.9258 12.7116 16.5136 14.3599L18.0324 15.6612ZM13.2282 20.0777C14.601 19.0093 16.483 17.469 18.0323 15.6613L16.5137 14.3598C15.101 16.0081 13.351 17.4477 11.9998 18.4994L13.2282 20.0777ZM12 20.4992C12.4448 20.4992 12.8769 20.3509 13.228 20.0778L12 18.4992L12 18.4992V20.4992ZM10.772 20.0778C11.1231 20.3509 11.5552 20.4992 12 20.4992V18.4992V18.4992L10.772 20.0778ZM5.96753 15.6611C7.517 17.47 9.39929 19.0095 10.7718 20.0777L12.0002 18.4994C10.6487 17.4475 8.899 16.009 7.48647 14.36L5.96753 15.6611ZM3 8.96652C3 11.5812 4.45985 13.9014 5.96762 15.6612L7.48638 14.3599C6.07415 12.7116 5 10.8538 5 8.96652H3ZM8.5 3.49952C5.48147 3.49952 3 5.92752 3 8.96652H5C5 7.05151 6.56653 5.49952 8.5 5.49952V3.49952ZM10.8656 4.03033C10.1258 3.67969 9.31722 3.49836 8.49858 3.49952L8.50142 5.49952C9.0228 5.49878 9.5378 5.61427 10.0089 5.83759L10.8656 4.03033Z"
                                    fill="white"
                                    mask="url(#path-1-outside-1_7130_139)"
                                />
                            </svg>
                        </button>
                        <button class="buttons__purchase">
                            Purchase
                        </button>
                    </div>
                    <div class="first__txt">
                        <div class="txt__left">
                            <div class="left__platforms">
                                <p class="platforms__title modalTitle">
                                    Platforms
                                </p>
                                <p class="platforms__list infoTxt">
                                    ${listPlatforms(game.platforms)}
                                </p>
                            </div>
                            <div class="left__releaseDate">
                                <p
                                    class="releaseDate__title modalTitle"
                                >
                                    Release Date
                                </p>
                                <p class="releaseDate__list infoTxt">
                                    ${game.released}
                                </p>
                            </div>
                            <div class="left__publisher">
                                <p class="publisher__title modalTitle">
                                    Publisher
                                </p>
                                <p class="publisher__list infoTxt">
                                    ${game.publishers}
                                </p>
                            </div>
                            <div class="left__website">
                                <p class="website__title modalTitle">
                                    Website
                                </p>
                                <a src="${website}" class="website__list">
                                    ${website}
                                </a>
                            </div>
                        </div>
                        <div class="txt__right">
                            <div class="right__genres">
                                <p class="genres__title modalTitle">
                                    Genres
                                </p>
                                <p class="genres__list infoTxt">
                                    ${generateGenres(game.genres)}
                                </p>
                            </div>
                            <div class="right__developer">
                                <p class="developer__title modalTitle">
                                    Developer
                                </p>
                                <p class="developer__list infoTxt">
                                    ${generateDevelopers(game.developers)}
                                </p>
                            </div>
                            <div class="right__ageRating">
                                <p class="ageRating__title modalTitle">
                                    Age Rating
                                </p>
                                <p class="ageRating__list infoTxt">
                                    ${game.esrb_rating.name}
                                </p>
                            </div>
                            <div class="right__icons">
                                <svg
                                    width="28"
                                    height="26"
                                    viewBox="0 0 28 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M27.7666 20.4307L27.7678 20.4342C28.1528 20.9358 28.3371 22.6029 25.6969 22.3066C24.6128 22.2007 23.5472 21.9536 22.5271 21.5716C21.7298 21.2659 20.9672 20.8764 20.2521 20.4097C19.1924 20.8361 18.07 21.086 16.9294 21.1493C16.1155 22.2415 15.0575 23.1282 13.8399 23.7387C12.6222 24.3492 11.2787 24.6666 9.9166 24.6655C8.99755 24.6663 8.08411 24.5222 7.20994 24.2385C6.6966 24.536 6.11327 24.8265 5.46927 25.0703C4.1626 25.5649 3.07877 25.7504 2.29944 25.8053C1.7161 25.8484 1.30427 25.8181 1.10127 25.7948C0.655603 25.7434 0.256603 25.4891 0.0839368 25.0621C0.00978686 24.8774 -0.0158467 24.6767 0.00947561 24.4792C0.0347979 24.2818 0.110233 24.0941 0.228603 23.934C0.522603 23.5315 0.79327 23.1104 1.04994 22.6834C1.54927 21.8504 2.03927 20.9522 2.16294 19.9745C1.61584 18.9301 1.28547 17.786 1.19167 16.6107C1.09786 15.4354 1.24257 14.2533 1.61709 13.1354C1.9916 12.0174 2.58821 10.9867 3.37108 10.1051C4.15394 9.22352 5.10692 8.50922 6.17277 8.00512C6.54594 6.59531 7.20873 5.27869 8.1189 4.13917C9.02907 2.99966 10.1667 2.06224 11.4592 1.38666C12.7517 0.711084 14.1708 0.31216 15.626 0.215316C17.0812 0.118471 18.5406 0.325829 19.9113 0.824175C21.2819 1.32252 22.5337 2.10093 23.5868 3.10978C24.64 4.11863 25.4714 5.33581 26.0281 6.68375C26.5849 8.03168 26.8547 9.4808 26.8203 10.9388C26.786 12.3967 26.4483 13.8315 25.8288 15.1518C25.6071 17.163 26.6186 18.8558 27.7654 20.4307H27.7666ZM8.1666 10.6662C8.16724 9.43561 8.44598 8.22112 8.98199 7.11344C9.518 6.00576 10.2974 5.03352 11.262 4.26939C12.2266 3.50526 13.3514 2.96898 14.5524 2.70065C15.7534 2.43231 16.9995 2.43884 18.1976 2.71976C19.3957 3.00068 20.5149 3.54871 21.4714 4.32292C22.4279 5.09712 23.1971 6.07748 23.7214 7.19072C24.2458 8.30396 24.5118 9.52131 24.4995 10.7518C24.4873 11.9823 24.1971 13.1941 23.6506 14.2966C23.5946 14.4093 23.5572 14.5302 23.5398 14.6548C23.2843 16.4922 23.7148 18.1675 24.5956 19.7762C23.3214 19.4662 22.1205 18.9093 21.0606 18.1371C20.8903 18.0136 20.6899 17.9385 20.4804 17.9196C20.2709 17.9007 20.0602 17.9388 19.8706 18.0298C18.6254 18.6282 17.2488 18.9009 15.8695 18.8224C14.4903 18.744 13.1535 18.317 11.9842 17.5813C10.8149 16.8456 9.8513 15.8253 9.18365 14.616C8.51599 13.4066 8.16607 12.0476 8.1666 10.6662ZM5.83794 10.9625C5.90356 13.2834 6.73632 15.5171 8.20607 17.3146C9.67582 19.1121 11.6997 20.372 13.9614 20.8973C12.8189 21.8277 11.39 22.3346 9.9166 22.3323C9.06494 22.3323 8.25644 22.1678 7.51677 21.8691C7.34362 21.7991 7.15618 21.7716 6.97021 21.7891C6.78425 21.8065 6.60519 21.8684 6.4481 21.9694C5.93594 22.2996 5.3281 22.6286 4.6421 22.8887C4.23645 23.0434 3.82146 23.1724 3.3996 23.2749C3.7881 22.5667 4.18127 21.7233 4.36094 20.93C4.45077 20.5368 4.50094 20.1554 4.52194 19.7972C4.53617 19.5669 4.48177 19.3375 4.3656 19.1381C3.79639 18.1598 3.49762 17.0477 3.49994 15.9159C3.49994 13.921 4.40994 12.1396 5.83794 10.9625Z"
                                        fill="#36B972"
                                    />
                                </svg>
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12.8022 5.76804C12.5688 6.94987 12.1768 8.72321 10.7418 10.1582C10.6112 10.2889 10.4677 10.4265 10.316 10.5735C8.98366 11.858 7.00033 13.7714 7.00033 16.9167C7.00033 18.6235 7.73532 20.2417 8.86816 21.4375C10.008 22.6404 11.4675 23.3334 12.8337 23.3334H18.667C19.0777 23.3334 19.4207 23.2284 19.6237 23.0919C19.7928 22.9799 19.8337 22.8819 19.8337 22.75C19.8337 22.6194 19.7928 22.5202 19.6237 22.4082C19.4207 22.2729 19.0777 22.1667 18.667 22.1667H17.5003C17.1909 22.1667 16.8942 22.0438 16.6754 21.825C16.4566 21.6062 16.3337 21.3095 16.3337 21C16.3337 20.6906 16.4566 20.3939 16.6754 20.1751C16.8942 19.9563 17.1909 19.8334 17.5003 19.8334H19.2503C19.661 19.8334 20.004 19.7284 20.207 19.5919C20.3762 19.4799 20.417 19.3819 20.417 19.25C20.417 19.1194 20.3762 19.0202 20.207 18.9082C20.004 18.7729 19.661 18.6667 19.2503 18.6667H18.0837C17.7742 18.6667 17.4775 18.5438 17.2587 18.325C17.0399 18.1062 16.917 17.8095 16.917 17.5C16.917 17.1906 17.0399 16.8939 17.2587 16.6751C17.4775 16.4563 17.7742 16.3334 18.0837 16.3334H19.8337C20.2443 16.3334 20.5873 16.2284 20.7903 16.0919C20.9595 15.9799 21.0003 15.8819 21.0003 15.75C21.0003 15.6194 20.9595 15.5202 20.7903 15.4082C20.5873 15.2729 20.2443 15.1667 19.8337 15.1667H18.667C18.3576 15.1667 18.0608 15.0438 17.842 14.825C17.6232 14.6062 17.5003 14.3095 17.5003 14C17.5003 13.6906 17.6232 13.3939 17.842 13.1751C18.0608 12.9563 18.3576 12.8334 18.667 12.8334H19.8337C20.2443 12.8334 20.5873 12.7284 20.7903 12.5919C20.9595 12.4799 21.0003 12.3819 21.0003 12.25C21.0003 12.1194 20.9595 12.0202 20.7903 11.9082C20.5873 11.7729 20.2443 11.6667 19.8337 11.6667H14.5837C14.3982 11.6668 14.2153 11.6226 14.0503 11.5378C13.8854 11.4531 13.7429 11.3302 13.6349 11.1794C13.5269 11.0287 13.4564 10.8543 13.4292 10.6708C13.4021 10.4873 13.4191 10.3 13.4788 10.1244V10.1232L13.4835 10.1115L13.4987 10.0649L13.5605 9.86654C13.6118 9.69154 13.683 9.43837 13.7565 9.13387C13.9339 8.42023 14.0425 7.69123 14.0808 6.95687C14.1112 6.15771 14.005 5.54521 13.7915 5.17187C13.6655 4.95021 13.4753 4.75071 13.0332 4.68771C12.9772 4.87904 12.9258 5.14037 12.8512 5.52304L12.8022 5.76804V5.76804ZM16.1038 9.33337C16.2462 8.68237 16.3815 7.87154 16.413 7.04321C16.448 6.09237 16.3547 4.95487 15.818 4.01571C15.223 2.97037 14.1707 2.33337 12.717 2.33337C12.2713 2.33337 11.8537 2.48037 11.5153 2.77671C11.2085 3.04504 11.0335 3.37871 10.925 3.64704C10.7523 4.07521 10.645 4.63054 10.5552 5.09954L10.5132 5.31537C10.2868 6.46687 9.99049 7.61021 9.09216 8.50854C8.98949 8.61121 8.86466 8.73021 8.72232 8.86437C7.41216 10.1057 4.66699 12.7085 4.66699 16.9167C4.66699 19.2932 5.68199 21.4667 7.17416 23.0417C8.65933 24.6097 10.6998 25.6667 12.8337 25.6667H18.667C19.423 25.6667 20.2467 25.48 20.9187 25.0332C21.6245 24.5619 22.167 23.7849 22.167 22.75C22.167 22.2029 22.0153 21.7292 21.7703 21.3325C22.3408 20.8542 22.7503 20.1507 22.7503 19.25C22.7503 18.7029 22.5987 18.228 22.3537 17.8337C22.9242 17.3554 23.3337 16.6507 23.3337 15.75C23.3337 15.0395 23.0793 14.4515 22.6908 14C23.0782 13.5485 23.3337 12.9605 23.3337 12.25C23.3337 11.214 22.7912 10.4382 22.0853 9.96687C21.4133 9.51887 20.5897 9.33337 19.8337 9.33337H16.1038Z"
                                        fill="#36B972"
                                    />
                                </svg>
                                <svg
                                    width="18"
                                    height="24"
                                    viewBox="0 0 18 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.17484 0.675202C8.39362 0.456486 8.69032 0.333618 8.99968 0.333618C9.30903 0.333618 9.60573 0.456486 9.82451 0.675202L14.4912 5.34187C14.7037 5.56191 14.8213 5.85661 14.8186 6.1625C14.816 6.4684 14.6933 6.76101 14.477 6.97732C14.2607 7.19363 13.968 7.31633 13.6621 7.31899C13.3562 7.32165 13.0615 7.20405 12.8415 6.99154L10.1663 4.31637V15.5C10.1663 15.8095 10.0434 16.1062 9.82463 16.325C9.60584 16.5438 9.3091 16.6667 8.99968 16.6667C8.69026 16.6667 8.39351 16.5438 8.17472 16.325C7.95593 16.1062 7.83301 15.8095 7.83301 15.5V4.31637L5.15784 6.99154C4.93781 7.20405 4.6431 7.32165 4.33721 7.31899C4.03131 7.31633 3.7387 7.19363 3.52239 6.97732C3.30608 6.76101 3.18338 6.4684 3.18072 6.1625C3.17806 5.85661 3.29566 5.56191 3.50818 5.34187L8.17484 0.675202V0.675202ZM0.833008 13.1667C0.833008 12.2384 1.20176 11.3482 1.85813 10.6918C2.51451 10.0355 3.40475 9.6667 4.33301 9.6667H5.49968C5.80909 9.6667 6.10584 9.78962 6.32463 10.0084C6.54343 10.2272 6.66634 10.524 6.66634 10.8334C6.66634 11.1428 6.54343 11.4395 6.32463 11.6583C6.10584 11.8771 5.80909 12 5.49968 12H4.33301C4.02359 12 3.72684 12.123 3.50805 12.3417C3.28926 12.5605 3.16634 12.8573 3.16634 13.1667V20.1667C3.16634 20.4761 3.28926 20.7729 3.50805 20.9917C3.72684 21.2105 4.02359 21.3334 4.33301 21.3334H13.6663C13.9758 21.3334 14.2725 21.2105 14.4913 20.9917C14.7101 20.7729 14.833 20.4761 14.833 20.1667V13.1667C14.833 12.8573 14.7101 12.5605 14.4913 12.3417C14.2725 12.123 13.9758 12 13.6663 12H12.4997C12.1903 12 11.8935 11.8771 11.6747 11.6583C11.4559 11.4395 11.333 11.1428 11.333 10.8334C11.333 10.524 11.4559 10.2272 11.6747 10.0084C11.8935 9.78962 12.1903 9.6667 12.4997 9.6667H13.6663C14.5946 9.6667 15.4848 10.0355 16.1412 10.6918C16.7976 11.3482 17.1663 12.2384 17.1663 13.1667V20.1667C17.1663 21.095 16.7976 21.9852 16.1412 22.6416C15.4848 23.298 14.5946 23.6667 13.6663 23.6667H4.33301C3.40475 23.6667 2.51451 23.298 1.85813 22.6416C1.20176 21.9852 0.833008 21.095 0.833008 20.1667V13.1667Z"
                                        fill="#36B972"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info__second">
                  <video  class="second__trailer" poster="${
                    game.short_screenshots[0].image
                  }" ${trailer.results[0] ? 'controls' : ''}>
                    <source src=${
                      trailer.results[0]?.data['480'] || ''
                    } type="video/mp4">

                  </video>
                    
                    <div class="second__imageRow">
                        <img
                            class="imageRow__img"
                            src="${game.short_screenshots[1].image}"
                            alt="*"
                        />
                        <img
                            class="imageRow__img"
                            src="${game.short_screenshots[2].image}"
                            alt="*"
                        />
                    </div>
                    <div class="second__imageRow">
                        <img
                            class="imageRow__img"
                            src="${game.short_screenshots[3].image}"
                            alt="*"
                        />
                        <img
                            class="imageRow__img"
                            src="${game.short_screenshots[4].image}"
                            alt="*"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  modal.insertAdjacentHTML('beforeend', modalBody);
  modal.classList.toggle('hide');
  overlayModal.classList.toggle('hide');
};

const renderCards = async (api) => {
  const games = await api();
  const dataResults = games.results;
  let card;

  getGameData(dataResults).then((data) => {
    let htmlCard;
    data.forEach(async (element, index) => {
      card = await generateCard(element, index);
      cardList.insertAdjacentHTML('beforeend', card);
      htmlCard = document.getElementById(element.id);
      htmlCard.addEventListener('click', () => {
        if (!modalOn) {
          modalOn = true;
          openModal(element);
        }
        if (window.screen.width <= 400) {
          burgerMenu.classList.toggle('hide');

          modalClose.classList.toggle('hide');
        }
      });
    });
  });
};
renderCards(api);

columnBtn.addEventListener('click', () => {
  if (rowMode) {
    columnBtn.classList.toggle('listStyleButtons--off');
    columnBtn.classList.toggle('listStyleButtons--on');
    rowBtn.classList.toggle('listStyleButtons--on');
    rowBtn.classList.toggle('listStyleButtons--off');
    rowMode = !rowMode;
    cardList.classList.toggle('cardList--Row');
    cardList.classList.toggle('cardList--Column');
    cardList.innerHTML = '';
    gamePage = 1;
    renderCards(api);
  }
});
rowBtn.addEventListener('click', () => {
  if (!rowMode) {
    rowBtn.classList.toggle('listStyleButtons--off');
    rowBtn.classList.toggle('listStyleButtons--on');
    columnBtn.classList.toggle('listStyleButtons--on');
    columnBtn.classList.toggle('listStyleButtons--off');
    rowMode = !rowMode;
    cardList.classList.toggle('cardList--Column');
    cardList.classList.toggle('cardList--Row');
    cardList.innerHTML = '';
    gamePage = 1;
    renderCards(api);
  }
});

cardList.addEventListener('scroll', () => {
  if (
    cardList.scrollTop >=
    fullScrollLength * gamePage - (fullScrollLength * 20) / 100
  ) {
    gamePage++;
    renderCards(api);
  }
});

modalClose.addEventListener('click', () => {
  insertImg.innerHTML = '';
  modal.innerHTML = '';
  modal.classList.toggle('hide');
  overlayModal.classList.toggle('hide');
  modalClose.classList.toggle('hide');
  burgerMenu.classList.toggle('hide');
  modalOn = false;
});

const burgerLogout = document.querySelector('.burgerMenuDropdown__logout');
const headerLogout = document.querySelector('.profile__logout');

function logout() {
  sessionStorage.removeItem('userToken');
  window.location.replace('../..');
}

burgerLogout.addEventListener('click', () => {
  logout();
});
headerLogout.addEventListener('click', () => {
  logout();
});
