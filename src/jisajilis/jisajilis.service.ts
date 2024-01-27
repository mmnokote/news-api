import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJisajiliDto } from './dto/create-jisajili.dto';
import { UpdateJisajiliDto } from './dto/update-jisajili.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jisajili } from './entities/jisajili.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JisajilisService {
  constructor(
    @InjectRepository(Jisajili)
    private jisajiliRepository: Repository<Jisajili>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createJisajiliDto: CreateJisajiliDto) {
    // Fetch the user from the database based on userId
    const user = await this.userRepository.findOne(createJisajiliDto.userId);

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createJisajiliDto.userId} not found`,
      );
    }

    // Create the Jisajili entity and associate it with the user
    const jisajiliEntity: any = this.jisajiliRepository.create({
      status: createJisajiliDto.status,
      path_file: createJisajiliDto.path_file,
      user: user, // Associate the user with Jisajili
      // other properties if any
    });

    const savedJisajili = await this.jisajiliRepository.save(jisajiliEntity);

    console.log('Saved Jisajili:', savedJisajili);

    return savedJisajili;
  }

  findAll() {
    return `This action returns all jisajilis`;
  }

  async findOne(id: number) {
    return this.jisajiliRepository.findOne(id);
  }

  async searchOne(id: string) {
    return this.jisajiliRepository
      .createQueryBuilder('jisajili')
      .leftJoinAndSelect('jisajili.user', 'user')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  update(id: number, updateJisajiliDto: UpdateJisajiliDto) {
    return `This action updates a #${id} jisajili`;
  }

  remove(id: number) {
    return `This action removes a #${id} jisajili`;
  }
}
