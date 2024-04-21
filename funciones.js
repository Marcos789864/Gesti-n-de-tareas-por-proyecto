
const modal = document.getElementById("mainModal");

const openModal = () => 
{
    modal.showModal();
}



const modal2 = document.getElementById("mainModal2");

const openModal2 = () => 
{
    modal2.showModal();
}




const modal3 = document.getElementById("mainModal3");

const openModal3 = () => 
{
    modal3.showModal();
}

const closeModal3 = () => 
{
    modal3.close();
}

const modal4 = document.getElementById("mainModal4");

const openModal4 = () => 
{
    modal4.showModal();
}

const closeModal4 = () => 
{
    modal4.close();
}

var Proyectos = [];
var Tareas = [];

const closeModal = () => {
    modal.close();
};

function mostrarSweetAlert() {
    swal({
        icon: "success",
        title: "¡Proyecto creado!",
        text: "Tu proyecto se ha creado exitosamente.",
        onOpen: function () {
            document.querySelector('.swal-overlay').style.zIndex = '10000';
        }
    });
}

function VerificarNombre(pro) {
    if (Proyectos.length === 0) {
        Proyectos.push(pro);
        closeModal();
        mostrarSweetAlert();
    } else {
        if (BuscarProyecto(pro) === false) {
            Proyectos.push(pro);
            closeModal();
            mostrarSweetAlert();
        } else {
            alert("Este proyecto ya existe, ingrese otro nombre");
        }
    }
}



function CrearProyecto()
{
    const Proyecto =
{
    nombre: "",
    descripcion: null
}
    Proyecto.nombre = document.getElementById("Proyecto").value;
    Proyecto.descripcion = document.getElementById("descripcion").value;
    VerificarNombre(Proyecto);
}

function closeModal2() {
    // Cerrar el modal aquí
    modal2.close();

    // Mostrar el SweetAlert después de cerrar el modal
    swal({
        icon: "success",
        title: "¡Tarea agregada!",
        text: "Tu tarea se ha agregado exitosamente.",
        onOpen: function () {
            // Establecer un z-index alto para el SweetAlert
            document.querySelector('.swal-overlay').style.zIndex = '10000';
        }
    });
}

function AgregarTarea() {
    const Tarea = {
        nombre: "",
        descripcion: "",
        estado: "Pendiente",
        fechaVencimiento: "",
        idProyecto: null
    };

    var nombreProyecto = document.getElementById("nombreProyecto").value;
    Tarea.nombre = document.getElementById("Tarea").value;
    Tarea.descripcion = document.getElementById("descripcionT").value;
    var fecha = document.getElementById("Fecha").value;

    let D = fecha.split("-")

    var newfecha = new Date(D[0],D[1]-1,D[2]);

    var hoy = new Date();
    var año = hoy.getFullYear();
    var mes = hoy.getMonth()+1;
    var dia = hoy.getDate();

    if(mes < 10) {
        mes = '0' + mes;
    }
    if(dia < 10) {
        dia = '0' + dia;
    }

    var fecha2 = new Date(parseInt(año),parseInt(mes)-1,parseInt(dia));

    if(fecha2 <= newfecha) {
        Tarea.fechaVencimiento = fecha;
    } else {
        alert("Debe ingresar un vencimiento válido");
        return; // Detener la ejecución si la fecha de vencimiento no es válida
    }
    
    if(Tarea.nombre == "" || Tarea.descripcion == "") {
        alert("Debe ingresar datos en los campos");
        return; // Detener la ejecución si algún campo está vacío
    }

    if(BuscarProyecto(nombreProyecto) == true) {
        Tarea.idProyecto = nombreProyecto;
        Tareas.push(Tarea);
        closeModal2(); // Cerrar el modal y mostrar el SweetAlert
    } else {
        alert("Ingrese un proyecto válido en el cual se puedan agregar tareas");
    }
}

function MostrarTarea()
{
    var container = document.querySelector(".container");
    var nombre = document.getElementById("nombreProyecto").value;
    var arrTareas = [];
    var x = 0;
    const nom = 
    {
        nombre: "",
        desc: "",
        fecha: ""
    }
   if (BuscarProyecto(nombre) == true)
   {

    for(let i = 0; i < Proyectos.length;i++)
    {
       while(x < Tareas.length)
       {
            if(Proyectos[i].nombre == Tareas[x].idProyecto )
            {
                nom.nombre = Tareas[x].nombre;
                nom.desc = Tareas[x].descripcion;
                nom.fecha = Tareas[x].fechaVencimiento;
                arrTareas.push(nom);
            }
            x++
       }
    }

    let In = document.createElement("input");
    In.setAttribute("type","checkbox");
    let lbl = document.createElement("label");
    let lbl2 = document.createElement("label");
    let lbl3 = document.createElement("label");

    In.addEventListener('change',function()
        {
           if(In.checked)
           {
            lbl.style.textDecoration = "line-through";
            lbl2.style.textDecoration = "line-through";
            lbl3.style.textDecoration = "line-through";
            Tarea.estado = "completado";
           } 
           else
           {
            lbl.style.textDecoration = "none";
            lbl2.style.textDecoration = "none";
           }
        })

    for(let y = 0; y < arrTareas.length;y++)
    {
        lbl.innerHTML = arrTareas[y].nombre + ' ';
        lbl2.innerHTML = arrTareas[y].desc + ' ';
        lbl3.innerHTML = arrTareas[y].fecha;
            container.appendChild(In);
            container.appendChild(lbl);
            container.appendChild(lbl2);
            container.appendChild(lbl3);
    }

   }

}

function BuscarVencimiento()
{
    var container = document.querySelector(".container2");
    var fecha = document.getElementById("Fecha").value;

    let lbl = document.createElement("label"); 
    let lbl2 = document.createElement("label"); 
    let lbl3= document.createElement("label"); 
    let lbl4= document.createElement("label"); 
     for(let i = 0;i< Tareas.length;i++)
     {
        if(fecha == Tareas[i].fechaVencimiento)
        {
            lbl.innerHTML = Tareas[i].nombre + ' ';
            lbl2.innerHTML = Tareas[i].idProyecto + ' ';
            lbl3.innerHTML = Tareas[i].descripcion+ ' ';
            lbl4.innerHTML = Tareas[i].fechaVencimiento;
            container.appendChild(lbl);
            container.appendChild(lbl2);
            container.appendChild(lbl3);
            container.appendChild(lbl4);
        }
     }
}

function BuscarProyecto(nombreProyecto)
{
    var i = 0
    while(i < Proyectos.length )
    {
        if(nombreProyecto == Proyectos[i].nombre)
        {
           return true;
        }
        i++;
    }
    return false;
}


