//TDD modulo reserva
const assert = chai.assert;

var arregloReservas = [
  new Reserva(new Date(2018, 07, 24, 13, 30), 8, 350, 'DES1'),
  //Para casos de descuento por grupo;
  new Reserva(new Date(2018, 07, 28, 16, 30), 4, 350, ''),
  new Reserva(new Date(2018, 07, 28, 16, 30), 7, 350, ''),
  new Reserva(new Date(2018, 07, 28, 16, 30), 9, 350, ''),
  //Para casos de descuento por codigo;
  new Reserva(new Date(2018, 07, 28, 16, 30), 1, 350, 'DES15'),
  new Reserva(new Date(2018, 07, 28, 16, 30), 1, 350, 'DES200'),
  new Reserva(new Date(2018, 07, 28, 16, 30), 2, 350, 'DES1'),
  //Para casos de adicionales por franja horaria;
  new Reserva(new Date(2018, 07, 28, 13, 30), 1, 350, ''),
  new Reserva(new Date(2018, 07, 28, 20, 55), 1, 350, ''),
  new Reserva(new Date(2018, 07, 28, 14, 01), 1, 350, ''),
  //Para casos de adicionales por fin de semana;
  new Reserva(new Date(2018, 11, 14, 16, 30), 1, 350, ''),
  new Reserva(new Date(2018, 11, 15, 16, 30), 1, 350, ''),
  new Reserva(new Date(2018, 11, 16, 16, 30), 1, 350, ''),
  new Reserva(new Date(2018, 11, 17, 16, 30), 1, 350, '')
];

describe('Reserva', () => {

  describe('calcularPrecioBase()', () => {

    it('Cálculo del precio base correcto.', () => {
      let reservaTest = arregloReservas[0];
      let valorEsperado = 2800;
      let resultado = reservaTest.calcularPrecioBase();

      assert.strictEqual(valorEsperado, resultado);
    });
  });

  describe('calcularPrecioFinal()', () => {

    it('Cálculo del precio final correcto', () => {
      let reservaTest = arregloReservas[0];
      let valorEsperado = 2590;
      let resultado = reservaTest.calcularPrecioFinal();

      assert.strictEqual(valorEsperado, resultado);
    });

    describe('Descuentos por grupo.', () => {

      it('Descuento del 5% por grupo de 4 a 6 personas aplica correctamente.', () => {
        let reservaTest = arregloReservas[1];
        let valorEsperado = 1330;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Descuento del 10% por grupo de 7 a 8 personas aplica correctamente.', () => {
        let reservaTest = arregloReservas[2];
        let valorEsperado = 2205;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Descuento del 15% por grupo > 8 personas aplica correctamente.', () => {
        let reservaTest = arregloReservas[3];
        let valorEsperado = 2677.5;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('No se hace descuento en el caso de que la cantidad de personas no aplique para ningún descuento por grupo.', () => {
        let reservaTest = arregloReservas[3];
        reservaTest.personas = 3;
        let valorEsperado = 1050;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });
    });

    describe('Descuentos por código.', () => {

      it('Descuento del 15% por código "DES15" aplica correctamente.', () => {
        let reservaTest = arregloReservas[4];
        let valorEsperado = 297.5;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Descuento de $200 por código "DES200" aplica correctamente.', () => {
        let reservaTest = arregloReservas[5];
        let valorEsperado = 150;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Descuento del 15% por código "DES1" aplica correctamente.', () => {
        let reservaTest = arregloReservas[6];
        let valorEsperado = 350;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('En el caso de código inexistente no se descuenta nada.', () => {
        let reservaTest = arregloReservas[6];
        reservaTest.codigoDescuento = 'DES54';
        let valorEsperado = 700;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });
    });

    describe('Adicionales por horarios concurrentes.', () => {

      it('Adicional del 5% de 13 a 14 horas.', () => {
        let reservaTest = arregloReservas[7];
        let valorEsperado = 367.5;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Adicional del 5% de 20 a 21 horas.', () => {
        let reservaTest = arregloReservas[8];
        let valorEsperado = 367.5;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('No se aplica ningún adicional cuando el horario de la reserva no se encuentra detro de la franja horaria concurrente.', () => {
        let reservaTest = arregloReservas[9];
        let valorEsperado = 350;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });
    });

    describe('Adicional de 10% por fin de semana (viernes, sábado y domingo).', () => {
      it('Adicional viernes.', () => {
        let reservaTest = arregloReservas[10];
        let valorEsperado = 385;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Adicional sábado.', () => {
        let reservaTest = arregloReservas[11];
        let valorEsperado = 385;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('Adicional domingo.', () => {
        let reservaTest = arregloReservas[12];
        let valorEsperado = 385;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

      it('No se aplica adicional cuando el dia de la reserva no es fin de semana.', () => {
        let reservaTest = arregloReservas[13];
        let valorEsperado = 350;
        let resultado = reservaTest.calcularPrecioFinal();

        assert.strictEqual(valorEsperado, resultado);
      });

    });
  });
});