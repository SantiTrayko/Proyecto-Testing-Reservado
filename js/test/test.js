const assert = chai.assert;

//función que mockea restaurarnt para los test
function mock(){
    var restaurant = new Restaurant(1, "Tested", "Asiática", "Testinglandia", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
    return restaurant;
};

//Esta función mockea una lista de restaurantes.
function mockListaRestaurant(){
    var listadoDeRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "19:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
            new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7])
        ];
        listadoDeRestaurantes = new Listado (listadoDeRestaurantes);
        return listadoDeRestaurantes;
};

describe('Test app reservado', () =>{

    describe('reservarHorario()', () =>{
        it('Eliminar horario existente del arreglo de horarios.', () =>{
            let testRestaurant = mock();
            testRestaurant.reservarHorario('13:00');
            let resultado = testRestaurant.horarios;

            assert.notInclude(resultado, '13:00');
        });
         
        it('El arreglo de horarios no se modificá al intentar eliminar un horario inexistente. ', () =>{
            let testRestaurant = mock();
            let valorInicial = testRestaurant.horarios;
            testRestaurant.reservarHorario('13:55');
            let resultado = testRestaurant.horarios;
            
            assert.deepStrictEqual(valorInicial, resultado);
        });

        it('El arreglo de horarios no se modificá al no pasar ningún parametro a la funcion reservarHorario().', () =>{
            let testRestaurant = mock();
            let valorInicial = testRestaurant.horarios;
            testRestaurant.reservarHorario();
            let resultado = testRestaurant.horarios; 
            
            assert.deepStrictEqual(valorInicial, resultado);
        });
    });

    describe('obtenerPuntuación()', () =>{
        it('Cálculo correcto del promedio.', () =>{
            let testRestaurant = mock();
            let resultado = testRestaurant.obtenerPuntuacion();
            let resultadoEsperado = 7.4;

             assert.strictEqual(resultado, resultadoEsperado);
        });

        it('La puntuación de un Restaurant sin calificacion es igual a 0.', () =>{
            let testRestaurant = mock();
            testRestaurant.calificaciones = [];
            let resultado = testRestaurant.obtenerPuntuacion();

            assert.strictEqual(resultado, 0);
        });
    });
    
    describe('calificar()', () =>{
        it('Adición de calificación valida.', () =>{
            let testRestaurant = mock();
            testRestaurant.calificar(4);
            let resultado = testRestaurant.calificaciones;

            assert.include(resultado, 4);
        });

        it('El arreglo de calificaciones no se modificá al intentar agregar una calificación con valor 0.', () =>{
            let testRestaurant = mock();
            let valorInicial = testRestaurant.calificaciones;
            testRestaurant.calificar(0);
            let resultado = testRestaurant.calificaciones;

            assert.deepStrictEqual(valorInicial, resultado);

        });
        
        it('El arreglo de calificaciones no se modificá al intentar agregar una calificacion con valor > 10.', () =>{
            let testRestaurant = mock();
            let valorInicial = [6, 7, 9, 10, 5];
            testRestaurant.calificar(11);
            let resultado = testRestaurant.calificaciones;

            assert.deepStrictEqual(valorInicial, resultado)
        });
    });

    describe('buscarRestaurante(id)', () =>{
        it('Encuentra el restaurant correspondiente al pasar un id existente como parametro.', () =>{
            let listadoTestRestaurants = mockListaRestaurant();
            let restaurantId5 = listadoTestRestaurants.restaurantes[4];
            let resultado = listadoTestRestaurants.buscarRestaurante(5);

            assert.deepEqual(restaurantId5, resultado);
        });

        it('Al pasar un id inexistente devuelve un string, que deberia contener el mensaje de error.', () =>{
            let listadoTestRestaurants = mockListaRestaurant();
            let resultado = listadoTestRestaurants.buscarRestaurante(100000);
            
            assert.isString(resultado);
        });
    });
    
    describe('obtenerRestaurantes()', () =>{

        it('Obtener restaurant filtrando por horarios.', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "19:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
                new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7])
            ];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes(null, null, '19:00');
            assert.sameDeepMembers(resultadoEsperado, resultado);
        });

        it('Obtener un restaurant filtrando por un horario inexistente devuelve un arreglo vacio.', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes(null, null, '30:40');

            assert.deepStrictEqual(resultadoEsperado, resultado);
        });

        it('Obtener un restaurant filtrando por rubro.', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7])
            ];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes("Asiática", null, null);

            assert.sameDeepMembers(resultadoEsperado, resultado);
        });

        it('Obtener un restaurant filtrando por un rubro inexistente devuelve un arreglo vacio.', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes("testiatica", null, null);

            assert.deepStrictEqual(resultadoEsperado, resultado);
        });

        it('Obtener un restaurant filtrando por ciudad', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7])
            ];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes(null, "Nueva York", null);

            assert.sameDeepMembers(resultadoEsperado, resultado);
        });

        it('Obtener un restaurant filtrando por ciudad inexistente devulve un arreglo vacío.', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7])
            ];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes(null, "Nueva York", null);

            assert.sameDeepMembers(resultadoEsperado, resultado);
        });

        
    });
    
});