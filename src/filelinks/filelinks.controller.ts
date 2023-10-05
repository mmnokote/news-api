import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilelinksService } from './filelinks.service';

import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('filelinks')
export class FilelinksController {
  constructor(private readonly filelinksService: FilelinksService) {}

  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // Define the path to the directory where files are stored
      const directory = path.join(__dirname, '../../../', 'public', 'uploads');
      console.log(directory);
      const filePath = path.join(directory, filename);
      console.log(filePath);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Read the file and create a Blob
        const fileContent = fs.readFileSync(filePath);
        const blob = new Blob([fileContent]);

        // Set the appropriate content type (e.g., for images)
        res.setHeader('Content-Type', 'image/png'); // Modify content type as needed

        // Send the Blob as a response
        res.send(blob);
      } else {
        // Return a 404 response if the file does not exist
        res.status(404).send('File not found');
      }
    } catch (error) {
      // Handle errors, e.g., internal server error
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
