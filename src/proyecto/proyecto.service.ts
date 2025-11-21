import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
  ) {}

  async crearProyecto(dto: any) {
    if (dto.presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0');
    }

    if (dto.titulo.length <= 15) {
      throw new BadRequestException('El título debe tener más de 15 caracteres');
    }

    const proyecto = this.proyectoRepo.create(dto);
    return this.proyectoRepo.save(proyecto);
  }

  async avanzarProyecto(id: number) {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en su máximo estado');
    }

    proyecto.estado += 1;
    return this.proyectoRepo.save(proyecto);
  }

  async findAllEstudiantes(id: number) {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['estudianteLider'],
    });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    return [proyecto.estudianteLider];
  }
}
