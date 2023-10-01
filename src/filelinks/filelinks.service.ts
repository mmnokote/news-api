import { Injectable } from '@nestjs/common';
import { CreateFilelinkDto } from './dto/create-filelink.dto';
import { UpdateFilelinkDto } from './dto/update-filelink.dto';
import * as fs from 'fs';
import { Blob } from 'blob';

@Injectable()
export class FilelinksService {
  create(createFilelinkDto: CreateFilelinkDto) {
    return 'This action adds a new filelink';
  }

  findAll() {
    return `This action returns all filelinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filelink`;
  }

  update(id: number, updateFilelinkDto: UpdateFilelinkDto) {
    return `This action updates a #${id} filelink`;
  }

  remove(id: number) {
    return `This action removes a #${id} filelink`;
  }

  async imageToBlob(imagePath: string): Promise<Blob> {
    try {
      // Read the image file as binary data
      const imageBuffer = fs.readFileSync(imagePath);

      // Create a Blob from the binary data
      const imageBlob = new Blob([imageBuffer], { type: 'image/png' }); // Adjust the 'type' as needed

      return imageBlob;
    } catch (error) {
      throw new Error('Error converting image to Blob');
    }
  }
}
