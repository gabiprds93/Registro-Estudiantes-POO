'use strict';
const aplicacion =
{
    elemento:
    {
        estudiantes: undefined,
        botonAgregar: undefined,
        botonMostrar: undefined,
        botonActualizar: undefined,
        botonEmpleabilidad: undefined,
        resultado: undefined,
        eventoAgregar: undefined,
        eventoMostrar: undefined,
        eventoActualizar: undefined,
        eventoEmpleabilidad: undefined,
    },
    
    inicio: function()
    {
        // Elementos
        aplicacion.elemento.estudiantes = [];
        aplicacion.elemento.botonAgregar = document.getElementById(`agregar`);
        aplicacion.elemento.botonMostrar = document.getElementById(`mostrar`);
        aplicacion.elemento.botonActualizar = document.getElementById(`actualizar`);
        aplicacion.elemento.botonEmpleabilidad = document.getElementById(`empleabilidad`);
        aplicacion.elemento.resultado = document.getElementById(`contenedor-estudiantes`);
        aplicacion.eventos();
        aplicacion.establecer();
    },
    
    eventos: function()
    {
        // Eventos Click
        aplicacion.elemento.eventoAgregar = function(e) 
        {
            e.preventDefault();
            let estudiante =  aplicacion.agregarEstudiante();
            aplicacion.elemento.resultado.innerHTML = aplicacion.mostrar(estudiante);
        };

        aplicacion.elemento.eventoMostrar = function(e) 
        {
            e.preventDefault();
            let estudiantes = aplicacion.obtenerListaEstudiantes();
            aplicacion.elemento.resultado.innerHTML = aplicacion.mostrarLista(estudiantes);
        };

        aplicacion.elemento.eventoActualizar = function(e) 
        {
            e.preventDefault();
            let estudiantes = aplicacion.obtenerListaEstudiantes();
            let estudiantesActualizar = aplicacion.actualizar(estudiantes);
            aplicacion.elemento.resultado.innerHTML = aplicacion.mostrarLista(estudiantesActualizar);
        };

        aplicacion.elemento.eventoEmpleabilidad = function(e) 
        {
            e.preventDefault();
            let estudiantes = aplicacion.obtenerListaEstudiantes();
            let estudiantesEmpleabilidad = aplicacion.empleabilidad(estudiantes);
            aplicacion.elemento.resultado.innerHTML = aplicacion.mostrarLista(estudiantesEmpleabilidad);
        };
    },
    
    establecer: function()
    {
        // Manejadores de eventos
        aplicacion.elemento.botonAgregar.addEventListener(`click`, aplicacion.elemento.eventoAgregar);
        aplicacion.elemento.botonMostrar.addEventListener(`click`, aplicacion.elemento.eventoMostrar);
        aplicacion.elemento.botonActualizar.addEventListener(`click`, aplicacion.elemento.eventoActualizar);
        aplicacion.elemento.botonEmpleabilidad.addEventListener(`click`, aplicacion.elemento.eventoEmpleabilidad);        
    },
    
    Estudiante: function(nombre, puntosTecnicos, puntosHSE)
    {
        this.nombre = nombre;
        this.puntosTecnicos = puntosTecnicos;
        this.puntosHSE = puntosHSE;
        this.estado = `Activa`;
    },
    
    obtenerListaEstudiantes: function() 
    {
        //Retornar la lista de estudiantes
        return aplicacion.elemento.estudiantes;
    },

    agregarEstudiante: function() 
    {
        //Preguntar al usuario por el nombre, puntos técnicos y puntos de HSE de un estudiante
        //El estudiante debe ser agregado a la lista de estudiantes
        //Retornar el estudiante recientemente creado
        let nombre = prompt(`Nombre de la estudiante`);
        let puntosTecnicos = prompt(`Porcentaje Técnico`);
        let puntosHSE = prompt(`Porcentaje Habilidades Socio-Emocionales`);
        while(nombre == `` && puntosTecnicos == `` && puntosHSE == ``)
        {
            alert(`No se ha ingresado alguno de los datos`);
            nombre = prompt(`Nombre de la estudiante`);
            puntosTecnicos = prompt(`Porcentaje Técnico`);
            puntosHSE = prompt(`Porcentaje Habilidades Socio-Emocionales`);
        }
        let estudiante = new aplicacion.Estudiante(nombre, puntosTecnicos, puntosHSE);
        aplicacion.elemento.estudiantes.push(estudiante);
        return estudiante;
    },

    mostrar: function(estudiante) 
    {
        //Completar el template para que muestre las propiedades correctas del estudiante 
        let resultado = ``;
        if(estudiante != undefined)
        {
            if(estudiante.nombre != null && estudiante.puntosTecnicos != null && estudiante.puntosHSE != null)
            {
                resultado += `<div class='row'>`;
                resultado += `<div class='col m12'>`;
                resultado += `<div class='card blue-grey darken-1'>`;
                resultado += `<div class='card-content white-text'>`;
                resultado += `<p><strong>Nombre: </strong>${estudiante.nombre}</p>`;
                resultado += `<p><strong>Puntos Técnicos: </strong>${estudiante.puntosTecnicos}%</p>`;
                resultado += `<p><strong>Puntos HSE: </strong>${estudiante.puntosHSE}%</p>`;
                resultado += `<p><strong>Estado: </strong>${estudiante.estado}</p>`;
                resultado += `</div>`;
                resultado += `</div>`;
                resultado += `</div>`;
                resultado += `</div>`;
            }
        }
        return resultado;
    },

    mostrarLista: function(estudiantes)
    {
        //Iterar la lista del estudiantes para devolverlos en el formato que usa la función mostrar(estudiante)
        //Retornar el template de todos los estudiantes
        return estudiantes.map(aplicacion.mostrar);
        /*let resultado = ``;
        for(let i in estudiantes)
        {
            resultado += mostrar(estudiantes[i]);
        }
        return resultado;*/
    },

    actualizar: function(estudiantes)
    {
        aplicacion.elemento.estudiantes = estudiantes.filter(function(estudiante)
        {
            return ((parseInt(estudiante.puntosTecnicos) + parseInt(estudiante.puntosHSE))/2 >= 70);
        });
        return aplicacion.elemento.estudiantes;
    },

    empleabilidad: function(estudiantes)
    {
        return estudiantes.filter(function(estudiante)
        {
            return ((parseInt(estudiante.puntosTecnicos) + parseInt(estudiante.puntosHSE))/2 >= 70);
        });
    }
}

function comenzar()
{
    aplicacion.inicio();
}

comenzar();