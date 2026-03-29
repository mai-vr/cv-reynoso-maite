const $items = document.querySelectorAll('.experience-menu li')
const $content = document.getElementById('experience-content')
const $nameInput = document.getElementById('name')
const $emailInput = document.getElementById('email')
const $messageInput = document.getElementById('message')
const $form = document.querySelector('form')
const $error = document.querySelectorAll('.error-message')
const $success = document.querySelector('.success-message')

// Información en la sección 'experiencia'.
const data = [
    {
        company: 'Mercado Libre',
        years: '2025 - now',
        role: 'Frontend developer',
        description: 'Worked at Mercado Libre as part of the web development team, responsible for creating and maintaining user interfaces using HTML, CSS, and JavaScript.',
        webSite: 'https://www.mercadolibre.com.ar/',
    },
    {
        company: 'Accenture',
        years: '2024 - 2025',
        role: 'Frontend developer',
        description: 'Collaborated as a Junior Frontend Developer at Accenture, contributing to the development of web interfaces for clients in diverse sectors.',
        webSite: 'https://www.accenture.com/ar-es'
    },
    {
        company: 'Pinterest',
        years: '2023 - 2024',
        role: 'Backend developer',
        description: 'Worked at Pinterest as a Backend Developer, developing and maintaining scalable APIs and services. I also focused on optimizing database queries to improve platform performance and data retrieval speeds.',
        webSite: 'https://ar.pinterest.com/'
    }
]

$items.forEach((item, index) => {
    item.addEventListener('click', () => {
        showData(index)
    })
})

function showData(index) {
    const info = data[index]
    
    $content.innerHTML = `
    <div class="job-data">
        <div class="job-title">
            <h2>
                ${info.company}
            </h2>
            <p>
                ${info.years}
            </p>
        </div>
        <h4>
            ${info.role}
        </h4>
        <p>
            ${info.description}
        </p>
        <div class="job-footer">
            <a href=${info.webSite} target="_blank">Oficial web site</a>
            <a href="mailto:maitereynosov@gmail.com">Contact</a>
        </div>
    </div>
    `
}
showData(0)

// Formulario de contacto.
const sendForm = async (event) => {
    event.preventDefault()

    $error.forEach(e => e.style.display = 'none')
    $success.style.display = 'none'

    const name = $nameInput.value
    const email = $emailInput.value
    const message = $messageInput.value

    console.log(name, email, message)
    if (!name) {
        $error[0].style.display = 'block'
        return
    } else if (!email) {
        $error[1].style.display = 'flex'
        return
    } else if (!message) {
        $error[2].style.display = 'flex'
        return
    }

    const formData = new FormData($form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            $success.style.display = 'flex';
            $form.reset();
        }
    } catch (error) {
        console.log(error)
    }

    $success.style.display = 'flex'
    $form.reset()
}

$error.forEach(e => e.style.display = 'none')
$success.style.display = 'none'
$form.addEventListener('submit', sendForm)