document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario-busqueda').addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío normal del formulario
        
        const data = {
            estado: document.getElementById('estado').value,
            operacion: document.getElementById('operacion').value,
            precioMin: document.getElementById('precio_min').value,
            precioMax: document.getElementById('precio_max').value,
            // Agrega aquí otros datos que necesites enviar
        };
        
        fetch('/recopilador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Datos enviados con éxito.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar los datos.');
        });
    });
});
