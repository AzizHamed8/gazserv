import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneByLogin(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { login } });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Ajoutez cette méthode si vous en avez besoin
  async validateUser(loginDto: CreateUserDto): Promise<User> {
    const { login, password } = loginDto;
    return this.userRepository.findOne({ where: { login, password } });
  }
}
