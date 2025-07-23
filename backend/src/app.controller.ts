import { Controller, Get, Query } from '@nestjs/common';

interface Propiedad {
  id: number;
  titulo: string;
  ubicacion: string;
  precio: number;
  disponible: boolean;
}

const propiedades: Propiedad[] = [
  { id: 1, titulo: 'Departamento céntrico', ubicacion: 'CDMX', precio: 2500000, disponible: true },
  { id: 2, titulo: 'Casa suburbana', ubicacion: 'Monterrey', precio: 3500000, disponible: false },
  { id: 3, titulo: 'Loft moderno', ubicacion: 'Guadalajara', precio: 1800000, disponible: true }
];

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'PropFinder API funcionando';
  }

  // Endpoint: información del proyecto
  @Get('info')
  getInfo(): object {
    return {
      nombre: 'PropFinder',
      descripcion: 'Marketplace inmobiliario con búsqueda avanzada, chat y pagos',
      version: '1.0.0',
      author: 'Equipo PropFinder'
    };
  }

  // Nuevo endpoint: listado de propiedades con filtro por disponibilidad
  @Get('propiedades')
  getPropiedades(@Query('disponible') disponible?: string): Propiedad[] {
    if (disponible === undefined) {
      return propiedades;
    }
    const disponibleBool = disponible === 'true';
    return propiedades.filter(p => p.disponible === disponibleBool);
  }
}
