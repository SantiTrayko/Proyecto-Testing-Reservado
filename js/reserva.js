
var Reserva = function (horario, personas, precioPorPersona, codigoDescuento) {
    this.horario = horario;
    this.personas = personas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
};

Reserva.prototype.calcularPrecioBase = function () {
    return this.precioPorPersona * this.personas;
};

function porcentaje(valor, porcentaje) { 
    return (valor * porcentaje) / 100;
};

Reserva.prototype.descuentoPorGrupo = function (precioBase) {
    var descuentos = 0;
    
    if (this.personas > 3 && this.personas <= 6) {
        descuentos =  5;
    } else if (this.personas > 6 && this.personas <= 8) {
        descuentos = 10;
    } else if (this.personas > 8) {
        descuentos = 15;
    };
    
    return porcentaje(precioBase, descuentos);
};

Reserva.prototype.descuentoPorCodigo = function (precioBase) {
var descuentos = 0;        
    switch (this.codigoDescuento) {
            case 'DES15':
                descuentos = porcentaje(precioBase, 15);
                break
            case 'DES200':
                descuentos = 200;
                break
            case 'DES1':
                descuentos = this.precioPorPersona;
        };
    return descuentos;
};

Reserva.prototype.adicionalFinDeSemana = function (precioBase) {
   var dia = this.horario.getDay();

    if (dia === 0 || dia === 5 || dia === 6) {
        return porcentaje(precioBase, 10);
    }
    return 0;
};


Reserva.prototype.adicionalHorario = function (precioBase){

    var minutos = this.horario.getMinutes() + this.horario.getHours() * 60;

    if (minutos >= 720 & minutos <= 840 || minutos >= 1200 & minutos <= 1260) {
        return porcentaje(precioBase, 5);
    }
    return 0;
};

Reserva.prototype.calcularPrecioFinal = function () {
    
var precioBase = this.calcularPrecioBase();
var descuentos = this.descuentoPorCodigo(precioBase) + this.descuentoPorGrupo(precioBase);
var adicionales = this.adicionalFinDeSemana(precioBase) + this.adicionalHorario(precioBase);

return precioBase + adicionales - descuentos;

};