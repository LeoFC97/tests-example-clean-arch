import { injectable } from 'tsyringe';
import CreateListValidator from '../../../../validators/create-list';
import Controller from '../../../../interfaces/http/controller';
import { HttpRequest, HttpResponse } from '../../../../interfaces/http/http';
import CreateListUseCase from '../../../../use-cases/list/create-list';
import { CreateListBodyData } from '../../../../interfaces/entities/list/list';

@injectable()
class CreateListController implements Controller {
  constructor(
    private createListUseCase: CreateListUseCase,
    private createListValidator: CreateListValidator,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, i18n, user } = httpRequest;
    const data = await this.createListValidator
      .validate<CreateListBodyData>(body, i18n);
    const createdList = await this.createListUseCase.execute(
      {
        title: data.title, description: data.description, itens: data.itens, createdBy: user.uuid,
      },
    );

    const httpResponse = {
      status: 201,
      body: createdList,
    };
    console.info({
      userEmail: user.email,
      userName: user.name,
      listId: createdList._id,
    }, 'List created');

    return httpResponse;
  }
}

export default CreateListController;
