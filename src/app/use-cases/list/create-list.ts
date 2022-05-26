import { inject, injectable } from 'tsyringe';
import UseCase from '../../interfaces/use-case';
import ListRepository from '../../interfaces/entities/list/list-repository';
import { CreateListData, List } from '../../interfaces/entities/list/list';
import ConflictError from '../../errors/conflict';

@injectable()
class CreateListUseCase implements UseCase {
  constructor(
    @inject('ListMongoDBRepository') private listRepository: ListRepository,
  ) {}

  async execute(data: CreateListData): Promise<List> {
    const listAlreadyExists = await this.listRepository.getByUserId(data.createdBy);
    if (listAlreadyExists) {
      throw new ConflictError('This user already has a list');
    }
    const listCreated = await this.listRepository.create(data);
    return listCreated;
  }
}

export default CreateListUseCase;
