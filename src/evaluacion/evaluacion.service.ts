import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepo: Repository<Evaluacion>,
  ) {}

  async crearEvaluacion(dto: any) {
    if (dto.evaluadorId === dto.mentorId) {
      throw new BadRequestException('Evaluador y mentor no pueden ser la misma persona');
    }

    if (dto.calificacion < 0 || dto.calificacion > 5) {
      throw new BadRequestException('La calificación debe estar entre 0 y 5');
    }

    const evaluacion = this.evaluacionRepo.create(dto);
    return this.evaluacionRepo.save(evaluacion);
  }
}
