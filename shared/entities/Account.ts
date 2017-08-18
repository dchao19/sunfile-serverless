import { Article } from "./Article";
import { Team } from "./Team";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn() id: number;

    @Column() userCode: string;

    @Column({ length: 10 })
    teamCode: string;

    @Column() email: string;

    @Column() name: string;

    @ManyToOne(type => Team, team => team.users)
    team: Team;

    @OneToMany(type => Article, article => article.user)
    articles: Article[];
}
