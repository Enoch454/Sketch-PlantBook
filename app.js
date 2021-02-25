const grid = new Muuri(".grid", {
    rounding: false,
});

window.addEventListener('load', ()=>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');

    // Eventos para filtrado por categoria
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            (categoria == 'todos') ? grid.filter("[data-categoria]") : grid.filter("[data-categoria='"+ categoria +"']");
                console.log(categoria);
            
        });
    });

    // Eventos para filtrado por busqueda
    document.querySelector("#barra-busqueda").addEventListener('input', (evento) => {
        const valor = evento.target.value;
        grid.filter((item) => {
            return item.getElement().dataset.tags.includes(valor);
        });
        //console.log(valor);
    });

    //Evento para abrir imagenes
    const overlay = document.getElementById("overlay");
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        elemento.addEventListener('click', ()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.querySelector('img').src = ruta;
            overlay.querySelector('.descripcion').innerHTML = descripcion;
            overlay.classList.add('activo');
        })
    });

    //Evento de cerrar overlay
    document.querySelector("#btn-cerrar-popup").addEventListener('click', () =>{
        overlay.classList.remove('activo');
    })
    overlay.addEventListener('click', (evento) =>{
        (evento.target.id === 'overlay') ? overlay.classList.remove('activo'):('');
    })
})
