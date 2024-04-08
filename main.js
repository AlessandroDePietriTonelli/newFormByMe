const form = document.querySelector('#formulario');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const passConfirma = document.getElementById('passConfirma');


function formSubmit(e){
    e.preventDefault()
    validaCampos()
}

const validaCampos = () => {
    const usuarioValor = usuario.value.trim();
    const emailValor = email.value.trim();
    const passValor = pass.value.trim();
    const passConfirmaValor = passConfirma.value.trim();
    //valida usuario
    (!usuarioValor) ? validaFalla(usuario, 'Campo vacio') : validaOk(usuario);
    //valida e-mail
    (!emailValor) ? validaFalla(email, 'Campo vacio') : (!validaEmail(emailValor)) 
                  ? validaFalla(email, 'El e-mail no es valido') : validaOk(email);
    //valida password
    if (!passValor) {
        validaFalla(pass, 'Campo vacio')
    } else if (passValor.length < 8) {
        validaFalla(pass, 'Debe tener 8 caracteres como minimo')
    } else if (!validaPassword(passValor)) {
        validaFalla(pass, 'Debe tener al menos una may., una min., y un num.')
    } else {
        validaOk(pass)
    }
    //valida confirma password
    (!passConfirmaValor) ? validaFalla(passConfirma, 'Confirme su password') : (passValor !== passConfirmaValor)
                         ? validaFalla(passConfirma, 'La password no coincide') : validaOk(passConfirma);
}

const validaFalla = (input, msje) => {
    const formControl = input.parentElement;
    const aviso = formControl.querySelector('p');
    aviso.innerText = msje;
    formControl.className = 'form-control falla'
} 

const validaOk = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control ok'
}

const validaEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validaPassword = pass => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass)
}