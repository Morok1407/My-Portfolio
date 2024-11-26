("use strict");

function loadHTML() {
    const navbarLinks = document.querySelectorAll('.navbar-link');

    navbarLinks.forEach((navLink) => {
        navLink.addEventListener('click', (event) => {
            event.preventDefault();

            const contant = document.getElementById('content')
            contant.classList.add('fade-out')
            
            setTimeout(() => {
                const page = navLink.getAttribute('data-page');
                loadPage(page);
            }, 300)
        })
    });

    loadPage('About');
}

function loadPage(page){
    fetch(`../../assets/template/${page}.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки страницы');
        }
        return response.text();
    })
    .then(data => {
        const contentElement = document.getElementById('content');
        
        const oldScripts = document.querySelectorAll('script[data-dynamic="true"]');
        oldScripts.forEach(script => script.remove())
        
        contentElement.innerHTML = data;
        
        const scripts = contentElement.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.text = script.textContent;
            newScript.setAttribute('data-dynamic', 'true')
            document.body.appendChild(newScript);
        });

        const contant = document.getElementById('content')
        setTimeout(() => {
            contant.classList.remove('fade-out')
        }, 100)
    })
    .catch(error => console.error('Ошибка загрузки файла:', error));
}
loadHTML();

function navBar(){
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    navbarLinks.forEach((navLink) => {
        navLink.addEventListener('click', function(){
            navbarLinks.forEach((link) => link.classList.remove('navbar-link--active'))
            navLink.classList.add('navbar-link--active');

            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }, 100)
        })
    })
}
navBar();

function myAge(){
    const data = new Date('2024-09-16')
    const myYears = document.getElementById('my-years')
    const myBirthday = new Date('2005-06-14');

    let age = data.getFullYear() - myBirthday.getFullYear()

    const monthDiff = data.getMonth() - myBirthday.getMonth()
    const daydiff = data.getDate() - myBirthday.getDate()

    age = (monthDiff < 0 || (monthDiff === 0 && daydiff < 0) ? age - 1 : age)

    myYears.textContent = age + ' лет';
}
myAge();

function moveButton() {
    const moveButton = document.getElementById('move-button')
    const exitButton = document.getElementById('exit-button')
    const main = document.getElementById('main')
    const aside = document.getElementById('aside')
    const navBarPhone = document.getElementById('navbar-phone')

    moveButton.addEventListener('click', () => {
        main.classList.add('animation')
        aside.classList.add('animation')
        main.classList.add('active')

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 200)

        setTimeout(() => {
            aside.classList.add('none')
            main.classList.remove('animation')
            navBarPhone.classList.add('animation')
            navBarPhone.classList.add('active')
        }, 300)
        setTimeout(() => {
            navBarPhone.classList.remove('animation')
        }, 600)

        loadHTML();

        const navbarLinks = document.querySelectorAll('.navbar-link');
        const navOne = document.getElementById('nav-one')
        
        navbarLinks.forEach((link) => link.classList.remove('navbar-link--active'))
        navOne.classList.add('navbar-link--active')
    })
    
    exitButton.addEventListener('click', () => {
        navBarPhone.classList.add('animation')
        
        setTimeout(() => {
            navBarPhone.classList.remove('active')
            main.classList.add('animation')
        }, 300)

        setTimeout(() => {
            aside.classList.remove('none')
        }, 600)

        setTimeout(() => {
            aside.classList.remove('animation')
            main.classList.remove('active')

            window.scrollTo({
                top: 0,
            });
        }, 700)
    })
}
moveButton()
