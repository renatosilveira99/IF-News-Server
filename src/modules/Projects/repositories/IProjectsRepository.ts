
import { Project } from '../entities/Project';

interface ICreateProjectDTO {
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
  views: number;
  likes: number;
}

interface IUpdateProjectDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
  images?: string[] | string;
}

interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface IProjectsRepository {
  create({ title, description, status, extraLink, campus, authorId, coverImage, views, likes }: ICreateProjectDTO): Promise<Project>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
  findByAuthorId(authorId: string): Promise<Project[]>;
  findByCampus(campus: string): Promise<Project[]>;
  update({ id, title, description, status, extraLink, campus, authorId, coverImage, images }: IUpdateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
  incrementLikes(id: string): Promise<void>;
  incrementViews(id: string): Promise<void>;
  decrementLikes(id: string): Promise<void>;
}

export { IProjectsRepository, ICreateProjectDTO, IUpdateProjectDTO, ImageFile };