import { Account } from "./Account";
import { Team } from "./Team";
import { Source } from "./Source";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn() id: number;

    @Column({
        length: 500
    })
    title: string;

    @ManyToOne(type => Source, source => source.articles)
    @JoinColumn()
    source: Source;

    @ManyToOne(type => Team, team => team.articles)
    team: Team;

    @ManyToOne(type => Account, account => account.articles)
    user: Account;
}
