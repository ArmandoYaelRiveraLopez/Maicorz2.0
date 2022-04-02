$(function(){
    $(window).scroll(function(){
        var winTop = $(window).scrollTop();
        if(winTop >=60){
            $("body").addClass("sticky-header");
        }else{
            $("body").removeClass("sticky-header");
        }
    })
})
function validarn(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    var patron = /[A-z]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba);
}
function validarn2(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    var patron = /[A-z0-9.,]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba);
}
function validar(){

    var expr = /^[A-Za-z]{2,50}$/;


    var nombre = document.getElementById("Nombre").value;

    var Ap_pat = document.getElementById("Ap_pat").value;

    let Ap_mat = document.getElementById("Ap_mat").value;


    var valido1 = expr.test(nombre.trim());

    var valido2 = expr.test(Ap_pat.trim());

    let valido3 = expr.test(Ap_mat.trim());


    if(valido1==true){
        if(valido2==true){
            if(valido3==true){
                validarEmail(document.getElementById("correo").value);
            }else{
                document.getElementById("Nombre").value = "";
                document.getElementById("Ap_pat").value = "";
                document.getElementById("Ap_mat").value = "";
                swal("Datos no validos");
            }
        }else{
            document.getElementById("Nombre").value = "";
                document.getElementById("Ap_pat").value = "";
                document.getElementById("Ap_mat").value = "";
                swal("Datos no validos");
        }
    }else{
        document.getElementById("Nombre").value = "";
        document.getElementById("Ap_pat").value = "";
        document.getElementById("Ap_mat").value = "";
        swal("Datos no validos");
            
        
    }
}
function validarEmail(valor) {
    var expReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valido = expReg.test(valor);

    console.log(valido);

    if(valido==true){
        validarusaps();
    }else{
        swal("correo no valido");
        document.getElementById("correo").value = "";
    }
  }

function validarusaps(){
    var expr = /^[A-Za-z]{2,50}$/;
    var patron = /^[A-Za-z0-9.,]{2,30}$/;
    var usuario = document.getElementById("username").value;
    var contra = document.getElementById("password").value;
    var uval = expr.test(usuario.trim());
    var cval = patron.test(contra.trim());
    if(uval==true){
        if(cval==true){
            swal("Bienvenido" + usuario);
            document.getElementById("password").value = "";    
        }else{
            swal("Contraseña no valida");
            document.getElementById("password").value = "";
        }
    }else{
        swal("Usuario no valido");
            document.getElementById("username").value = "";
        
        
    }   
}

function validarlog(){
    var expr = /^[A-Za-z]{2,30}?$/;
    var patron = /[A-Za-z0-9.,]{2,30}/;
    var usuario = document.getElementById("username").value;
    var contra = document.getElementById("password").value;
    var uval = expr.test(usuario.trim());
    var cval = patron.test(contra.trim());
    if(uval==true){
        if(cval==true){
            swal("Bienvenido" + usuario);
        }else{
            swal("Contraseña no valida");
            document.getElementById("password").value = "";    
        }
    }else{
        swal("Usuario no valido");
        document.getElementById("username").value = "";
    }

}