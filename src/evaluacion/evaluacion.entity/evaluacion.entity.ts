import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Profesor } from 'src/profesor/profesor.entity/profesor.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calificacion: number;

  // Relación con proyecto
  @ManyToOne(() => Proyecto, (proy) => proy.evaluaciones)
  proyecto: Proyecto;

  // Relación con profesor evaluador
  @ManyToOne(() => Profesor, (prof) => prof.evaluaciones)
  evaluador: Profesor;

  // Relación con profesor mentor (se valida que no sea igual)
  @ManyToOne(() => Profesor)
  mentor: Profesor;
}
