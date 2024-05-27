import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    descricao: string

    @Column({ type: 'date' })
    data: string

    @Column()
    prioridade: string

    @Column()
    status: string
}