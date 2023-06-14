/*
 * @Author: ant
 * @Date: 2023-06-14 15:04:12
 * @LastEditTime: 2023-06-14 19:59:11
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }
  async getUserByName(name: string): Promise<User|null> {
    const user = await this.userRepository.findOneBy({ name });
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
}
