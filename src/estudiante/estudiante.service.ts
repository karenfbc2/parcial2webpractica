import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { Proyecto } from 'src/proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepo: Repository<Estudiante>,

    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
  ) {}

  async crearEstudiante(dto: any) {
    if (dto.promedio <= 3.2) {
      throw new BadRequestException('El promedio debe ser mayor a 3.2');
    }
    if (dto.semestre < 4) {
      throw new BadRequestException('El semestre debe ser >= 4');
    }

    const estudiante = this.estudianteRepo.create(dto);
    return this.estudianteRepo.save(estudiante);
  }

  async eliminarEstudiante(id: number) {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const proyectos = await this.proyectoRepo.find({
      where: { estudianteLider: { id } },
    });

    const activos = proyectos.filter(p => p.estado < 4);
    if (activos.length > 0) {
      throw new BadRequestException('No se puede eliminar: tiene proyectos activos');
    }

    return this.estudianteRepo.remove(estudiante);
  }
}
