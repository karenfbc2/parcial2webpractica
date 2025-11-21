import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/profesor.entity/profesor.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepo: Repository<Profesor>,

    @InjectRepository(Evaluacion)
    private evaluacionRepo: Repository<Evaluacion>,
  ) {}

  async crearProfesor(dto: any) {
    if (dto.extension.toString().length !== 5) {
      throw new BadRequestException('La extensión debe tener 5 dígitos');
    }

    const profesor = this.profesorRepo.create(dto);
    return this.profesorRepo.save(profesor);
  }

  async asignarEvaluador(id: number) {
    const profesor = await this.profesorRepo.findOne({ where: { id } });
    if (!profesor) throw new NotFoundException('Profesor no encontrado');

    const evaluaciones = await this.evaluacionRepo.find({
      where: { evaluador: { id } },
    });

    if (evaluaciones.length >= 3) {
      throw new BadRequestException('Este profesor ya tiene 3 evaluaciones activas');
    }

    profesor.esParEvaluador = true;
    return this.profesorRepo.save(profesor);
  }
}
