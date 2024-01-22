//header include
const header = document.querySelector('header');
fetch('/views/content/inc/header.ejs')
.then(res => res.text())
.then(data => header.innerHTML = data);

//footer include
const footer = document.querySelector('footer');
fetch('/views/content/inc/footer.ejs')
.then(res => res.text())
.then(data => footer.innerHTML = data);