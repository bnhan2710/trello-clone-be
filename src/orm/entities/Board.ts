import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { List } from './List';
import { ActivityLog } from './Activity_Log';
import { Workspace } from "./Workspace";
@Entity('boards')
export class Board{
    @PrimaryGeneratedColumn()
    id! : number

    @Column({type: "varchar", length: 255, unique:true})
    name!:string

    @OneToOne(() => User)
    @JoinTable({ name: 'owner_id' })
     user!: User;

    @CreateDateColumn({ type: 'timestamp' })
     createdAt!: Date;

    @ManyToOne(() => Workspace, workspace => workspace.boards)
    @JoinTable({ name: 'workspace_id' })
    workspace!: Workspace;
 
    @ManyToMany(() => User, user => user.boards)
    @JoinTable({
        name: 'board_members',
        joinColumn: { name: 'board_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    members!: User[];

    @OneToMany(() => List, list => list.board )
    lists!:List[];

    @OneToMany(() => ActivityLog, activity_logs => activity_logs.board)
    activityLogs!: ActivityLog[]
}