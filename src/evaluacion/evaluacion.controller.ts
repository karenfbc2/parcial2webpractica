import { Controller, Post, Body } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  crearEvaluacion(@Body() dto: any) {
    return this.evaluacionService.crearEvaluacion(dto);
  }
}
