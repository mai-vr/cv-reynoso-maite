const $items = document.querySelectorAll('.experiencia-menu li')
const $contenido = document.getElementById('experiencia-contenido')
const $nombreInput = document.getElementById('nombre')
const $emailInput = document.getElementById('email')
const $mensajeInput = document.getElementById('mensaje')
const $form = document.querySelector('form')
const $error = document.querySelectorAll('.error-message')
const $exito = document.querySelector('.success-message')

// Información en la sección 'experiencia'.
const data = [
    {
        empresa: 'Mercado Libre',
        años: '2025 - actualidad',
        cargo: 'Frontend developer',
        descripcion: 'Trabajé en Mercado Libre formando parte del equipo de desarrollo web, donde me encargaba de crear y mantener interfaces de usuario utilizando tecnologías como HTML, CSS y JavaScript.',
        sitioWeb: 'https://www.mercadolibre.com.ar/',
    },
    {
        empresa: 'Accenture',
        años: '2024 - 2025',
        cargo: 'Frontend developer',
        descripcion: 'Trabajé en Accenture como desarrollador frontend junior, participando en el desarrollo de interfaces web para clientes de distintos sectores.',
        sitioWeb: 'https://www.accenture.com/ar-es'
    },
    {
        empresa: 'Pinterest',
        años: '2023 - 2024',
        cargo: 'Backend developer',
        descripcion: 'Trabajé en Pinterest como backend developer, desarrollando y manteniendo APIs y servicios escalables.',
        sitioWeb: 'https://ar.pinterest.com/'
    }
]

$items.forEach((item, index) => {
    item.addEventListener('click', () => {
        mostrarData(index)
    })
})

function mostrarData(index) {
    const info = data[index]
    
    $contenido.innerHTML = `
    <div class="trabajo-informacion">
        <div class="trabajo-titulo">
            <h2 class="company-title">
                ${info.empresa}
            </h2>
            <p class="company-working-years">
                ${info.años}
            </p>
        </div>
        <h4 class="job-role">
            ${info.cargo}
        </h4>
        <p class="job-role-description">
            ${info.descripcion}
        </p>
        <div class="trabajo-footer">
            <a href=${info.sitioWeb} target="_blank" class="company-link">Sitio web oficial</a>
            <a href="mailto:maitereynosov@gmail.com" class="company-mail">Contactate</a>
        </div>
    </div>
    `
}
mostrarData(0)

// Formulario de contacto.
const enviarFormulario = async (event) => {
    event.preventDefault()

    $error.forEach(e => e.style.display = 'none')
    $exito.style.display = 'none'

    const nombre = $nombreInput.value
    const email = $emailInput.value
    const mensaje = $mensajeInput.value

    console.log(nombre, email, mensaje)
    if (!nombre) {
        $error[0].style.display = 'block'
        return
    } else if (!email) {
        $error[1].style.display = 'flex'
        return
    } else if (!mensaje) {
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
            $exito.style.display = 'flex';
            $form.reset();
        }
    } catch (error) {
        console.log(error)
    }

    $exito.style.display = 'flex'
    $form.reset()
}

$error.forEach(e => e.style.display = 'none')
$exito.style.display = 'none'
$form.addEventListener('submit', enviarFormulario)