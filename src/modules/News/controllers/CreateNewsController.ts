import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateNewsService } from '../services/CreateNewsService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import logger from 'heroku-logger'

export class CreateNewsController {
  async handle(request: Request, response: Response) {
    const { coverImage, campus, description, status, title, extraLink, views, likes, subtitle } = request.body
    const authorId = request.user.id

    const createNewsService = container.resolve(CreateNewsService);

    const createdNews = await createNewsService.execute({
      authorId,
      campus,
      description,
      status,
      title,
      subtitle,
      extraLink,
      coverImage,
      views,
      likes
    });

    return response.status(201).json(plainToInstance(News, createdNews))
  }
}