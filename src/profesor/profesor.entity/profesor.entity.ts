import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Evaluacion } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  extension: number;

  @Column()
  esParEvaluador: boolean;

  // Relación 1 profesor → muchos proyectos dirigidos
  @OneToMany(() => Proyecto, (proyecto) => proyecto.profesor)
  proyectos: Proyecto[];

  // Relación 1 profesor → muchos proyectos evaluados
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluaciones: Evaluacion[];
}
