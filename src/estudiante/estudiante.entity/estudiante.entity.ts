import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity/proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  semestre: number;

  @Column()
  programa: string;

  @Column()
  promedio: number;

  // Relación 1 estudiante → muchos proyectos
  @OneToMany(() => Proyecto, (proyecto) => proyecto.estudianteLider)
  proyectos: Proyecto[];
}
