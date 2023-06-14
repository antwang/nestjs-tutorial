/*
 * @Author: ant
 * @Date: 2023-06-14 15:04:12
 * @LastEditTime: 2023-06-14 17:19:43
 * @LastEditors: ant
 * @Description: 
 */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class User {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number

    @Column()
    name: string

    @Column({
        name: 'password'
    })
    password: string
}
