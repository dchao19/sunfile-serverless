import { Article } from "./Article";
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
export class Source {
    @PrimaryGeneratedColumn() id: number;

    @Column() longName: string;

    @Column() shortName: string;

    @Column() host: string;

    @OneToMany(type => Article, article => article.source)
    articles: Article[];
}
