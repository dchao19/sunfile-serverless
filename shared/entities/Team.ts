import { Account } from "./Account";
import { Article } from "./Article";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn() id: number;

    @Column() contactEmail: string;

    @Column() schoolName: string;

    @OneToMany(type => Account, account => account.team)
    users: Account[];

    @OneToMany(type => Article, article => article.team)
    articles: Article[];
}
