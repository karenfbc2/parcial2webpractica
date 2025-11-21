import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Estudiante } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { Profesor } from 'src/profesor/profesor.entity/profesor.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column()
  presupuesto: number;

  @Column()
  notaFinal: number;

  @Column()
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  // Relación estudiante líder
  @ManyToOne(() => Estudiante, (est) => est.proyectos)
  estudianteLider: Estudiante;

  // Relación profesor mentor
  @ManyToOne(() => Profesor, (prof) => prof.proyectos)
  profesor: Profesor;

  // Relación 1 proyecto → muchas evaluaciones
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.proyecto)
  evaluaciones: Evaluacion[];
}
