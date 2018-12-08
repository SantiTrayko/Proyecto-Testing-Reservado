const assert = chai.assert;

describe('Test app reservado', () =>{
    //función que mockea restaurarnt para los test
    function mock(){
        var restaurant = new Restaurant(1, "Tested", "Asiática", "Testinglandia", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
        return restaurant;
    };

    describe('reservarHorario()', () =>{
        it('Eliminar horario existente del arreglo de horarios.', () =>{
            var testRestaurant = mock();
            testRestaurant.reservarHorario('13:00');
            let resultado = testRestaurant.horarios;

            assert.notInclude(resultado, '13:00');
        });
        
        it('El arreglo de horarios no se modifica al intentar eliminar un horario inexistente. ', () =>{
            let valorInicial = listadoDeRestaurantes[0].horarios;
            valorInicial = valorInicial.map((currentValue) =>{return currentValue});
            listadoDeRestaurantes[0].reservarHorario('13:55');
            let resultado = listadoDeRestaurantes[0].horarios; 
            
            assert.deepStrictEqual(valorInicial, resultado);
        })

        it('El arreglo de horarios no se modifica al no pasar ningun parametro a la funcion reservarHorario().', () =>{
            let valorInicial = listadoDeRestaurantes[0].horarios;
            valorInicial = valorInicial.map((currentValue) =>{return currentValue});
            listadoDeRestaurantes[0].reservarHorario();
            let resultado = listadoDeRestaurantes[0].horarios; 
            
            assert.deepStrictEqual(valorInicial, resultado);
        })
    });

    describe('obtenerPuntuación()', () =>{
        it('Calculo correcto del promedio', () =>{
            let resultado = listadoDeRestaurantes[0].obtenerPuntuacion();
            let resultadoEsperado = 7.4;
             assert.strictEqual(resultado, resultadoEsperado);
        
        });

        it('La puntuación de un Restaurant sin calificacion es igual a 0', () =>{
            listadoDeRestaurantes[0].calificaciones = [];
            let resultado = listadoDeRestaurantes[0].obtenerPuntuacion();

            assert.strictEqual(resultado, 0);
        });
    });
    
    describe('calificar()', () =>{
        it('Adición de calificación valida', () =>{
            let testRestaurant = mock();
            testRestaurant.calificaciones = [1 , 2];
            testRestaurant.calificar(4);
            let resultado = testRestaurant.calificaciones;

            assert.include(resultado, 4);
        });

        it('El arreglo de calificaciones no se modifica al intentar agregar una calificacion con valor 0', () =>{
            let testRestaurant = mock();
            testRestaurant.calificaciones = [1 , 2];
            let valorInicial = [1 , 2];
            testRestaurant.calificar(0);
            let resultado = testRestaurant.calificaciones;

            assert.deepStrictEqual(valorInicial, resultado);

        });
        
        it('El arreglo de calificaciones no se modifica al intentar agregar una calificacion con valor > 10', () =>{
            let testRestaurant = mock();
            testRestaurant.calificaciones = [1 , 2];
            let valorInicial = [1 , 2];
            testRestaurant.calificar(11);
            let resultado = testRestaurant.calificaciones;

            assert.deepStrictEqual(valorInicial, resultado)
        })
    });

    describe('buscarRestaurante(id)', () =>{
        it('Encuentra el restaurant correspondiente al pasar un id existente como parametro', () =>{
            let restaurantId5 = listadoDeRestaurantes[4];
            let resultado = listado.buscarRestaurante(5);

            assert.deepEqual(restaurantId5, resultado);
        });

        it('Al pasar un id inexistente devuelve un string', () =>{
            let resultado = listado.buscarRestaurante(100000);
            assert.isString(resultado);
        });
    });
    
    describe('obtenerRestaurantes()', () =>{
        //Esta función mockea una lista de restaurantes.
        function mockListaRestaurant(){
            var listadoDeRestaurantes = new Listado([
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "19:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
                new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
                new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
                new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7])
            ]);
            return listadoDeRestaurantes;
        };

        it('Obtener restaurant filtrando por horarios', () =>{
            let listadoDeRestaurantes = mockListaRestaurant();
            let resultadoEsperado = [
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "19:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
                new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7])
            ];
            let resultado = listadoDeRestaurantes.obtenerRestaurantes(null, null, '19:00');

            assert.deepStrictEqual(resultadoEsperado, resultado);
        });
    });
    
});